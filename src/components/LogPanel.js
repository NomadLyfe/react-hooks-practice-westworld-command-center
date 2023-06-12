import React, { useState } from "react";
import { Segment, Button } from "semantic-ui-react";
import { Log } from "../services/Log";

function LogPanel({ onActivateAll, onDecommisionAll, isAllActive, logs }) {
  
  function handleClick() {
    if (isAllActive === false) {
      onActivateAll();
    } else {
      onDecommisionAll();
    }
  }

  const logList = logs.map((log, i) => {
    return (
      <p key={i} className={log.type}>
      {log.msg}
    </p>
    )
  })

  return (
    <Segment className="HQComps" id="logPanel">
      <pre>
        {logList}
      </pre>

      {/* Button below is the Activate All/Decommisssion All button */}
      {/* This isn't always going to be the same color...*/}
      {/* Should the button always read "ACTIVATE ALL"? When should it read "DECOMMISSION ALL"? */}
      {isAllActive ? <Button fluid color={"green"} content={"DECOMMISSION ALL"} onClick={handleClick} /> : <Button fluid color={"red"} content={"ACTIVATE ALL"} onClick={handleClick} />}
    </Segment>
  );
}

export default LogPanel;
