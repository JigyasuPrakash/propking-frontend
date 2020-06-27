import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Error404 from './components/Error/Error404';
import GenerateApartment from './components/Apartment/Generate/GenerateApartment';
import PreviewApartment from './components/Apartment/Preview/PreviewApartment';
import GeneratePlot from './components/Plots/Generate/GeneratePlot';
import PreviewPlot from './components/Plots/Preview/PreviewPlot';
import BuildApartment from './components/Builder/BuildApartment';
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
          <Route path="/builder/build/a" component={BuildApartment} />
          <Route path="/builder/build/p" component={BuildPlot} />
          <Route path="/builder/projects" component={Home} />
          <Route path="/generate/a/:id" component={GenerateApartment} />
          <Route path="/generate/p/:id" component={GeneratePlot} />
          <Route path="/preview/a/:id" component={PreviewApartment} />
          <Route path="/preview/p/:id" component={PreviewPlot} />
          <Route path="/404" component={Error404} />
          <Redirect to="/404" />
        </Switch>
      )} />
    </BrowserRouter>
  );
}

export default App;
