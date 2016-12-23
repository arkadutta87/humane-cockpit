import React from 'react';
import _ from 'lodash';
import QueryString from 'qs';
import FluxControllerMixin from 'reactjs-web-boilerplate/lib/app/flux/FluxControllerMixin';
import NavBarContainer from 'reactjs-web-boilerplate/lib/app/components/NavBarContainer';
import MidSection from 'reactjs-web-boilerplate/lib/app/components/MidSection';
import LeftSection from 'reactjs-web-boilerplate/lib/app/components/LeftSection';
import RightSection from 'reactjs-web-boilerplate/lib/app/components/RightSection';

//import  {Chart} from  'react-d3-core';
//import  {LineChart} from 'react-d3-basic';
/*
 <Chart
 title={title}
 width={width}
 height={height}
 margins={margins}
 >
 <LineChart
 showXGrid={false}
 showYGrid={false}
 margins={margins}
 title={title}
 data={chartData}
 width={width}
 height={height}
 chartSeries={chartSeries}
 x={x}
 />
 </Chart>
 */

import {default as SearchInputStore} from './SearchInputStore';
import {default as AutocompleteStore} from './AutocompleteStore';
import {default as DidYouMeanStore} from './DidYouMeanStore';
import {default as D3Store} from './D3Store';
import {DidYouMeanList} from './components/DidYouMeanList';
import {AutocompleteSuggestionList} from './components/AutocompleteSuggestionList';


const D3StoreKey = 'D3Store';
//const DidYouMeanStoreKey = 'DidYouMeanStore';
//const SearchInputStoreKey = 'SearchInputStore';

export default React.createClass({
    mixins: [FluxControllerMixin],

    getInitialState() {
        //const searchInputStore = this.searchInputStore = this.getFluxController().createStore(SearchInputStore, SearchInputStoreKey);
        this.d3ResultStore = this.getFluxController().createStore(D3Store, D3StoreKey);
        //this.didYouMeanResultStore = this.getFluxController().createStore(DidYouMeanStore, DidYouMeanStoreKey, searchInputStore);

        this.registerStores({
            [D3StoreKey]: {dataKey: 'd3ResultData'}
            //[AutocompleteStoreKey]: {dataKey: 'autocompleteResultData'},
            //[DidYouMeanStoreKey]: {dataKey: 'didYouMeanResultData'}
        });

        return {
            d3ResultData: this.d3ResultStore.data
            //autocompleteResultData: this.autocompleteResultStore.data,
            //didYouMeanResultData: this.didYouMeanResultStore.data
        };
    },

    topBar() {
        return (<div className="top-bar center-align middle-align">
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

        var width = 700,
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
            };




        const chartData = this.state.d3ResultData.get('esResponse').toJS();
        console.log('ChartData: ', chartData);

        return (<div className="page-content cockpit-page autocomplete-page">
            <header>
                <NavBarContainer>
                    {this.topBar()}
                </NavBarContainer>
            </header>
            <main>
                <div className="row">
                    <LeftSection>
                    </LeftSection>
                    <MidSection>
                        <div>
                            <br/>
                            <br/>
                            <button onClick={this.fetchESData1}>Get Data From ES</button>
                            <br/>
                            <br/>
                            <div>
                                <h5>{JSON.stringify(chartData)}</h5>
                            </div>
                        </div>
                    </MidSection>
                    <RightSection>
                    </RightSection>
                </div>
            </main>
        </div>);
    }
});