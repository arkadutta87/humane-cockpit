import React from 'react';
import FluxControllerMixin from 'reactjs-web-boilerplate/lib/app/flux/FluxControllerMixin';
import _ from 'lodash';
import QueryString from 'qs';
import Store from './../DashBoardStore';

const DashboardStoreKey = 'DashboardStore';

let component = React.createClass({

    mixins: [FluxControllerMixin],

    render() {

        return (<h6>Hello Arka : Single Page App Dashboard Search City!!!!</h6>
        );
    }

});

export default component;