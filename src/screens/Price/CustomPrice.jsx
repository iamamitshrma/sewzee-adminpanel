import React, { useState } from "react";
import { FormControl, TextField, Button } from "@mui/material";
import { toast } from "react-hot-toast";
const CustomPrice = () => {
    const [radial, setRadial] = useState(null);
    const [customRadius, setCustomRadius] = useState("");
    const [pincode, setPincode] = useState("");
    const [customPercentage, setCustomPercentage] = useState(5);
    const handleCustomPrice = () => {
        const token = localStorage.getItem("token");

        if (customRadius && pincode && customPercentage) {
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };
            const payload = {
                radius: parseInt(customRadius),
                pincode: parseInt(pincode),
                percentage: customPercentage,
            };
            console.log("Request Payload:", payload);
            const requestOptions = {
                method: "POST",
                headers: headers,
                body: JSON.stringify(payload),
            };

            fetch(
                "https://api.sewzee.shop/api/admin/prices/custom/",
                requestOptions
            )
                .then((response) => response.json())
                .then((data) => {
                    toast.success("Successfully Sent");
                    setRadial(data.data);
                })
                .catch((error) => {
                    console.error("Failed to Send Notification:", error);
                    toast.error("Failed to Send Notification");
                });
        }
    };
    const handleClearCustom = () => {
        setCustomRadius("");
        setPincode("");
        setCustomPercentage(5);
    };
  return (
    <div
    style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }}
>
    <h4>Custom Price</h4>
    <FormControl style={{ margin: "10px", width: "300px" }}>
        <FormControl style={{ margin: "10px", width: "300px" }}>
            <TextField
                label="Custom Radius"
                variant="outlined"
                value={customRadius}
                onChange={(e) => setCustomRadius(e.target.value)}
            />
        </FormControl>
        <FormControl style={{ margin: "10px", width: "100%" }}>
            <TextField
                label="Pincode"
                variant="outlined"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
            />
        </FormControl>
        <FormControl style={{ margin: "10px", width: "100%" }}>
            <TextField
                label="Custom Percentage%"
                variant="outlined"
                value={customPercentage}
                onChange={(e) =>
                    setCustomPercentage(e.target.value)
                }
            />
        </FormControl>
        <div
            style={{ display: "flex", gap: "10px", width: "100%" }}
        >
            <Button
                variant="contained"
                onClick={handleCustomPrice}
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
                    marginLeft: "25px",
                }}
            >
                Send
            </Button>
            <Button
                variant="contained"
                onClick={handleClearCustom}
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
  )
}

export default CustomPrice