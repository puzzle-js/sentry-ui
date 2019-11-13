import React, { useEffect, useContext } from 'react';
import socket from '../../socket';
import { Context } from '../../context/puzzle-context';

const Gateways = () => {
  const { gateways } = useContext(Context);
  useEffect(() => {
    socket.emit("gateways.get")
  }, [])

  return (
    <div className="animated fadeIn">
      {
        Array.isArray(gateways) && gateways.map((gateway, i) => <div key={i}>{JSON.stringify(gateway)}</div>)
      }
    </div>
  );
}

export default Gateways;

