import React, { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import "../stylesheets/App.css";
import Headquarters from "./Headquarters";
import WestworldMap from "./WestworldMap";

function App() {
  const [areas, setAreas] = useState(null);
  const [hosts, setHosts] = useState([]);
  const [hostInfo, setHostInfo] = useState({id: 1, active: false});
  const [selected, setSelected] = useState(new Array(15).fill(false));
  const [value, setValue] = useState(hostInfo.area);
  const [active, setActive] = useState(hostInfo.active);
  const [isAllActive, setIsAllActive] = useState(true);

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

  function handleHostUpdate(updatedHost) {
    const updatedHosts = hosts.map(host => {
      if (host.id === updatedHost.id) {
        return updatedHost;
      } else {
        return host;
      }
    })
    setHosts([...updatedHosts]);
    setIsAllActive(!Boolean(updatedHosts.filter(host => !host.active).reduce((accum) => accum + 1, 0)));
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
  }

  if (!areas || !hosts) return <p>Loading...</p>

  return (
    <Segment id="app">
      <WestworldMap areas={areas} hosts={hosts} onHostSelect={handleHostSelect} selected={selected} />
      <Headquarters hosts={hosts} onHostSelect={handleHostSelect} hostInfo={hostInfo} selected={selected} selectedHost={selected[hostInfo.id-1]} onHostUpdate={handleHostUpdate} value={value} setValue={setValue} handleRadioChange={handleRadioChange} active={active} onDecommisionAll={handleDecommisionAll} onActivateAll={handleActivateAll} isAllActive={isAllActive} setIsAllActive={setIsAllActive} />
    </Segment>
  );
}

export default App;
