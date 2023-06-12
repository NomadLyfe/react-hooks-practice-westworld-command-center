import React, { useState } from "react";
import { Card } from "semantic-ui-react";
import Host from "./Host";

function HostList({ hosts, onHostSelect, hostlist, selected }) {
  
  const renderedHosts = hostlist.map(host => {
    return (
      <Host key={host.id} host={host} onHostSelect={onHostSelect} select={selected[host.id-1]} />
    )
  })

  return (
    <Card.Group itemsPerRow={6}>{renderedHosts}</Card.Group>
  );
}

export default HostList;
