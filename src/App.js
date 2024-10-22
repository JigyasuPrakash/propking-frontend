import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Error404 from './components/Error/Error404';
import GenerateApartment from './components/Builder/Apartment/Generate/GenerateApartment';
import PreviewApartment from './components/Builder/Apartment/Preview/PreviewApartment';
import GeneratePlot from './components/Builder/Plots/Generate/GeneratePlot';
import PreviewPlot from './components/Builder/Plots/Preview/PreviewPlot';
import GenerateVilla from './components/Builder/Villa/Generate/GenerateVilla';
import PreviewVilla from './components/Builder/Villa/Preview/PreviewVilla';
import BuildApartment from './components/Builder/BuildApartment';
import BuildPlot from './components/Builder/BuildPlot';
import BuildVilla from './components/Builder/BuildVilla';
import Home from './components/Home';
import Header from './components/Header/Header';
import ApartmentProject from './components/Project/Apartment/Project';
import PlotProject from './components/Project/Plot/Project';
import VillaProject from './components/Project/Villa/Project';
import Dashboard from './components/Builder/Dashboard';
import ExistingProject from './components/Builder/ExistingProject';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route render={({ location }) => (
        <Switch location={location}>
          <Route exact path="/" component={Home} />
          <Route exact path="/builder/" component={Dashboard} />
          <Route path="/builder/build/a" component={BuildApartment} />
          <Route path="/builder/build/p" component={BuildPlot} />
          <Route path="/builder/build/v" component={BuildVilla} />
          <Route path="/builder/projects" component={ExistingProject} />
          <Route path="/generate/a/:id" component={GenerateApartment} />
          <Route path="/generate/p/:id" component={GeneratePlot} />
          <Route path="/generate/v/:id" component={GenerateVilla} />
          <Route path="/preview/a/:id" component={PreviewApartment} />
          <Route path="/preview/p/:id" component={PreviewPlot} />
          <Route path="/preview/v/:id" component={PreviewVilla} />
          <Route path="/project/a/:id" component={ApartmentProject} />
          <Route path="/project/p/:id" component={PlotProject} />
          <Route path="/project/v/:id" component={VillaProject} />
          <Route path="/404" component={Error404} />
          <Redirect to="/404" />
        </Switch>
      )} />
    </BrowserRouter>
  );
}

export default App;
