import React, { useState } from "react";
import { Card } from "semantic-ui-react";
import "../stylesheets/Host.css";

function Host({ host, onHostSelect, select }) {
  
  function handleClick() {
    onHostSelect(host);
  }
  return (
    <>
      {select ? <Card
        className="host selected"
        onClick={handleClick}
        image={host.imageUrl}
        raised
        link /> : <Card
        className="host"
        onClick={handleClick}
        image={host.imageUrl}
        raised
        link />}
    </>
  );
}

export default Host;
