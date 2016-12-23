import React from 'react';
import FluxControllerMixin from 'reactjs-web-boilerplate/lib/app/flux/FluxControllerMixin';
import NavBarContainer from 'reactjs-web-boilerplate/lib/app/components/NavBarContainer';
import LeftMenuSection from './DashBoardLeftMenu';

/*
 <li className="humane-padding-bottom-1">
 <a className="cockpit-left-section-bg-color">
 <i className="fa fa-home"></i>
 <span className="humane-padding-left-1">Search</span>
 <span className="fa fa-chevron-down humane-float-right"></span>
 </a>
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
 </li>
 <li className="humane-padding-bottom-1">
 <a className="cockpit-left-section-bg-color">
 <i className="fa fa-home"></i>
 <span className="humane-padding-left-1">Products Returned</span>
 <span className="fa fa-chevron-down humane-float-right"></span>
 </a>
 <ul className="nav child_menu">
 <li className="humane-li-1">
 <i className="fa fa-minus humane-fa-1"></i>
 <a className="humane-a-1" href="#">top products returned/time</a>
 </li>
 <li className="humane-li-1">
 <i className="fa fa-minus humane-fa-1"></i>
 <a className="humane-a-1" href="#">top products returned/UA</a>
 </li>
 <li className="humane-li-1">
 <i className="fa fa-minus humane-fa-1"></i>
 <a className="humane-a-1" href="#">top products returned/city</a>
 </li>
 </ul>
 </li>
 <li className="humane-padding-bottom-1">
 <a className="cockpit-left-section-bg-color">
 <i className="fa fa-home"></i>
 <span className="humane-padding-left-1">Categories</span>
 <span className="fa fa-chevron-down humane-float-right"></span>
 </a>
 </li>
 <li className="humane-padding-bottom-1">
 <a className="cockpit-left-section-bg-color">
 <i className="fa fa-home"></i>
 <span className="humane-padding-left-1">360fy Meter</span>
 <span className="fa fa-chevron-down humane-float-right"></span>
 </a>
 </li>
 */

const dashboardLeftSection = (props) => {

    const configData = props.layoutData;
    const menuData = configData.get('MenuBlocks').toJS();

    const menuSec = menuData.map((data,index) => {
       return (<LeftMenuSection config={data} menuKey={index}/>);
    })

    return (
        <div className="">
            <div className="navbar nav_title ">
                <a href="#" className="humane-title txtcolor"><i className="fa fa-paw"></i>
                    <span>{configData.get('partnerId')}</span></a>
            </div>

            <div className="clearfix"></div>


            <div className="profile-humane profile">
                <div>
                    <span className="humane-span">Welcome,</span>
                    <h2 className="txtcolor">{configData.get('userName')}</h2>
                </div>
            </div>


            <br />


            <div id="sidebar-menu"
                 className="main_menu_side">
                <div className="menu_section">
                    <ul className="nav side-menu">
                        {menuSec}
                    </ul>
                </div>
            </div>

        </div>
    );


}

export default dashboardLeftSection;