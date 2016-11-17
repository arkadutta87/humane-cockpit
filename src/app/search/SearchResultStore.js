import Immutable from 'immutable';
import FluxStore from 'reactjs-web-boilerplate/lib/app/flux/FluxStore';
import {EVENT_SEARCH_PARAMS_UPDATE, EVENT_FILTER_UPDATE, EVENT_PAGE_UPDATE, EVENT_SEARCH_TEXT_UPDATE} from './SearchInputStore';
import WeakResultsMarker from './WeakResultsMarker';

const PageSize = 5;

export default class extends FluxStore {
    constructor(key, fluxContext, fluxController, searchInputStore) {
        super(key, fluxContext, fluxController);

        this.relevancyScores = [];

        this.searchInputStore = searchInputStore;

        this.data = Immutable.fromJS({results: null, count: PageSize, hideWeakResults: true});

        // setup listeners on search input store
        this.searchInputStore.addListener(`UPDATE:${EVENT_SEARCH_PARAMS_UPDATE}`, () => this.fetchSearchResults());
        this.searchInputStore.addListener(`UPDATE:${EVENT_FILTER_UPDATE}`, () => this.fetchSearchResults());
        this.searchInputStore.addListener(`UPDATE:${EVENT_PAGE_UPDATE}`, () => this.fetchSearchResults());
        this.searchInputStore.addListener(`UPDATE:${EVENT_SEARCH_TEXT_UPDATE}`, () => this.fetchSearchResults());

        this.weakResultsMarker = new WeakResultsMarker();
    }

    fetchSearchResults() {
        const text = this.searchInputStore.data.get('text');
        if (!text) {
            return null;
        }

        const fuzzySearch = this.searchInputStore.data.get('fuzzySearch');
        const filter = this.searchInputStore.data.get('filter') && this.searchInputStore.data.get('filter').toJS();
        const count = this.data.get('count');
        const page = this.searchInputStore.data.get('page');
        const mode = this.searchInputStore.data.get('mode');
        const type = this.searchInputStore.data.get('type');
        const unicodeText = this.searchInputStore.data.get('unicodeText');
        const originalInput = this.searchInputStore.data.get('originalInput');

        //const lang = this.searchInputStore.data.get('lang');

        const requestTime = Date.now();

        return this.fluxContext.restClient.post(`${this.fluxController.appProperties.get('searcherApi')}/search`, {
            count,
            page,
            text,
            unicodeText,
            originalInput, /*lang,*/
            filter,
            mode,
            type,
            fuzzySearch
        })
          .then((response) => {
              const totalTimeTaken = (Date.now() - requestTime);

              let data = this.data;

              if (page === 0) {
                  console.log('Resetting weak results marker');
                  this.weakResultsMarker.reset();
                  data = data.set('results', null);
              }

              if (response && response.entity) {
                  const multi = data.get('multi') || response.entity.multi;

                  this.weakResultsMarker.mark(response.entity);

                  if (multi) {
                      let existingResultGroups = data.get('results') || Immutable.Map();

                      const results = response.entity.multi
                        ? response.entity.results
                        : {[response.entity.name || response.entity.type]: response.entity};

                      Immutable.fromJS(results).entrySeq().forEach((value) => {
                          const key = value[0];
                          const newResultGroup = value[1];

                          let existingResultGroup = existingResultGroups.get(key);

                          if (existingResultGroup) {
                              let existingResults = existingResultGroup.get('results');
                              newResultGroup.get('results').forEach((newResult) => {
                                  existingResults = existingResults.push(Immutable.fromJS(newResult));
                              });

                              existingResultGroup = existingResultGroup.set('results', existingResults);
                          } else {
                              existingResultGroup = newResultGroup;
                          }

                          existingResultGroup = existingResultGroup.set('page', page)
                            .set('hasMoreResults', newResultGroup.get('totalResults') > (page + 1) * count);

                          existingResultGroups = existingResultGroups.set(key, existingResultGroup);
                      });

                      data = data.set('results', existingResultGroups);
                  } else {
                      let existingResults = data.get('results') || Immutable.List();
                      Immutable.fromJS(response.entity.results).forEach((newResult) => {
                          existingResults = existingResults.push(Immutable.fromJS(newResult));
                      });

                      data = data.set('results', existingResults)
                        .set('facets', Immutable.fromJS(response.entity.facets || null))
                        .set('page', page)
                        .set('hasMoreResults', response.entity.totalResults > (page + 1) * count)
                        .set('name', response.entity.name)
                        .set('type', response.entity.type);
                  }

                  if (page === 0) {
                      data = data.set('totalTimeTaken', totalTimeTaken)
                        .set('multi', response.entity.multi)
                        .set('serviceTimeTaken', response.entity.serviceTimeTaken)
                        .set('queryTimeTaken', response.entity.queryTimeTaken)
                        .set('totalResults', response.entity.totalResults);
                  }
              }

              return this.updateData(data);
          })
          .catch((error) => {
              console.error(`Error in posting to: ${this.fluxController.appProperties.get('searcherApi')}/search}`,
                this.searchInputStore.data, error);
          });
    }
}