import React from "react";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import "../stylesheets/Headquarters.css";
import ColdStorage from "./ColdStorage";
import LogPanel from "./LogPanel";

function Headquarters({ hosts, onHostSelect, hostInfo, selected, selectedHost, onHostUpdate, value, handleRadioChange, active, onActivateAll, onDecommisionAll, isAllActive, logs }) {
  return (
    <Grid celled="internally">
      <Grid.Column width={8}><ColdStorage hosts={hosts} onHostSelect={onHostSelect} selected={selected} /></Grid.Column>
      <Grid.Column width={5}>
        <Details hostInfo={hostInfo} selectedHost={selectedHost} onHostUpdate={onHostUpdate} value={value} handleRadioChange={handleRadioChange} active={active} />
      </Grid.Column>
      <Grid.Column width={3}>
        <LogPanel onDecommisionAll={onDecommisionAll} onActivateAll={onActivateAll} isAllActive={isAllActive} logs={logs} />
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;
