import React from 'react';
import {Route, IndexRoute} from 'react-router';
import IndexPage from './IndexPage';
import CockpitHomePage from './CockpitHomePage';
import DataViewPage from './views/DataViewPage';
import AutocompletePage from './search/AutocompletePage';
import SearchResultPage from './search/SearchResultPage';
import TermVectorsPage from './search/TermVectorsPage';
import ExplainSearchResultPage from './search/ExplainSearchResultPage';
import D3ChartPage from './search/D3ChartPage';
import D3ChartPage1 from './search/D3ChartPage1';
import D3ChartPage2 from './search/D3ChartPage2';
import SinglePageApp from './spa/SinglePageApp';
import PageHome from './spa/PageHome';
import PageStuff from './spa/PageStuff';
import PageContact from './spa/PageContact';
import Dashboard from './dashboard/Dashboard';
import DashboardSearchTime from './dashboard/components/DashboardSearchTime';
import DashboardSearchUA from './dashboard/components/DashboardSearchUA';
import DashboardSearchCity from './dashboard/components/DashboardSearchCity';

const NotFoundPage = () => (<h1>Page Not found</h1>);

export default function () {
    return (<Route path="/" component={IndexPage}>
        <IndexRoute component={CockpitHomePage}/>
        <Route path="data-view/:type" component={DataViewPage}/>
        <Route path="autocomplete" component={AutocompletePage}/>
        <Route path="search-results" component={SearchResultPage}/>
        <Route path="analyze/termVectors/:type/:id" component={TermVectorsPage}/>
        <Route path="analyze/explain/:api/:id" component={ExplainSearchResultPage}/>
        <Route path="arka/d3" component={D3ChartPage}/>
        <Route path="arka/d3/1" component={D3ChartPage1}/>
        <Route path="arka/d3/2" component={D3ChartPage2}/>
        <Route path="dashboard" component={Dashboard}>
            <IndexRoute component={DashboardSearchTime}/>
            <Route path="search-ua" component={DashboardSearchUA} />
            <Route path="search-city" component={DashboardSearchCity} />
        </Route>
        <Route path="singlePageApp" component={SinglePageApp}>
            <IndexRoute component={PageHome}/>
            <Route path="stuff" component={PageStuff} />
            <Route path="contact" component={PageContact} />
        </Route>
        <Route path="*" component={NotFoundPage}/>
    </Route>);
}