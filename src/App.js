import React, { useState } from "react";
import UploadFile from "./uploadFile.js";
import backgroundImage from "./images/arbackground.png";
import loading_gif from './images/loading.gif'
// import othent from 'othent/dist';


const MALE = 'MALE'
const FEMALE = 'FEMALE'

function App() {


  const [visible, setVisible] = useState(null)
  const isMale = visible === MALE
  const isFemale = visible === FEMALE
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState("");
  const [transaction_id, setTransactionId] = useState("");
  const [message, setMessage] = useState("")
  const [sendToEmail, setSendToEmail] = useState("")
  
  



  function handleFileUpload(event) {
    const file = event.target.files[0];
    setFile(file);
    setFileName(file.name);
  }



  function handleSubmit(event) {
    event.preventDefault();
    if (!file) {
      alert("No file selected to upload");
      return;
    }
  
    setLoading(true);
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("message", message);
    formData.append("sendToEmail", sendToEmail);
    formData.append("sendFromEmail", 'lorimer@othent.io'); // change later to google SDK
  
    fetch('https://server.othent.io/weavetransfer', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setTransactionId(data.transactionId);
        setFileName("");
        setFile(null);
        if (data.success === true) {
          setRequestStatus('success');
          setMessage("")
          setSendToEmail("")
        } else {
          setRequestStatus('failed');
        }
      })
      .catch((error) => {
        console.error(error);
        setRequestStatus('failed');
        setLoading(false);
      });
  

  }
  








  const downloadLink = transaction_id ? `https://arweave.net/${transaction_id}` : '';


  return (


    <div
      className="App"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div className="transfer-container">
        <span className="logo-container">
          <h1 className="title">Weave Transfer</h1>
        </span>

        <p className="description">
          Test test public on-chain storage file transfer system using the Arweave permaweb and Othent.io walletless protocol.
        </p>

        <div className="toggle-option">
          <button className="upload" onClick={() => setVisible(MALE)}>Upload</button>
          <button className="download" onClick={() => setVisible(FEMALE)}>Download</button>
        </div>

        <div className="row">
          {
            isMale && (
              <div className="upload-box">
                <form onSubmit={handleSubmit}>
                {loading ? (
                  <div className="spinner-container">
                      <p className="spinner-text">Uploading</p>
                      <img className="spinner_gif" src={loading_gif} alt="loading gif" />
                  </div>
                ) : (
                  <>
                    <UploadFile onChange={handleFileUpload} fileName={fileName} />

                    <input className="message-input" 
                    placeholder="Send to Email" 
                    value={sendToEmail} onChange={(event) => setSendToEmail(event.target.value)} />

                    <input className="message-input" 
                    placeholder="Message (optional)" 
                    value={message} onChange={(event) => setMessage(event.target.value)} />

                    {transaction_id && requestStatus === 'success' && (
                      <div>
                        <p className="success-text1">Success!</p>
                          <div className="download-link">
                            <p className="success-text">File ID: </p>
                            <a className="download-link-a" target='_blank' rel="noreferrer" 
                            href={`https://arweave.net/${transaction_id}`}>
                              arweave.net/{transaction_id}
                            </a>
                          </div>
                        </div>
              )}
              
              {requestStatus === 'failed' && (
                      <p className="error-text">Failed to upload!</p>
                  )}

              <button className="transfer" type="submit">Upload</button>
            </>
          )}
          </form>
        </div>
        )}



        
        {
          isFemale && (
            <div className="download-box">
              <input className="download-input" 
                placeholder="Transaction ID: "
                value={transaction_id}
                onChange={(event) => setTransactionId(event.target.value)}
              ></input>
              <a href={downloadLink} className="download-button" target="_blank" rel="noreferrer">Download</a>
            </div>
          )
        }
      </div>
    </div>
  </div>
);
}

export default App;