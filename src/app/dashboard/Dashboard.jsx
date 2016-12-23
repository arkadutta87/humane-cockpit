import React from 'react';
import FluxControllerMixin from 'reactjs-web-boilerplate/lib/app/flux/FluxControllerMixin';
import NavBarContainer from 'reactjs-web-boilerplate/lib/app/components/NavBarContainer';
import LeftSection from './DashBoardLeftSection';
import _ from 'lodash';
import QueryString from 'qs';
import Store from './DashBoardStore';

import { guid } from './../../../Utils';

const DashboardStoreKey = 'DashboardStore';

/*
 <li><a href="link1" className="txtcolor2">Profile</a></li>
 <li><a href="link2" className="txtcolor2">Sign-Out</a></li>
 */

let dashboard = React.createClass({

    mixins: [FluxControllerMixin],

    getInitialState() {
        this.dashboardStore = this.getFluxController().createStore(Store, DashboardStoreKey);
        let configData = {
            topbarData: {
                title: 'Cockpit DashBoard',
                links: [{id: guid(), data: 'Profile', link: 'link1'},
                    {id: guid(), data: 'Sign-Out', link: 'link2'}]
            },
            leftBar: {partnerId: 'Pretty Secrets',
                userName: 'Jason Bourne',
                MenuBlocks: [{
                    menuHeader: 'Search',
                    isDisplayed: true,
                    isBasePage : true,
                    menuList: [{
                        name: 'top search queries/time',
                        link: 'dashboard',
                        basePage : true
                    }, {
                        name: 'top search queries/UA',
                        link: 'dashboard/search-ua',
                        basePage : false
                    }, {
                        name: 'top search queries/city',
                        link: 'dashboard/search-city',
                        basePage : false
                    }]

                }, {
                    menuHeader: 'Products Returned',
                    isDisplayed: false,
                    isBasePage : false,
                    menuList: [{
                        name: 'top products returned/time',
                        link: '#',
                        basePage : false
                    }, {
                        name: 'top products returned/UA',
                        link: '#',
                        basePage : false
                    }, {
                        name: 'top products returned/city',
                        link: '#',
                        basePage : false
                    }]

                }, {
                    menuHeader: 'Categories',
                    isDisplayed: false,
                    isBasePage : false,
                    menuList: []

                }, {
                    menuHeader: '360fy Meter',
                    isDisplayed: false,
                    isBasePage : false,
                    menuList: []

                }]}
        };
        this.dashboardStore.initializeData('DashBoardData',configData);

        this.registerStores({
            [DashboardStoreKey]: {dataKey: 'dashboardData'}
            //[AutocompleteStoreKey]: {dataKey: 'autocompleteResultData'},
            //[DidYouMeanStoreKey]: {dataKey: 'didYouMeanResultData'}
        });

        return {
            dashboardData: this.dashboardStore.data
            //autocompleteResultData: this.autocompleteResultStore.data,
            //didYouMeanResultData: this.didYouMeanResultStore.data
        };
    },

    fetchESData1(e) {
        //const text = e.target.value;
        console.log('Update Button clicked');
        this.d3ResultStore.fetchESData();
    },

    topBar(displayData) {
        const title = displayData.get('title');

        console.log('Data ----- ' + displayData.get('links'));
        const liBlock = displayData.get('links').map((item) => {
            return <li>
                <a href={item.get('link')} key={item.get('id')} className="txtcolor2">{item.get('data')}</a>
            </li>
        });

        return (<nav className="nav-dashboard">
            <div className="nav-wrapper">
                <a href="#"
                   className="txtcolor-dashboard txtcolor2 title-bold">{title}</a>
                <ul id="nav-mobile" className="right hide-on-small-and-down">
                    {liBlock}
                </ul>
            </div>
        </nav>);
    },

    render() {
        console.log('Inside the dashboard page render');
        const configuration = this.getAppProperties().get('dashboardConfig');

        const dashBoardData = this.dashboardStore.data.get('DashBoardData');
        const topBarData = dashBoardData.get('topbarData');

        const leftSectionData = dashBoardData.get('leftBar');

        return (<div>

                {this.topBar(topBarData)}

                <section className="main-content__wrap">
                    <div className="row">
                        <div className="col m4 dshleft1 txtcolor">
                            <LeftSection layoutData={leftSectionData}/>
                        </div>
                        <div className="col m20 main-content-wrapper">
                            {this.props.children}
                        </div>
                    </div>
                </section>
            </div>
        );
    }

});

export default dashboard;