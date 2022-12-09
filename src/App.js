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


    socket.current.on('send_preprocess_result_261599',(data)=>{
      console.log((121221,data));
    })
    

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
 


  const handlePreprocess = () => {
    socket.current.emit('start_preprocess_model',{
      sid: '261599',
      datasetId: 'a6cc7a6d-1556-46da-8b73-60d4a3dd1896',
      // labId: '2a414760-fbb5-4374-962d-c29bee9730ad'
    })
  }

  const handleClickTrain = () => {
    socket.current.emit("start_train_model", {
      sid: "261599",
      datasetId: 'a6cc7a6d-1556-46da-8b73-60d4a3dd1896',
      labId: "2a414760-fbb5-4374-962d-c29bee9730ad",
    });
  };



  const handleClickTest = () => {
    socket.current.emit('start_test_model',{
      sid: "261599",
      datasetId: 'a6cc7a6d-1556-46da-8b73-60d4a3dd1896',
      labId : '2a414760-fbb5-4374-962d-c29bee9730ad',
    })
  }

  const handleClickInfer = () => {
    socket.current.emit('start_infer_model',{
      sid: "261599",
      labId : '2a414760-fbb5-4374-962d-c29bee9730ad',
    })
  }

 
  return (
    <div className="App">
      <p>Socket.io app</p>

      <button type="button" onClick={handlePreprocess}>
        Preeee
      </button>

      <button type="button" onClick={handleClickTrain} style={{marginLeft: 5 + 'px'}}>
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

