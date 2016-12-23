import Immutable from 'immutable';

import FluxStore from 'reactjs-web-boilerplate/lib/app/flux/FluxStore';

import Promise from 'bluebird';

class DashboardStore extends FluxStore {

    constructor(key, fluxContext, fluxController) {
        super(key, fluxContext, fluxController);
        this.data = Immutable.fromJS({keyRandom: []});
    }

    initializeData(key, data) {
        console.log(`Key Sent -- ${key}`);
        this.data = this.data.set(key, Immutable.fromJS(data));
        console.log(JSON.stringify(this.data.toJS()));
    }

    noSuggestions() {
        return this.updateData(this.data.set('esResponse', Immutable.fromJS([])).set('totalTimeTaken', 201));
    }

    updateDataDummy() {
        return this.updateData(this.data.set('esResponse', null).set('totalTimeTaken', 511));
    }
}

export default DashboardStore;