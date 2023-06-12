import React, { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import "../stylesheets/App.css";
import Headquarters from "./Headquarters";
import WestworldMap from "./WestworldMap";
import { Log } from "../services/Log";

function App() {
  const [areas, setAreas] = useState(null);
  const [hosts, setHosts] = useState([]);
  const [hostInfo, setHostInfo] = useState({id: 1, active: false});
  const [selected, setSelected] = useState(new Array(15).fill(false));
  const [value, setValue] = useState(hostInfo.area);
  const [active, setActive] = useState(hostInfo.active);
  const [isAllActive, setIsAllActive] = useState(true);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/areas")
    .then(r => r.json())
    .then(data => setAreas(data));
    fetch("http://localhost:3001/hosts")
    .then(r => r.json())
    .then(data => {
      setHosts(data);
      setIsAllActive(!Boolean(data.filter(host => !host.active).reduce((accum) => accum + 1, 0)));
    });
  }, [])

  function handleHostSelect(selectedHost) {
    const array = new Array(15).fill(false);
    setSelected({...array, [selectedHost.id-1]: true});
    setHostInfo(selectedHost);
    setValue(selectedHost.area);
    setActive(selectedHost.active);
  }

  function handleHostUpdate({ value }) {
    let prevChar = '';
    const nameLetters = value.split('').map((char, i) => {
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
    const betterName = nameLetters.join("");
    if ((hosts.filter(host => host.area === value).length) < (areas.filter(area => area.name === value)[0].limit)) {
      setValue(value);
      fetch(`http://localhost:3001/hosts/${hostInfo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({...hostInfo, area: value})
      })
      .then(r => r.json())
      .then(data => {
        const updatedHosts = hosts.map(host => {
          if (host.id === data.id) {
            return data;
          } else {
            return host;
          }
        })
        setHosts([...updatedHosts]);
        setIsAllActive(!Boolean(updatedHosts.filter(host => !host.active).reduce((accum) => accum + 1, 0)));
      });
      const input = `${hostInfo.firstName} set in area: ${betterName}`;
      dummyLogs(input, 3);
    } else {
      const input = `Too many hosts. Cannot add ${hostInfo.firstName} to ${betterName}`;
      dummyLogs(input, 1);
    }

  }

  function handleRadioChange(){
    setActive(!active);
    fetch(`http://localhost:3001/hosts/${hostInfo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({active: !active})
    })
    .then(r => r.json())
    .then(data => {
      const updatedHosts = hosts.map(host => {
        if (host.id === data.id) {
          return data;
        } else {
          return host;
        }
      })
      setHosts([...updatedHosts]);
      setIsAllActive(!Boolean(updatedHosts.filter(host => !host.active).reduce((accum) => accum + 1, 0)));
    });
    if (!active) {
      const input = `Activated ${hostInfo.firstName}.`;
      dummyLogs(input, 2);
    } else {
      const input = `Decommissioned ${hostInfo.firstName}.`;
      dummyLogs(input, 3);
    }
  }

  function handleActivateAll() {
    const updatedHosts = hosts.map(host => {
      if (host.active === false) {
        fetch(`http://localhost:3001/hosts/${host.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({active: true})
        })
        .then(r => r.json())
        .then(data => data);
        return {...host, active: true};
      } else {
        return host;
      }
    })
    console.log([...updatedHosts])
    setHosts([...updatedHosts]);
    setIsAllActive(true);
    const input = `Activated all hosts!`;
    dummyLogs(input, 2);
  }

  function handleDecommisionAll() {
    const updatedHosts = hosts.map(host => {
      fetch(`http://localhost:3001/hosts/${host.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({active: false})
      })
      .then(r => r.json())
      .then(data => data);
      return {...host, active: false};
    })
    setHosts([...updatedHosts]);
    setIsAllActive(false);
    const input = `Decommissioned all hosts.`;
    dummyLogs(input, 3);
  }

  function dummyLogs(input, type) {
    if (type === 1) {
      setLogs([Log.error(input), ...logs]);
    } else if (type === 2) {
      setLogs([Log.warn(input), ...logs]);
    } else {
      setLogs([Log.notify(input), ...logs]);
    }
  }

  if (!areas || !hosts) return <p>Loading...</p>

  return (
    <Segment id="app">
      <WestworldMap areas={areas} hosts={hosts} onHostSelect={handleHostSelect} selected={selected} />
      <Headquarters hosts={hosts} onHostSelect={handleHostSelect} hostInfo={hostInfo} selected={selected} selectedHost={selected[hostInfo.id-1]} onHostUpdate={handleHostUpdate} value={value} handleRadioChange={handleRadioChange} active={active} onDecommisionAll={handleDecommisionAll} onActivateAll={handleActivateAll} isAllActive={isAllActive} logs={logs} />
    </Segment>
  );
}

export default App;
