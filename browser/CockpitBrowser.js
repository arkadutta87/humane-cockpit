import buildBrowser from 'reactjs-web-boilerplate/browser/app/BrowserBuilder';

//
// -----------------------------------------------------------------------------------
// custom browser side imports come after browser import, as jQuery is imported before
// -----------------------------------------------------------------------------------
//

// todo: define ways to easily extend routes
import routesBuilder from './../lib/app/Routes';

require('./assets/stylesheets/application.scss');

buildBrowser(routesBuilder);