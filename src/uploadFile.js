import React from "react";
import './App.css'

export default function UploadFile({ onChange, fileName }) {
  
  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    onChange({ target: { files: [file] } });
  }

  function handleChange(event) {
    onChange(event);
  }

  return (
    <div
      className="file-upload"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <label htmlFor="file-input">
        <span className="upload-icon" role="img" aria-label="upload icon">
          {fileName ? "✅" : "📁"}
        </span>
        <span className="upload-text">
          {fileName ? fileName : "Choose a file or drag it here"}
        </span>
      </label>
      <input id="file-input" type="file" onChange={handleChange} />
    </div>
  );
}
