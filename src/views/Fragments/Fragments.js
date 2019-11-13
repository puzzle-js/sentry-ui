import React, { useEffect, useContext } from 'react';
import { Context } from "../../context/puzzle-context";
import socket from "../../socket";

const Fragments = () => {
  const { fragments } = useContext(Context)
  useEffect(() => {
    socket.emit("fragments.get",)
  }, [])

  return (
    <div className="animated fadeIn">
      {
        Array.isArray(fragments) && fragments.map((fragment, i) => <div key={i}>{JSON.stringify(fragment)}</div>)
      }
    </div>
  );
}

export default Fragments;

