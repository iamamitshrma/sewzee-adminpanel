import React, { useState, useRef } from "react";
import { FormControl, TextField,Button } from "@mui/material";
import { toast } from "react-hot-toast";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/firebase";

const Notify = ({ modalData }) => {
  const imgref = useRef(null);
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [percentUpload, setPercentUpload] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const handleClear = () => {
    setUser(null);
    setTitle("");
    setDescription("");
    setImage("");
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    console.log("Title:", event.target.value);
  };

  const handleDescChange = (event) => {
    setDescription(event.target.value);
    console.log("Description:", event.target.value);
  };

  const handleUpload = (e) => {
    setIsUploading(true);
    const file = e.target.files[0];
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = `${Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )}%`;
        setPercentUpload(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setIsUploading(false);
          setImage(downloadURL);
        });
      }
    );
  };

  const handleSendNotification = () => {
    const token = localStorage.getItem("token");

    if (user == null) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const payload = {
        userId: 5,
        title: title,
        description: description,
        image: image,
      };
      console.log("Request Payload:", payload);
      const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
      };

      fetch("https://sewzee.onrender.com/api/admin/pushNotification", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          toast.success("Successfully Sent");
          setUser(data.data);
        })
        .catch((error) => {
          console.error("Failed to Send Notification:", error);
          toast.error("Failed to Send Notification");
        });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <FormControl style={{ margin: "10px", width: "300px" }}>
        <TextField label="Title" variant="outlined" value={title} onChange={handleTitleChange} />
      </FormControl>
      <FormControl style={{ margin: "10px", width: "300px" }}>
        <label
          onClick={() => imgref.current.click()}
          className="onboardingLogoUploadBtn"
        >
          {isUploading ? percentUpload : image ? "Upload Again" : "Upload Image"}
        </label>
        <input required onChange={handleUpload} type="file" ref={imgref} hidden />
      </FormControl>

      {image && (
        <img
          src={image}
          alt="Preview"
          style={{ maxWidth: "200px", maxHeight: "100px", margin: "10px" }}
        />
      )}
      <FormControl style={{ margin: "10px", width: "300px" }}>
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={handleDescChange}
        />
      </FormControl>
      <FormControl style={{ margin: "10px", width: "250px" }}>
      <div style={{ display: "flex", gap: "10px", width: "100%" }}>
        <Button
          variant="contained"
          onClick={handleSendNotification}
          style={{
            fontSize: "12px",
            height: "35px",
            padding: "12px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            background: "#7D5FFE",
            color: "#fff",
            marginRight: "10px",
            width: "130px",
          }}
        >
          Send 
        </Button>
        <Button
          variant="contained"
          onClick={handleClear}
          style={{
            fontSize: "12px",
            height: "35px",
            padding: "12px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            background: "#7D5FFE",
            color: "#fff",
            marginRight: "10px",
            width: "130px",
          }}
        >
          Clear
        </Button>
      </div>
      </FormControl>
    </div>
  );
};

export default Notify;
