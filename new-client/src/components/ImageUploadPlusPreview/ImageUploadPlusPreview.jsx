import React from 'react';
import './ImageUploadPlusPreview.css';
export const ImageUploadPlusPreview = ({name, values, onChange, whatToChange}) => {
  const handleChange = (event) => {
    if (event.target.files.length) {
      const newValue = { ...values };
      newValue[whatToChange].raw = event.target.files[0];
      newValue[whatToChange].preview = URL.createObjectURL(event.target.files[0]);
      console.log(newValue);
      onChange(newValue);
    }
  }

  return (
    <>
      {values[whatToChange].preview && (
        <img
          src={values.file.preview}
          alt="Your uploaded img"
          className="image-preview"
        />
      )}
      <input
        type="file"
        id={name}
        onChange={handleChange}
        className="inputfile"
      />
      <label htmlFor={name}>
        {!values.file.raw ? "Upload an image" : "Upload different"}
      </label>
    </>
  );
}
