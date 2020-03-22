import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import App from './components/App';
import AppProviders from './components/App/AppProviders';
import AppLibraryProviders from './components/App/AppLibraryProviders';
import HomePage from './components/HomePage';
import RepoPage from './components/RepoPage';

const Routes = () => (
  <Router>
    <AppLibraryProviders>
      <AppProviders>
        <App>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/:orgName/:repoName" component={RepoPage} />
          </Switch>
        </App>
      </AppProviders>
    </AppLibraryProviders>
  </Router>
);

export default process.env.NODE_ENV === 'development' ? hot(Routes) : Routes;
