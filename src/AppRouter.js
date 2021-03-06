import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home  from "./pages/Home/Home";
import  ThemeProvider  from "./theme/ThemeProvider";
import NavBar from "./components/NavBar";

const AppRouter = () => {
  return (
    <ThemeProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
