import React, { useEffect, useContext } from 'react';
import socket from '../../socket';
import { Context } from '../../context/puzzle-context';

const Pages = () => {
  const { pages } = useContext(Context);
  useEffect(() => {
    socket.emit("panel.pages.get")
  }, [])

  return (
    <div className="animated fadeIn">
      {
        Array.isArray(pages) && pages.map((page, i) => <div key={i}>{JSON.stringify(page)}</div>)
      }
    </div>
  );
}

export default Pages;