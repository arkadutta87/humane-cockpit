import React from 'react';
import FluxControllerMixin from 'reactjs-web-boilerplate/lib/app/flux/FluxControllerMixin';
import _ from 'lodash';
import QueryString from 'qs';
import Store from './../DashBoardStore';

const DashboardStoreKey = 'DashboardStore';

let component = React.createClass({

    mixins: [FluxControllerMixin],

    render() {

        return (<div>
                <div className="inner-content-wrapper">
                    <div className="row backgrnd-theme-1">

                        <ul className="breadcrumb breadcrumb_custom">
                            <li className="breadcrumb-active">
                                <a href="#">Search</a>
                            </li>
                            <li className="breadcrumb-active">
                                <a href="#">Top search queries/time</a>
                            </li>
                            <li className="breadcrumb-active">
                                <a href="#">Chart1</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row backgrnd-theme-2">
                    <div className="chart-wrapper">
                        <div className="block-1">
                            <div className="chart-header">Top Search Queries Chart</div>
                            <div className="chart-summary">
                                <table>
                                    <tr>
                                        <td className="td-underline">Summary:</td>
                                        <td>Total Search Queries - 3748</td>
                                        <td className="td-strikethrough">Total Products Returned - 12784</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>Time Period - last 12 hours</td>
                                        <td>Average Response Time - 18.77ms</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div className="block-2">
                            <div className="chart-clickable-left">
                                <span>5 %</span><span className="option-clicked">10 %</span><span>15 %</span>
                            </div>
                            <div className="chart-clickable-right">
                                <span>1 hour</span>
                                <span>6 hours</span>
                                <span>12 hours</span>
                                <span>1 day</span>
                                <span className="option-clicked">3 days</span>
                                <span>1 week</span>
                                <span>1 month</span>
                                <span>3 months</span>
                                <span>6 months</span>
                            </div>
                        </div>
                        <div className="block-3">
                            <table className="m14">
                                <thead>
                                <tr>
                                    <th>Queries</th>
                                    <th>Count</th>
                                    <th>User-Agent Wise Representation</th>
                                    <th>City Wise Representation</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Hyundai i20 sports edition</td>
                                    <td>351</td>
                                    <td><img src="/prettySecrets/resources/images/User-agent.jpg"
                                             alt="User-Agent Wise Representation" width="100%"/></td>
                                    <td><img src="/prettySecrets/resources/images/city.jpg"
                                             alt="City Wise Representation" width="100%"/></td>
                                </tr>
                                <tr>
                                    <td>Hyundai i20 sports edition</td>
                                    <td>351</td>
                                    <td><img src="/prettySecrets/resources/images/User-agent.jpg"
                                             alt="User-Agent Wise Representation" width="100%"/></td>
                                    <td><img src="/prettySecrets/resources/images/city.jpg"
                                             alt="City Wise Representation" width="100%"/></td>
                                </tr>
                                <tr>
                                    <td>Hyundai i20 sports edition</td>
                                    <td>351</td>
                                    <td><img src="/prettySecrets/resources/images/User-agent.jpg"
                                             alt="User-Agent Wise Representation" width="100%"/></td>
                                    <td><img src="/prettySecrets/resources/images/city.jpg"
                                             alt="City Wise Representation" width="100%"/></td>
                                </tr>
                                <tr>
                                    <td>Hyundai i20 sports edition</td>
                                    <td>351</td>
                                    <td><img src="/prettySecrets/resources/images/User-agent.jpg"
                                             alt="User-Agent Wise Representation" width="100%"/></td>
                                    <td><img src="/prettySecrets/resources/images/city.jpg"
                                             alt="City Wise Representation" width="100%"/></td>
                                </tr>
                                <tr>
                                    <td>Hyundai i20 sports edition</td>
                                    <td>351</td>
                                    <td><img src="/prettySecrets/resources/images/User-agent.jpg"
                                             alt="User-Agent Wise Representation" width="100%"/></td>
                                    <td><img src="/prettySecrets/resources/images/city.jpg"
                                             alt="City Wise Representation" width="100%"/></td>
                                </tr>
                                <tr>
                                    <td>Hyundai i20 sports edition</td>
                                    <td>351</td>
                                    <td><img src="/prettySecrets/resources/images/User-agent.jpg"
                                             alt="User-Agent Wise Representation" width="100%"/></td>
                                    <td><img src="/prettySecrets/resources/images/city.jpg"
                                             alt="City Wise Representation" width="100%"/></td>
                                </tr>
                                <tr>
                                    <td>Hyundai i20 sports edition</td>
                                    <td>351</td>
                                    <td><img src="/prettySecrets/resources/images/User-agent.jpg"
                                             alt="User-Agent Wise Representation" width="100%"/></td>
                                    <td><img src="/prettySecrets/resources/images/city.jpg"
                                             alt="City Wise Representation" width="100%"/></td>
                                </tr>
                                <tr>
                                    <td>Hyundai i20 sports edition</td>
                                    <td>351</td>
                                    <td><img src="/prettySecrets/resources/images/User-agent.jpg"
                                             alt="User-Agent Wise Representation" width="100%"/></td>
                                    <td><img src="/prettySecrets/resources/images/city.jpg"
                                             alt="City Wise Representation" width="100%"/></td>
                                </tr>
                                <tr>
                                    <td>Hyundai i20 sports edition</td>
                                    <td>351</td>
                                    <td><img src="/prettySecrets/resources/images/User-agent.jpg"
                                             alt="User-Agent Wise Representation" width="100%"/></td>
                                    <td><img src="/prettySecrets/resources/images/city.jpg"
                                             alt="City Wise Representation" width="100%"/></td>
                                </tr>
                                <tr>
                                    <td>Hyundai i20 sports edition</td>
                                    <td>351</td>
                                    <td><img src="/prettySecrets/resources/images/User-agent.jpg"
                                             alt="User-Agent Wise Representation" width="100%"/></td>
                                    <td><img src="/prettySecrets/resources/images/city.jpg"
                                             alt="City Wise Representation" width="100%"/></td>
                                </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

export default component;