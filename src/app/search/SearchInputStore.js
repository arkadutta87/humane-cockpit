import _ from 'lodash';
import Immutable from 'immutable';

import FluxStore from 'reactjs-web-boilerplate/lib/app/flux/FluxStore';

export const EVENT_SEARCH_TEXT_UPDATE = 'SEARCH_TEXT';
export const EVENT_SEARCH_PARAMS_UPDATE = 'SEARCH_PARAMS';
export const EVENT_FILTER_UPDATE = 'FILTER';
export const EVENT_PAGE_UPDATE = 'PAGINATE';

export default class extends FluxStore {
    constructor(key, fluxContext, fluxController) {
        super(key, fluxContext, fluxController);

        this.relevancyScores = [];

        this.data = Immutable.fromJS({weakResults: true, fuzzySearch: true, text: null, filter: {lang: {primary: 'en', secondary: []}}});
    }

    toggleWeakResults(value) {
        this.updateData(this.data.set('weakResults', value));
    }

    toggleFuzzySearch(value) {
        this.updateData(this.data.set('fuzzySearch', value), EVENT_SEARCH_PARAMS_UPDATE);
    }

    paginate(page, type) {
        let data = this.data.set('page', page);

        if (type || this.data.get('type')) {
            data = data.set('type', type);
        }

        this.updateData(data, EVENT_PAGE_UPDATE);
    }

    setSearchText(text) {
        this.updateData(this.data.set('text', text), EVENT_SEARCH_TEXT_UPDATE);
    }

    setSearchParams(params) {
        if (params.filter && params.filter.lang && !params.filter.lang.secondary) {
            params.filter.lang.secondary = [];
        }

        const data = this.data.set('text', params.text)
          .set('unicodeText', params.unicodeText)
          .set('lang', params.lang)
          .set('filter', Immutable.fromJS(params.filter))
          .set('originalInput', params.originalInput)
          .set('mode', params.mode)
          .set('type', params.type)
          .set('page', params.page || 0);

        this.updateData(data, EVENT_SEARCH_PARAMS_UPDATE);
    }

    updateSearchParams(params) {
        params = _.extend(this.data.toJS(), params);

        if (params.filter && params.filter.lang && !params.filter.lang.secondary) {
            params.filter.lang.secondary = [];
        }

        const data = this.data.set('text', params.text)
          .set('unicodeText', params.unicodeText)
          .set('lang', params.lang)
          .set('filter', Immutable.fromJS(params.filter))
          .set('originalInput', params.originalInput)
          .set('mode', params.mode)
          .set('type', params.type)
          .set('page', params.page || 0);

        this.updateData(data, EVENT_SEARCH_PARAMS_UPDATE);
    }

    setPrimaryLanguage(lang) {
        const data = this.data
          .setIn(['filter', 'lang', 'primary'], lang)
          .updateIn(['filter', 'lang', 'secondary'], secondary => secondary.filterNot(val => val === lang));

        this.updateData(data, EVENT_FILTER_UPDATE);
    }

    addSecondaryLanguage(lang) {
        this.updateData(this.data.updateIn(['filter', 'lang', 'secondary'], secondary => secondary.push(lang)), EVENT_FILTER_UPDATE);
    }

    removeSecondaryLanguage(lang) {
        this.updateData(this.data.updateIn(['filter', 'lang', 'secondary'], secondary => secondary.filterNot(val => val === lang)), EVENT_FILTER_UPDATE);
    }

    addFacet(key, value) {
        let data = this.data;
        if (!data.getIn(['filter', key])) {
            data = data.setIn(['filter', key], Immutable.fromJS({values: [], type: 'facet'}));
        }

        this.updateData(data.updateIn(['filter', key, 'values'], values => values.push(value)), EVENT_FILTER_UPDATE);
    }

    removeFacet(key, value) {
        let data = this.data.updateIn(['filter', key, 'values'], values => values.filterNot(val => val === value));

        if (data.getIn(['filter', key, 'values']).count() === 0) {
            data = data.deleteIn(['filter', key]);
        }

        this.updateData(data, EVENT_FILTER_UPDATE);
    }
}