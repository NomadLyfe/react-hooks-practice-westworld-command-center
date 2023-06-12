import React from "react";
import "../stylesheets/Area.css";
import HostList from "./HostList";

function Area({ area, hosts, onHostSelect, selected }) {
  let prevChar = '';
  const betterName = area.name.split('').map((char, i) => {
    if (i === 0 || prevChar === '_') {
      prevChar = '';
      return char.toUpperCase();
    } else if (char === '_') {
      prevChar = char;
      return ' ';
    } else {
      return char;
    }
  })

  const hostlist = hosts.filter(host => host.active && host.area === area.name);

  return (
    <div
      className="area"
      id={area.name}
    >
      <h3 className="labels">
        {betterName}
      </h3>
      <HostList hosts={hosts} onHostSelect={onHostSelect} hostlist={hostlist} selected={selected} />
    </div>
  );
}

Area.propTypes = {
  hosts: function (props) {
    if (props.hosts.length > props.limit) {
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      );
    }
  },
};

export default Area;
