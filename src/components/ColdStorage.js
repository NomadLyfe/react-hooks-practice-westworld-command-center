import React from "react";
import { Segment } from "semantic-ui-react";
import HostList from "./HostList";

function ColdStorage({ hosts, onHostSelect, selected }) {
  const hostlist = hosts.filter(host => !host.active);

  return (
    <Segment.Group className="HQComps">
      <Segment compact>
        <h3 className="labels">ColdStorage</h3>
      </Segment>
      <Segment compact>
        <HostList hosts={hosts} onHostSelect={onHostSelect} hostlist={hostlist} selected={selected} />
      </Segment>
    </Segment.Group>
  );
}

export default ColdStorage;
