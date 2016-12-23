import Immutable from 'immutable';

import FluxStore from 'reactjs-web-boilerplate/lib/app/flux/FluxStore';

import Promise from 'bluebird';

class DashboardLeftMenuStore extends FluxStore {

    constructor(key, fluxContext, fluxController) {
        super(key, fluxContext, fluxController);
        this.data = Immutable.fromJS({keyRandom: []});
    }

    initializeData(key, data) {
        this.keyEle = key;
        console.log(`Key Sent -- ${key}`);
        this.data = this.data.set(key, Immutable.fromJS(data));
        console.log(JSON.stringify(this.data.toJS()));
    }

    updateDataOfFlag(key, value) {
        const dt = this.data.get(this.keyEle).toJS();
        dt[key] = value;

        return this.updateData(this.data.set(this.keyEle, Immutable.fromJS(dt)));
    }

    updateInnerMenuData(index1) {
        const dt = this.data.get(this.keyEle).toJS();

        const arr = dt.menuList;
        const newArr = arr.map((data, index) => {
            if (index !== index1) {
                data.basePage = false;
            } else {
                data.basePage = true;
            }
            return data;
        });

        dt.menuList = newArr;
        return this.updateData(this.data.set(this.keyEle, Immutable.fromJS(dt)));
    }
}

export default DashboardLeftMenuStore;