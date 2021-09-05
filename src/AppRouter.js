import React, { useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ThemeProvider from "./theme/ThemeProvider";
import NavBar from "./components/NavBar";

const AppRouter = () => {
  const [tab, setTab] = useState(0);

  return (
    <ThemeProvider>
      <Router>
        <NavBar tab={tab} setTab={setTab} />
        <Switch>
          <Route exact path="/">
            <Home tab={tab} />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
