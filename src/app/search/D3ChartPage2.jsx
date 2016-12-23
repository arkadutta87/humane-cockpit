import React from 'react';
import _ from 'lodash';
import QueryString from 'qs';
import FluxControllerMixin from 'reactjs-web-boilerplate/lib/app/flux/FluxControllerMixin';
import NavBarContainer from 'reactjs-web-boilerplate/lib/app/components/NavBarContainer';
import MidSection from 'reactjs-web-boilerplate/lib/app/components/MidSection';
import LeftSection from 'reactjs-web-boilerplate/lib/app/components/LeftSection';
import RightSection from 'reactjs-web-boilerplate/lib/app/components/RightSection';

import {default as SearchInputStore} from './SearchInputStore';
import {default as AutocompleteStore} from './AutocompleteStore';
import {default as DidYouMeanStore} from './DidYouMeanStore';
import {default as D3Store2} from './D3Store2';
import {DidYouMeanList} from './components/DidYouMeanList';
import {AutocompleteSuggestionList} from './components/AutocompleteSuggestionList';

import BarChart from './components/BarChart';


const D3StoreKey = 'D3Store2';
//const DidYouMeanStoreKey = 'DidYouMeanStore';
//const SearchInputStoreKey = 'SearchInputStore';

export default React.createClass({
    mixins: [FluxControllerMixin],

    getInitialState() {
        //const searchInputStore = this.searchInputStore = this.getFluxController().createStore(SearchInputStore, SearchInputStoreKey);
        this.d3ResultStore = this.getFluxController().createStore(D3Store2, D3StoreKey);
        //this.didYouMeanResultStore = this.getFluxController().createStore(DidYouMeanStore, DidYouMeanStoreKey, searchInputStore);

        this.registerStores({
            [D3StoreKey]: {dataKey: 'd3ResultDataSec'}
            //[AutocompleteStoreKey]: {dataKey: 'autocompleteResultData'},
            //[DidYouMeanStoreKey]: {dataKey: 'didYouMeanResultData'}
        });

        return {
            d3ResultDataSec: this.d3ResultStore.data
            //autocompleteResultData: this.autocompleteResultStore.data,
            //didYouMeanResultData: this.didYouMeanResultStore.data
        };
    },

    topBar() {
        return (<div className="top-bar center-align middle-align arka-cockpit">
            <h5 className="page-title">{this.getAppProperties().get('cockpitName', 'Cockpit')} - D3 Demo Version 2</h5>
        </div>);
    },

    fetchESData1(e) {
        //const text = e.target.value;
        console.log('Update Button clicked');
        //alert('button clicked');
        this.d3ResultStore.fetchESData();
        //this.d3ResultStore.updateDataDummy();
    },

    /*componentWillMount(){
        console.log('Component Will mount have been called');
        this.d3ResultStore.fetchESData();
     },*/

    /*handleSearchInputEnter(e) {
     if (e.keyCode !== 13) {
     return;
     }


     const queryParams = {
     text: this.state.searchInputData.get('text'),
     filter: this.state.searchInputData.get('filter').toJS(),
     mode: 'organic'
     };

     window.open(`${this.getAppProperties().get('baseUrl') || ''}/search-results?${QueryString.stringify(queryParams, {allowDots: true})}`, '_blank');
     },*/


    /*handleFilterCollapsibleClick(e) {
     e.preventDefault();
     e.stopPropagation();

     this.setState({filterCollapsed: !this.state.filterCollapsed});
     },*/

    render() {
        //const res = this.state.d3ResultData.get('esResponse');

        //const timeTaken = this.state.d3ResultData.get('totalTimeTaken');

        /*var width = 700,
            height = 300,
            margins = {left: 100, right: 100, top: 50, bottom: 50},
            title = "User sample",
            chartSeries = [
                {
                    field: 'latency',
                    name: 'latency',
                    color: '#ff7f0e'
                }
            ],
            // your x accessor
            x = function (d) {
                return d.index;
            };*/

        //let dataAct = [{"letter":"A","frequency":0.08167},{"letter":"B","frequency":0.01492},{"letter":"C","frequency":0.02782},{"letter":"D","frequency":0.04253},{"letter":"E","frequency":0.12702},{"letter":"F","frequency":0.02288},{"letter":"G","frequency":0.02015},{"letter":"H","frequency":0.06094},{"letter":"I","frequency":0.06966},{"letter":"J","frequency":0.00153},{"letter":"K","frequency":0.00772},{"letter":"L","frequency":0.04025},{"letter":"M","frequency":0.02406},{"letter":"N","frequency":0.06749},{"letter":"O","frequency":0.07507},{"letter":"P","frequency":0.01929},{"letter":"Q","frequency":0.00095},{"letter":"R","frequency":0.05987},{"letter":"S","frequency":0.06327},{"letter":"T","frequency":0.09056},{"letter":"U","frequency":0.02758},{"letter":"V","frequency":0.00978},{"letter":"W","frequency":0.0236},{"letter":"X","frequency":0.0015},{"letter":"Y","frequency":0.01974},{"letter":"Z","frequency":0.00074}];

        //console.log('Data entered -- '+JSON.stringify(dataAct));

        const margin = {top:20 , right : 20 , bottom : 30 , left : 40};


        const dataAct = this.state.d3ResultDataSec.get('esResponse').toJS();
        console.log('ChartData: ', dataAct);

        return (<div className="page-content cockpit-page autocomplete-page">
            <BarChart
                data={dataAct}
                width={960}
                height={500}
                margin={margin}
            />

            <div>
                <br/>
                <br/>
                <br/>
                <button onClick={this.fetchESData1}>Get Data From ES</button>
            </div>

        </div>);
    }
});