import React, { useState } from "react";
import { Segment, Image } from "semantic-ui-react";
import * as Images from "../services/Images";
import HostInfo from "./HostInfo";

function Details({ hostInfo, selectedHost, onHostUpdate, value, handleRadioChange, active }) {
  // Watch the video to see how this works in the app.
  

  return (
    <Segment id="details" className="HQComps">
      {selectedHost ? <HostInfo hostInfo={hostInfo} onHostUpdate={onHostUpdate} value={value} handleRadioChange={handleRadioChange} active={active} /> : <Image size="small" src={Images.westworldLogo} />}
    </Segment>
  );
}

export default Details;
