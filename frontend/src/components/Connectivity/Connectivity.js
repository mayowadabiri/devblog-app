import React, { useEffect, useState } from "react";
import classes from "./Connectivity.module.css";

const Connectivity = (props) => {
  const [connectMsg, setConnectMsg] = useState("");
  const [connect, setConnect] = useState(navigator.onLine);
  useEffect(() => {
    if (!connect) {
      setConnect(false);
      setConnectMsg("Seems like you are not connected to the internet.");
    } else {
      setConnectMsg(null);
      setConnect(true);
    }
  }, [navigator.onLine]);

  let showConnect = connect ? null : (
    <div className={classes.Connect}>
      <p>{connectMsg}</p>
    </div>
  );
  return showConnect
};

export default Connectivity;
