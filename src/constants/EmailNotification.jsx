import React, { useState } from "react";
import { FormControl, TextField,Button } from "@mui/material";
import { toast } from "react-hot-toast";


const EmailNotification = ({ modalData }) => {
  const [user, setUser] = useState(null);
  const [emailSubject, setEmailSubject] = useState(""); 
  const [emailText, setEmailText] = useState("");
  const handleSendNotification = () => {
    const token = localStorage.getItem("token");

    if (user == null) {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };
      const payload = {
            userId: 5,
            subject: emailSubject, 
            text: emailText,   
      };
      console.log("Request Payload:", payload);
      const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
      };

      fetch("https://sewzee.onrender.com/api/admin/emailNotification", requestOptions)
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
  const handleClear = () => {
    setUser(null);
    setEmailSubject("");
    setEmailText("");
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <FormControl style={{ margin: "10px", width: "300px" }}>
      <FormControl style={{ margin: "10px", width: "300px" }}>
            <TextField
              label="Email Subject"
              variant="outlined"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
            />
          </FormControl>
          <FormControl style={{ margin: "10px", width: "300px" }}>
            <TextField
              label="Email Text"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
            />
          </FormControl>
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
            width: "120px",
            marginLeft:"25px"
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
            width: "120px",
         

          }}
        >
          Clear
        </Button>
      </div>
      </FormControl>
    </div>
  );
};

export default EmailNotification;
