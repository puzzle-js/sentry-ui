import React, { useEffect, useState } from 'react';
import socket from '../../socket';

const Pages = () => {
  const [pages, setPages] = useState([])
  const onPages = (data) => {
    console.log("onPages", data);
    setPages(data);
  }
  useEffect(() => {
    socket.emit("pages.get")
    socket.on("pages", onPages)
  }, [])

  return (
    <div className="animated fadeIn">
      {
        Array.isArray(pages) && pages.map((page, i) => <div key={i}>{page}</div>)
      }
    </div>
  );
}

export default Pages;