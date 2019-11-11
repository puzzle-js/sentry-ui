import React, { useEffect, useState } from 'react';
import socket from '../../socket';

const Gateways = () => {
  const [gateways, setGateways] = useState([])
  const onGateways = (data) => {
    console.log("onGateways", data);
    setGateways(data)
  }
  useEffect(() => {
    socket.emit("gateways.get")
    socket.on("gateways", onGateways)
  }, [])

  return (
    <div className="animated fadeIn">
      {
        Array.isArray(gateways) && gateways.map((gateway, i) => <div key={i}>{gateway}</div>)
      }
    </div>
  );
}

export default Gateways;

