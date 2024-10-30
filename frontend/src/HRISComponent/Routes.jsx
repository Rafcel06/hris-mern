import React, { useState } from "react";
import Headcounts from "./Headcounts";
import Myteams from "./Myteams";
import Turnover from "./Turnover";

const Routes = ({routeTab}) => {
    

  if (routeTab.headCounts) {
    return <Headcounts />;
  }

  if (routeTab.myTeams) {
    return <Myteams />;
  }

  if (routeTab.turnOver) {
    return <Turnover />;
  }

};

export default Routes;
