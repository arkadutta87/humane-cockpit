import React from 'react';
import QueryString from 'qs';
import FluxControllerMixin from 'reactjs-web-boilerplate/lib/app/flux/FluxControllerMixin';
import NavBarContainer from 'reactjs-web-boilerplate/lib/app/components/NavBarContainer';
import LeftSection from 'reactjs-web-boilerplate/lib/app/components/LeftSection';
import MidSection from 'reactjs-web-boilerplate/lib/app/components/MidSection';

const ViewSectionHeader = (props) => {
    if (props.data.depth === 0) {
        return <h5 className="center-align">{props.data.name}</h5>;
    }

    return <h6>{props.data.name}</h6>;
};

const View = (props) => {
    const type = props.data.get('type', 'data');
    const name = props.data.get('name');
    if (type === 'group') {
        return (<li className="section">
            <ViewSectionHeader data={{name, depth: props.depth}}/>
            <ul>
                {props.data.get('items').map((item, index) => <View key={index} data={item} appProperties={props.appProperties} depth={props.depth + 1}/>)}
            </ul>
        </li>);
    } else if (type === 'data') { // TODO: later can be chart views etc
        const viewType = props.data.getIn(['params', 'type']);
        const filter = props.data.getIn(['params', 'filter']);

        const params = QueryString.stringify({
            filter: filter && filter.toJS(),
            __view_key__: props.data.get('key'),
            __view_type__: type
        }, {allowDots: true});

        const url = `${props.appProperties && props.appProperties.get('baseUrl') || ''}/data-view/${viewType}?${params}`;

        return (<li>
            <a href={url} target="_blank">{name}</a>
        </li>);
    }

    return <noscript/>;
};

const TableLogin = (props) => {

    const username = props.data.get('username');
    const pwd = props.data.get('passwd');

    return (<tr><td>{username}</td><td>{pwd}</td>
        </tr>);


}

View.propTypes = {
    depth: React.PropTypes.number.isRequired,
    appProperties: React.PropTypes.object
};

export default React.createClass({
    mixins: [FluxControllerMixin],

    topBar() {
        return (<div className="top-bar center-align middle-align">
            <h5 className="page-title">{this.getAppProperties().get('cockpitName', 'Cockpit')} </h5>
        </div>);
    },

    loginInfo() {
        const appProperties2 = this.getAppProperties();
        const viewsProperties2 = appProperties2 && appProperties2.get('loginInfo');

        const tableBodyLg = viewsProperties2 && viewsProperties2.map((data, index) => <TableLogin data={data} appProperties={appProperties2} depth={0} key={index}/>);
       // console.log(objArr);

        return (<table>
            <thead><tr>
                <th>Username</th>
                <th>Password</th>
            </tr>
            </thead>
            <tbody>{tableBodyLg}</tbody>
        </table>);
    },

    render() {
        const appProperties = this.getAppProperties();
        const viewsProperties = appProperties && appProperties.get('views');

        console.log('Inside the basic page render');


        const views = viewsProperties && viewsProperties.map((data, index) => <View data={data} appProperties={appProperties} depth={0} key={index}/>);

        return (<div className="page-content cockpit-page cockpit-home-page">
            <header>
                <NavBarContainer>
                    {this.topBar()}
                </NavBarContainer>
            </header>
            <main>
                <div className="row">
                    <LeftSection>
                        <div >
                            <a href={`${appProperties && appProperties.get('baseUrl') || ''}/arka/d3`} target="_blank">
                                D3 Chart Demo
                            </a>
                            <br/>
                            <br/>
                            <a href={`${appProperties && appProperties.get('baseUrl') || ''}/arka/d3/1`} target="_blank">
                                D3 Chart Demo 2
                            </a>
                            <br/>
                            <br/>
                            <a href={`${appProperties && appProperties.get('baseUrl') || ''}/arka/d3/2`} target="_blank">
                                D3 Chart Demo 3
                            </a>

                            <br/>
                            <br/>
                            <a href={`${appProperties && appProperties.get('baseUrl') || ''}/singlePageApp`} >
                                Single Page App Demo
                            </a>

                            <br/>
                            <br/>
                            <a href={`${appProperties && appProperties.get('baseUrl') || ''}/dashboard`} >
                                DashBoard
                            </a>


                        </div>
                    </LeftSection>
                    <MidSection>
                        <div className="section large">
                            <h3 className="underline">Demos</h3>
                            <ul>
                                <li>
                                    <a href={`${appProperties && appProperties.get('baseUrl') || ''}/autocomplete`} target="_blank">
                                        Autocomplete Demo
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="section large">
                            <h3 className="underline">Views</h3>
                            <ul>
                                {views}
                            </ul>
                        </div>

                        <div >
                            {this.loginInfo()}
                        </div>




                    </MidSection>




                </div>
            </main>
        </div>);
    }
});