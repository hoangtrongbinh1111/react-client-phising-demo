import { useEffect, useRef, useState } from "react";
import "./App.css";

import { io } from "socket.io-client";

function App() {
  const socket = useRef();
  const [labData, setLabData] = useState("173b6a00-f818-4b13-a92e-445bd984503c");

  useEffect(() => {
    socket.current = io("http://c2d8-117-4-240-104.ngrok.io");

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
      <p>Demo training lab</p>
      <ul>
        <li>Step 1: Training - Nhap ID của bài Lab - Sau đó ấn training - Bật Log của Dev Tools lên để xem kết quả trả về, thời gian sẽ phải chờ đợi từ 2-5 phút</li>
        <li>Step 2: Testing - Vẫn giữ nguyên Id của bài Lab - Nhập epoch để test thử mô hình tương ứng với checkpoint epoch đó - Kết qủa được trả ra ở Log của Dev Tools</li>
        <li>Step 3: Inference - Nhập đường dẫn url xong Infer để xem kết quả ở Log của Dev Tools</li>
      </ul>
      <input type="text" id="labElement" placeholder="Lab Id" />
      <input type="text" id="datasetElement" placeholder="Dataset Id" />
      <input type="text" id="epochElement" placeholder="Epoch" />

      <button type="button" onClick={handleClickTrain} style={{marginLeft: 5 + 'px'}}>
        Train
      </button>

      <button type = "button" onClick= {handleClickTest} style={{marginLeft: 5 + 'px'}}>
        Test
      </button>

      <button type= "button" onClick={handleClickInfer} style= {{marginLeft: 5 + 'px'}}>
        Infer
      </button>

    
    </div>
    
  );
}

export default App;

