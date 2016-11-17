// import _ from 'lodash';
import Immutable from 'immutable';

import FluxStore from 'reactjs-web-boilerplate/lib/app/flux/FluxStore';

// import {EVENT_SEARCH_PARAMS_UPDATE, EVENT_FILTER_UPDATE, EVENT_PAGE_UPDATE} from './SearchInputStore';

export default class extends FluxStore {
    constructor(key, fluxContext, fluxController, searchInputStore) {
        super(key, fluxContext, fluxController);

        this.data = Immutable.fromJS({suggestions: null, count: 5});

        this.searchInputStore = searchInputStore;

        // setup listeners on search input store
        // this.searchInputStore.addListener(`UPDATE:${EVENT_SEARCH_PARAMS_UPDATE}`, () => this.fetchSuggestedQueries());
        // this.searchInputStore.addListener(`UPDATE:${EVENT_FILTER_UPDATE}`, () => this.fetchSuggestedQueries());
        // this.searchInputStore.addListener(`UPDATE:${EVENT_PAGE_UPDATE}`, () => this.fetchSuggestedQueries());
    }

    // eslint-disable-next-line class-methods-use-this
    noSuggestions() {
        // return this.updateData(this.data.set('suggestions', null).set('totalTimeTaken', null));
    }

    // eslint-disable-next-line class-methods-use-this
    fetchSuggestedQueries() {
        // const text = this.searchInputStore.data.get('text');
        // if (!text) {
        //     return this.noSuggestions();
        // }
        //
        // const filter = this.searchInputStore.data.get('filter').toJS();
        // const count = this.searchInputStore.data.get('count');
        //
        // const requestTime = Date.now();
        //
        // return this.fluxContext.restClient.post(`${this.fluxController.appProperties.get('searcherApi')}/suggestedQueries`, {text, count, filter, requestTime})
        //   .then((result) => {
        //       const totalTimeTaken = (Date.now() - requestTime);
        //       if (result && result.entity) {
        //           return this.updateData(this.data.set('suggestions', Immutable.fromJS(result.entity)).set('totalTimeTaken', totalTimeTaken));
        //       }
        //
        //       return this.noSuggestions();
        //   })
        //   .catch(() => this.noSuggestions());
    }
}