import { useEffect, useRef, useState } from "react";
import "./App.css";

import { io } from "socket.io-client";

function App() {
  const socket = useRef();
  const [labData, setLabData] = useState("bc6790b7-4d99-4a57-8f1e-660f8b178907");

  useEffect(() => {
    socket.current = io("0.0.0.0:6789", {pingTimeout: 9999999999999});

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

    socket.current.on(`send_reviewing_dataset_result_${labData}`,(data) => {
      console.log(data);
    })
  }, []);

  const handleClickTrain = () => {
    // setLabData(document.getElementById("labElement").value);
    socket.current.emit("start_train_model", {
      datasetId: document.getElementById("datasetElement").value,
      labId: document.getElementById("labElement").value,
      sid: socket.current.id
    });
  };

  const handleClickTest = () => {
    // setLabData(document.getElementById("labElement").value);
    socket.current.emit('start_test_model',{
      labId : document.getElementById("labElement").value,
      datasetId: document.getElementById("datasetElement").value,
      epoch_selected: document.getElementById("epochElement").value,
      sid: socket.current.id
    })
  }

  const handleClickInfer = () => {
    // setLabData(document.getElementById("labElement").value);
    socket.current.emit('start_infer_model',{
      labId : document.getElementById("labElement").value,
      epoch_selected: document.getElementById("epochElement").value,
      url: document.getElementById("urlElement").value,
      sid: socket.current.id
    })
  }

  const handleClickUpdateDataset = () => {
    socket.current.emit('start_update_detail_dataset',{
      labId : document.getElementById("labElement").value,
      datasetId : document.getElementById("datasetElement").value,
      sid: socket.current.id
    })
  }

  const [selectedFile, setSelectedFile] = useState();

	const [isFilePicked, setIsFilePicked] = useState(false);


	const changeHandler = (event) => {

		setSelectedFile(event.target.files[0]);

		setIsFilePicked(true);

	};

	const handleSubmission = () => {
		const formData = new FormData();
		formData.append('files', selectedFile);
    formData.append('dataName', "Binh bo");
    formData.append('userUpload', "1234");
		fetch(
			'http://localhost:6789/api/v1/dataset/upload',
			{
				method: 'POST',

				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

 
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
      <input type="text" id="urlElement" placeholder="URL sample" />

      <button type="button" onClick={handleClickTrain} style={{marginLeft: 5 + 'px'}}>
        Train
      </button>

      <button type = "button" onClick= {handleClickTest} style={{marginLeft: 5 + 'px'}}>
        Test
      </button>

      <button type= "button" onClick={handleClickInfer} style= {{marginLeft: 5 + 'px'}}>
        Infer
      </button>

      <button type= "button" onClick={handleClickUpdateDataset} style= {{marginLeft: 5 + 'px'}}>
        Update dataset
      </button>

      {/* Upload file */}
      <div>
        <input type="file" name="files" onChange={changeHandler} multiple />
        {isFilePicked ? (
          <div>

            <p>Filename: {selectedFile.name}</p>

            <p>Filetype: {selectedFile.type}</p>

            <p>Size in bytes: {selectedFile.size}</p>

            <p>

              lastModifiedDate:{' '}

              {selectedFile.lastModifiedDate.toLocaleDateString()}

            </p>

          </div>

        ) : (

          <p>Select a file to show details</p>
        )}

        <div>
          <button onClick={handleSubmission}>Submit</button>

        </div>

        </div>

    
    </div>
    
  );
}

export default App;

