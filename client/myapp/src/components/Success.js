import React from "react";
import { useEffect, useState } from "react";
function Success({ message }) {
  const [isVisible, setisVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setisVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return isVisible ? <div className="success">{message}</div> : null;
}

export default Success;
