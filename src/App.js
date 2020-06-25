import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Error404 from './components/Error/Error404';
import GenerateFlat from './components/Flats/Generate/Generate';
import Preview from './components/Flats/Preview/Preview';
import BuildFlat from './components/Builder/BuildFlat';
import BuildPlot from './components/Builder/BuildPlot';
import Home from './components/Home';
import Header from './components/Header/Header';
import Project from './components/Section/Project';
import Dashboard from './components/Builder/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route render={({ location }) => (
        <Switch location={location}>
          <Route exact path="/" component={Home} />
          <Route path="/project/:id" component={Project} />
          <Route exact path="/builder/" component={Dashboard} />
          <Route path="/builder/build/f" component={BuildFlat} />
          <Route path="/builder/build/p" component={BuildPlot} />
          <Route path="/builder/projects" component={Home} />
          <Route path="/generate/f/:id" component={GenerateFlat} />
          {/* <Route path="/generate/p/:id" component={GeneratePlot} /> */}
          <Route path="/preview/:id" component={Preview} />
          <Route path="/404" component={Error404} />
          <Redirect to="/404" />
        </Switch>
      )} />
    </BrowserRouter>
  );
}

export default App;
