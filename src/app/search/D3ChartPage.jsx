import React from 'react';
import QueryString from 'qs';
import FluxControllerMixin from 'reactjs-web-boilerplate/lib/app/flux/FluxControllerMixin';
import NavBarContainer from 'reactjs-web-boilerplate/lib/app/components/NavBarContainer';
import MidSection from 'reactjs-web-boilerplate/lib/app/components/MidSection';
import LeftSection from 'reactjs-web-boilerplate/lib/app/components/LeftSection';
import RightSection from 'reactjs-web-boilerplate/lib/app/components/RightSection';

import SearchChart from './components/SearchChart';

import d3 from 'd3';

/*import  { Chart } from  'react-d3-core';
import  { LineChart } from 'react-d3-basic';*/

export default React.createClass({
    mixins: [FluxControllerMixin],

    topBar() {
        return (<div className="top-bar center-align middle-align">
            <h5 className="page-title">{this.getAppProperties().get('cockpitName', 'Cockpit')} - D3 Demo</h5>
        </div>);
    },

    render() {
        //const text = this.state.searchInputData.get('text');

        //const weakResults = this.state.searchInputData.get('weakResults');

        const appProperties2 = this.getAppProperties();
        const d3Data = appProperties2 && appProperties2.get('d3Data');

        let chartData1 = [
            {
                "_index": "d3dummy",
                "_type": "linechart",
                "_id": "1",
                "_score": null,
                "_source": {
                    "partnerId": "prettySecrets",
                    "latency": 31.2,
                    "index": 1,
                    "count": 23
                },
                "sort": [
                    1
                ]
            },
            {
                "_index": "d3dummy",
                "_type": "linechart",
                "_id": "3",
                "_score": null,
                "_source": {
                    "partnerId": "prettySecrets",
                    "latency": 41.2,
                    "index": 2,
                    "count": 51
                },
                "sort": [
                    2
                ]
            },
            {
                "_index": "d3dummy",
                "_type": "linechart",
                "_id": "2",
                "_score": null,
                "_source": {
                    "partnerId": "prettySecrets",
                    "latency": 11.2,
                    "index": 3,
                    "count": 15
                },
                "sort": [
                    3
                ]
            },
            {
                "_index": "d3dummy",
                "_type": "linechart",
                "_id": "4",
                "_score": null,
                "_source": {
                    "partnerId": "prettySecrets",
                    "latency": 12.5,
                    "index": 4,
                    "count": 11
                },
                "sort": [
                    4
                ]
            },
            {
                "_index": "d3dummy",
                "_type": "linechart",
                "_id": "5",
                "_score": null,
                "_source": {
                    "partnerId": "prettySecrets",
                    "latency": 98.5,
                    "index": 5,
                    "count": 131
                },
                "sort": [
                    5
                ]
            },
            {
                "_index": "d3dummy",
                "_type": "linechart",
                "_id": "6",
                "_score": null,
                "_source": {
                    "partnerId": "prettySecrets",
                    "latency": 78.5,
                    "index": 6,
                    "count": 14
                },
                "sort": [
                    6
                ]
            },
            {
                "_index": "d3dummy",
                "_type": "linechart",
                "_id": "7",
                "_score": null,
                "_source": {
                    "partnerId": "prettySecrets",
                    "latency": 32.7,
                    "index": 7,
                    "count": 24
                },
                "sort": [
                    7
                ]
            },
            {
                "_index": "d3dummy",
                "_type": "linechart",
                "_id": "8",
                "_score": null,
                "_source": {
                    "partnerId": "prettySecrets",
                    "latency": 52.7,
                    "index": 8,
                    "count": 54
                },
                "sort": [
                    8
                ]
            },
            {
                "_index": "d3dummy",
                "_type": "linechart",
                "_id": "9",
                "_score": null,
                "_source": {
                    "partnerId": "prettySecrets",
                    "latency": 22.7,
                    "index": 9,
                    "count": 74
                },
                "sort": [
                    9
                ]
            },
            {
                "_index": "d3dummy",
                "_type": "linechart",
                "_id": "10",
                "_score": null,
                "_source": {
                    "partnerId": "prettySecrets",
                    "latency": 37.7,
                    "index": 10,
                    "count": 39
                },
                "sort": [
                    10
                ]
            }
        ];
       let chartData = chartData1 && chartData1.map((data, index) => {return data._source;});


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
            x = function(d) {
                return d.index;
            };



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
                            Hello guys this is a D3 Demo.
                            <h3>{JSON.stringify(chartData)}</h3>
                        </div>
                    </MidSection>
                    <br/>
                    <br/>
                    <SearchChart data={[
                        { value: 1, color: "red" },
                        { value: 2, color: "blue" }
                    ]}/>
                    <RightSection>

                    </RightSection>
                </div>
            </main>
        </div>);
    }

});