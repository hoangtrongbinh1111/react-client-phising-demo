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
  
    socket.current.on('send_testing_result_261599',(data) => {
      console.log(data);
    })

    socket.current.on('send_infering_result_261599',(data) => {
      console.log(data);
    })
  }, []);
 
  

  const handleClickTrain = () => {
    socket.current.emit("start_train_model", {
      sid: "261599",
      labId: "c075397d-daa2-4ae8-a7d9-2568ea23d8b0",
    });
  };

  const handleClickTest = () => {
    socket.current.emit('start_test_model',{
      sid: "261599",
      labId : 'c075397d-daa2-4ae8-a7d9-2568ea23d8b0',
    })
  }

  const handleClickInfer = () => {
    socket.current.emit('start_infer_model',{
      sid: "261599",
      labId : 'c075397d-daa2-4ae8-a7d9-2568ea23d8b0',
    })
  }

  return (
    <div className="App">
      <p>Socket.io app</p>

      <button type="button" onClick={handleClickTrain}>
        Emit a time message
      </button>

      <button type = "button" onClick= {handleClickTest} style={{marginLeft: 5 + 'px'}}>
        Choosen best epoch and test
      </button>

      <button type= "button" onClick={handleClickInfer} style= {{marginLeft: 5 + 'px'}}>
        INFERRRRRRR
      </button>
    </div>
  );
}

export default App;
