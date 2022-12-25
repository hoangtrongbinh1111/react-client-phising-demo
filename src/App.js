import { useEffect, useRef, useState } from "react";
import "./App.css";

import { io } from "socket.io-client";

function App() {
  const socket = useRef();
  const [labData, setLabData] = useState("173b6a00-f818-4b13-a92e-445bd984503c");

  useEffect(() => {
    socket.current = io("https://c2d8-117-4-240-104.ngrok.io");

    socket.current.on("connect", () => {
      console.log("connected to server");
    });

    socket.current.on(`send_training_result_${labData}`, (data) => {
      console.log(121221, data);
    });
  
    socket.current.on(`send_testing_result_${labData}`,(data) => {
      console.log(data);
    })

    socket.current.on(`send_infering_result_${labData}`,(data) => {
      console.log(data);
    })
  }, []);

  const handleClickTrain = () => {
    // setLabData(document.getElementById("labElement").value);
    socket.current.emit("start_train_model", {
      datasetId: document.getElementById("datasetElement").value,
      labId: document.getElementById("labElement").value,
    });
  };

  const handleClickTest = () => {
    // setLabData(document.getElementById("labElement").value);
    socket.current.emit('start_test_model',{
      labId : document.getElementById("labElement").value,
      epoch_selected: document.getElementById("epochElement").value,
      datasetId: document.getElementById("datasetElement").value
    })
  }

  const handleClickInfer = () => {
    // setLabData(document.getElementById("labElement").value);
    socket.current.emit('start_infer_model',{
      labId : document.getElementById("labElement").value,
      epoch_selected: document.getElementById("epochElement").value
    })
  }

 
  return (
    <div className="App">
      <p>Socket.io app</p>
      <input type="text" id="labElement" placeholder="Lab Id" />
      <input type="text" id="datasetElement" placeholder="Dataset Id" />
      <input type="text" id="epochElement" placeholder="Epoch" />

      <button type="button" onClick={handleClickTrain} style={{marginLeft: 5 + 'px'}}>
        Train
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

