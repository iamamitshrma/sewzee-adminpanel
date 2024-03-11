import React, { useState } from "react";
import { FormControl, TextField, Button } from "@mui/material";
import { toast } from "react-hot-toast";
const RadialPrice = () => {
    const [radial, setRadial] = useState(null);
    const [radius, setRadius] = useState();
    const [percentage, SetPercentage] = useState(5);
    const handleRadialPrice = () => {
        const token = localStorage.getItem("token");

        if (radial == null) {
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };
            const payload = {
                radius: parseInt(radius),
                percentage: percentage,
            };
            console.log("Request Payload:", payload);
            const requestOptions = {
                method: "POST",
                headers: headers,
                body: JSON.stringify(payload),
            };

            fetch(
                "https://sewzee.onrender.com/api/admin/prices/radial/",
                requestOptions
            )
                .then((response) => response.json())
                .then((data) => {
                    toast.success("Successfully Sent");
                    setRadial(data.data);
                })
                .catch((error) => {
                    console.error("Failed :", error);
                    toast.error("Failed ");
                });
        }
    };
    const handleClear = () => {
        setRadial(null);
        setRadius("");
        SetPercentage(5);
    };
  return (
    <div 
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <h4>Radial Price</h4>
                <FormControl style={{ margin: "10px", width: "300px" }}>
                    <FormControl style={{ margin: "10px", width: "300px" }}>
                        <TextField
                            label="Percentage%"
                            variant="outlined"
                            value={percentage}
                            onChange={(e) => SetPercentage(e.target.value)}
                        />
                    </FormControl>
                    <FormControl style={{ margin: "10px", width: "300px" }}>
                        <TextField
                            label="Enter Radius"
                            variant="outlined"
                            value={radius}
                            onChange={(e) => setRadius(e.target.value)}
                        />
                    </FormControl>
                    <div
                        style={{ display: "flex", gap: "10px", width: "100%" }}
                    >
                        <Button
                            variant="contained"
                            onClick={handleRadialPrice}
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
  )
}

export default RadialPrice