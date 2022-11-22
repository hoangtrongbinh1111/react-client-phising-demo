import { useEffect, useRef, useState } from "react";
import "./App.css";

import { io } from "socket.io-client";

function App() {
  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://0.0.0.0:6789");

    socket.current.on("connect", () => {
      console.log("connected to server");
    });

    socket.current.on("send_training_result_261599", (data) => {
      console.log(121221, data);
    });
  }, []);

  const handleClick = () => {
    socket.current.emit("start_train_model", {
      sid: "261599",
    });
  };

  return (
    <div className="App">
      <p>Socket.io app</p>

      <button type="button" onClick={handleClick}>
        Emit a time message
      </button>
    </div>
  );
}

export default App;
