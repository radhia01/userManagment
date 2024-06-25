import React from "react";
import { useState, useEffect } from "react";
function Error({ message }) {
  const [showMessage, setshowMessage] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setshowMessage(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return showMessage ? <div className=" error">{message}</div> : null;
}

export default Error;
