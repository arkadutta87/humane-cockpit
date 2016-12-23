import React from 'react';
import FluxControllerMixin from 'reactjs-web-boilerplate/lib/app/flux/FluxControllerMixin';
import NavBarContainer from 'reactjs-web-boilerplate/lib/app/components/NavBarContainer';
import LeftSection from './DashBoardLeftSection';
import _ from 'lodash';
import QueryString from 'qs';
import Store from './DashBoardLeftMenuStore';

import {IndexLink, Link} from 'react-router';

let DashboardLeftMenuStoreKey = 'DashboardLeftMenuStore';

/*
 <ul className="nav child_menu">
 <li className="humane-li-1">
 <i className="fa fa-minus humane-fa-1"></i>
 <a className="humane-a-1" href="#">top search queries/time</a>
 </li>
 <li className="humane-li-1">
 <i className="fa fa-minus humane-fa-1"></i>
 <a className="humane-a-1" href="#">top search queries/UA</a>
 </li>
 <li className="humane-li-1">
 <i className="fa fa-minus humane-fa-1"></i>
 <a className="humane-a-1" href="#">top search queries/city</a>
 </li>
 </ul>

 <span id="hidden_menu" hidden="true">{index}</span>
 */

let dashboardLeftMenu = React.createClass({

    mixins: [FluxControllerMixin],

    getInitialState() {
        const config = this.props.config;
        const index = this.props.menuKey;
        DashboardLeftMenuStoreKey = DashboardLeftMenuStoreKey + index;
        this.dashboardLeftMenuStore = this.getFluxController().createStore(Store, DashboardLeftMenuStoreKey);


        console.log('Props in LeftMenuSection --- ');
        console.log(JSON.stringify(config));
        this.dashboardLeftMenuStore.initializeData('layoutData', config);

        this.registerStores({
            [DashboardLeftMenuStoreKey]: {dataKey: 'dashboardLeftMenuData'}
        });

        return {
            dashboardLeftMenuData: this.dashboardLeftMenuStore.data
        };
    },

    menuClicked(){
        console.log('Menu have been clicked');

        const data = this.dashboardLeftMenuStore.data.get('layoutData');
        let boolFlag = data.get('isDisplayed');
        const key = 'isDisplayed';
        if (boolFlag) {
            this.dashboardLeftMenuStore.updateDataOfFlag(key, false);
        } else {
            this.dashboardLeftMenuStore.updateDataOfFlag(key, true);
        }
    },

    innerMenuClicked(index){

        return (e) => {
            // do whatever
            console.log('Inner-Menu have been clicked with index -- '+index);
            //e.target.value;
            this.dashboardLeftMenuStore.updateInnerMenuData(index);
        };

    },


    render() {
        console.log('Inside the dashboard left-menu-section page render');

        const data = this.dashboardLeftMenuStore.data.get('layoutData');
        let arr = data.get('menuList').toJS();
        let boolFlag = data.get('isDisplayed');

        let block = null;
        let cssClass = 'fa fa-chevron-down humane-float-right';
        if (boolFlag) {

            block = arr.map((dt,index) => {
                let innerBlock = null;
                let upClsName = 'humane-li-1 ';
                if(dt.basePage){
                    upClsName = upClsName + ' menu-active';
                    innerBlock = <IndexLink to={dt.link} className="humane-a-1">{dt.name}</IndexLink>
                }else{
                    innerBlock = <Link to={dt.link} className="humane-a-1">{dt.name}</Link>
                }
                return (<li className={upClsName} onClick={this.innerMenuClicked(index)}>
                    <i className="fa fa-minus humane-fa-1"></i>
                    {innerBlock}
                </li>);
            });

            cssClass = 'fa fa-chevron-up humane-float-right';
        } else {
            block = <noscript/>;
        }


        return (<li className="humane-padding-bottom-1">
                <a className="cockpit-left-section-bg-color" onClick={this.menuClicked}>
                    <i className="fa fa-home"></i>
                    <span className="humane-padding-left-1">{data.get('menuHeader')}</span>
                    <span className={cssClass}></span>
                </a>
                <ul className="nav child_menu">
                    {block}
                </ul>
            </li>
        );
    }

});

export default dashboardLeftMenu;