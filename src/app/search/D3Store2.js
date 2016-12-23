import Immutable from 'immutable';

import FluxStore from 'reactjs-web-boilerplate/lib/app/flux/FluxStore';

import Promise from 'bluebird';


export default class extends FluxStore {

    constructor(key, fluxContext, fluxController) {
        super(key, fluxContext, fluxController);
        this.data = Immutable.fromJS({esResponse: [], totalTimeTaken: null});
    }

    noSuggestions() {
        return this.updateData(this.data.set('esResponse', Immutable.fromJS([])).set('totalTimeTaken', 201));
    }

    updateDataDummy() {
        return this.updateData(this.data.set('esResponse', null).set('totalTimeTaken', 511));
    }

    fetchESData() {
        const requestTime = Date.now();
        console.log('We are inside -- ');

        const baseURL = this.fluxController.appProperties.get('baseUrl');
        //const dataAct = [{'letter':'A','frequency':0.08167},{"letter":"B","frequency":0.01492},{"letter":"C","frequency":0.02782},{"letter":"D","frequency":0.04253},{"letter":"E","frequency":0.12702},{"letter":"F","frequency":0.02288},{"letter":"G","frequency":0.02015},{"letter":"H","frequency":0.06094},{"letter":"I","frequency":0.06966},{"letter":"J","frequency":0.00153},{"letter":"K","frequency":0.00772},{"letter":"L","frequency":0.04025},{"letter":"M","frequency":0.02406},{"letter":"N","frequency":0.06749},{"letter":"O","frequency":0.07507},{"letter":"P","frequency":0.01929},{"letter":"Q","frequency":0.00095},{"letter":"R","frequency":0.05987},{"letter":"S","frequency":0.06327},{"letter":"T","frequency":0.09056},{"letter":"U","frequency":0.02758},{"letter":"V","frequency":0.00978},{"letter":"W","frequency":0.0236},{"letter":"X","frequency":0.0015},{"letter":"Y","frequency":0.01974},{"letter":"Z","frequency":0.00074}];
        /*const dataAct = [{letter: 'A', frequency: 0.08167}, {letter: 'B', frequency: 0.01492}, {letter: 'C', frequency: 0.02782}, {letter: 'D', frequency: 0.04253},
            {letter: 'E', frequency: 0.12702}, {letter: 'F', frequency: 0.02288}, {letter: 'G', frequency: 0.02015}, {letter: 'H', frequency: 0.06094},
            {letter: 'I', frequency: 0.06966}, {letter: 'J', frequency: 0.00153}, {letter: 'K', frequency: 0.00772}, {letter: 'L', frequency: 0.04025},
            {letter: 'M', frequency: 0.02406}, {letter: 'N', frequency: 0.06749}, {letter: 'O', frequency: 0.07507}, {letter: 'P', frequency: 0.01929},
            {letter: 'Q', frequency: 0.00095}, {letter: 'R', frequency: 0.05987}, {letter: 'S', frequency: 0.06327}, {letter: 'T', frequency: 0.09056},
            {letter: 'U', frequency: 0.02758}, {letter: 'V', frequency: 0.00978}, {letter: 'W', frequency: 0.0236}, {letter: 'X', frequency: 0.0015},
            {letter: 'Y', frequency: 0.01974}, {letter: 'Z', frequency: 0.00074}];*/
        //const chartData = dataAct && dataAct.map((data, index) => data._source);

        //console.log(`Data Current: ${dataAct}`);

        //return this.updateData(this.data.set('esResponse', Immutable.fromJS(dataAct)).set('totalTimeTaken', 400));
        //return this.noSuggestions();
        return Promise.resolve(this.fluxContext.restClient.get(`${baseURL}/analytics/api/dummyapi/d3/second`))
            .then((response) => {
                const totalTimeTaken = (Date.now() - requestTime);
                if (response && response.entity) { //
                    const dt = response.entity;

                    const chartData = dt.data;// && dt.map((data, index) => data._source);
                    //console.log(JSON.stringify(chartData));
                    return this.updateData(this.data.set('esResponse', Immutable.fromJS(chartData)).set('totalTimeTaken', totalTimeTaken));
                    //return this;
                }

                return this.noSuggestions();
            })
            .catch(() => this.noSuggestions());
    }
}