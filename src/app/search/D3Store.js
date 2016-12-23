import Immutable from 'immutable';

import FluxStore from 'reactjs-web-boilerplate/lib/app/flux/FluxStore';

import Promise from 'bluebird';


export default class extends FluxStore {
    /*constructor(key, fluxContext, fluxController, searchInputStore) {
        super(key, fluxContext, fluxController);

        this.searchInputStore = searchInputStore;

        this.data = Immutable.fromJS({suggestions: null});

        // setup listeners on search input store
        this.searchInputStore.addListener(`UPDATE:${EVENT_SEARCH_TEXT_UPDATE}`, () => this.fetchESData());
    }*/

    constructor(key, fluxContext, fluxController) {
        super(key, fluxContext, fluxController);

        //this.relevancyScores = [];

        //this.data = Immutable.fromJS({weakResults: true, fuzzySearch: true, text: null, filter: {lang: {primary: 'en', secondary: []}}});
        this.data = Immutable.fromJS({esResponse: [], totalTimeTaken: null});
    }

    noSuggestions() {
        return this.updateData(this.data.set('esResponse', Immutable.fromJS([])).set('totalTimeTaken', 201));
    }

    updateDataDummy() {
        return this.updateData(this.data.set('esResponse', null).set('totalTimeTaken', 511));
    }

    fetchESData() {
        //const text = this.searchInputStore.data.get('text');
        /*if (!text || text.length < 2) {
            return this.noSuggestions();
        }*/

        const requestTime = Date.now();
        console.log('We are inside -- ');

        const baseURL = this.fluxController.appProperties.get('baseUrl');

        /*const response = [
            {
                _index: 'd3dummy',
                _type: 'linechart',
                _id: '1',
                _score: null,
                _source: {
                    partnerId: 'prettySecrets',
                    latency: 31.2,
                    index: 1,
                    count: 23
                },
                sort: [
                    1
                ]
            },
            {
                _index: 'd3dummy',
                _type: 'linechart',
                _id: '3',
                _score: null,
                _source: {
                    partnerId: 'prettySecrets',
                    latency: 41.2,
                    index: 2,
                    count: 51
                },
                sort: [
                    2
                ]
            },
            {
                _index: 'd3dummy',
                _type: 'linechart',
                _id: '2',
                _score: null,
                _source: {
                    partnerId: 'prettySecrets',
                    latency: 11.2,
                    index: 3,
                    count: 15
                },
                sort: [
                    3
                ]
            },
            {
                _index: 'd3dummy',
                _type: 'linechart',
                _id: '4',
                _score: null,
                _source: {
                    partnerId: 'prettySecrets',
                    latency: 12.5,
                    index: 4,
                    count: 11
                },
                sort: [
                    4
                ]
            },
            {
                _index: 'd3dummy',
                _type: 'linechart',
                _id: '5',
                _score: null,
                _source: {
                    partnerId: 'prettySecrets',
                    latency: 98.5,
                    index: 5,
                    count: 131
                },
                sort: [
                    5
                ]
            },
            {
                _index: 'd3dummy',
                _type: 'linechart',
                _id: '6',
                _score: null,
                _source: {
                    partnerId: 'prettySecrets',
                    latency: 78.5,
                    index: 6,
                    count: 14
                },
                sort: [
                    6
                ]
            },
            {
                _index: 'd3dummy',
                _type: 'linechart',
                _id: '7',
                _score: null,
                _source: {
                    partnerId: 'prettySecrets',
                    latency: 32.7,
                    index: 7,
                    count: 24
                },
                sort: [
                    7
                ]
            },
            {
                _index: 'd3dummy',
                _type: 'linechart',
                _id: '8',
                _score: null,
                _source: {
                    partnerId: 'prettySecrets',
                    latency: 52.7,
                    index: 8,
                    count: 54
                },
                sort: [
                    8
                ]
            },
            {
                _index: 'd3dummy',
                _type: 'linechart',
                _id: '9',
                _score: null,
                _source: {
                    partnerId: 'prettySecrets',
                    latency: 22.7,
                    index: 9,
                    count: 74
                },
                sort: [
                    9
                ]
            },
            {
                _index: 'd3dummy',
                _type: 'linechart',
                _id: '10',
                _score: null,
                _source: {
                    partnerId: 'prettySecrets',
                    latency: 37.7,
                    index: 10,
                    count: 39
                },
                sort: [
                    10
                ]
            }
        ];*/

        //const chartData = response && response.map((data, index) => data._source);

        //return this.updateData(this.data.set('esResponse', Immutable.fromJS(chartData)).set('totalTimeTaken', 400));
        //return this.noSuggestions();
        return Promise.resolve(this.fluxContext.restClient.get(`${baseURL}/analytics/api/es/search`))
            .then((response) => {
                const totalTimeTaken = (Date.now() - requestTime);
                if (response && response.entity) { //
                    const dt = response.entity;

                    const chartData = dt && dt.map((data, index) => data._source);
                    console.log(JSON.stringify(chartData));
                    return this.updateData(this.data.set('esResponse', Immutable.fromJS(chartData)).set('totalTimeTaken', totalTimeTaken));
                    //return this;
                }

                return this.noSuggestions();
            })
            .catch(() => this.noSuggestions());
    }
}