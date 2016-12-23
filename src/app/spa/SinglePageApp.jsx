import {IndexLink, Link} from 'react-router';
import React from 'react';

var App = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Simple SPA</h1>
                <ul className="headerspa">
                    <li><IndexLink to="singlePageApp" className="arka2" activeClassName="active">Home</IndexLink></li>
                    <li><Link to="singlePageApp/stuff" className="arka3" activeClassName="active">Stuff</Link></li>
                    <li><Link to="singlePageApp/contact" className="arka4" activeClassName="active">Contact</Link></li>
                </ul>
                <div className="contentspa">
                    {this.props.children}
                </div>
            </div>
        )
    }
});

export default App;