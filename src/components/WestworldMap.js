import React from "react";
import { Segment } from "semantic-ui-react";
import Area from "./Area";

function WestworldMap({ areas, hosts, onHostSelect, selected }) {
  const areaList = areas.map(area => {
    return (
      <Area key={area.id} area={area} hosts={hosts} onHostSelect={onHostSelect} selected={selected} />
    )
  })

  return <Segment id="map">{areaList}</Segment>;
}

export default WestworldMap;
