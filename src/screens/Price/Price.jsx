import React, { useState } from "react";
import HeaderToggle from "../../components/HeaderToggle/HeaderToggle";
import { PriceToggleItems } from "../../constants/ToggleItems";
import RadialPrice from "./RadialPrice";
import CustomPrice from "./CustomPrice";
import PriceDeatilsBody from "./PriceDetailsBody";
import "./Price.css"

const Price = ({ modalData }) => {
  const [toggleType, setToggleType] = useState("Radial Price");
    const handleToggle = (type) => {
      setToggleType(type);
  };
   
   
    // const handleSurgeOrderPrice = () => {
    //     const token = localStorage.getItem("token");

    //     if (surgeOrder && surgeOrderPercentage) {
    //         const headers = {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${token}`,
    //         };
    //         const payload = {
    //             order: parseInt(surgeOrder),
    //             percentage: customPercentage,
    //         };
    //         console.log("Request Payload:", payload);
    //         const requestOptions = {
    //             method: "POST",
    //             headers: headers,
    //             body: JSON.stringify(payload),
    //         };

    //         fetch(
    //             "https://sewzee.onrender.com/api/admin/prices/surgeOrder/",
    //             requestOptions
    //         )
    //             .then((response) => response.json())
    //             .then((data) => {
    //                 toast.success("Successfully Sent");
    //                 setRadial(data.data);
    //             })
    //             .catch((error) => {
    //                 console.error("Failed to Send Notification:", error);
    //                 toast.error("Failed to Send Notification");
    //             });
    //     }
    // };

    // const handleClear = () => {
    //     setRadial(null);
    //     setRadius("");
    //     SetPercentage(5);
    // };

   
    return (

        <>
         
         
            {/* <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "lightgrey",
                }}
            >
                <h4>Surge Order Prices</h4>
                <FormControl style={{ margin: "10px", width: "300px" }}>
                    <FormControl style={{ margin: "10px", width: "300px" }}>
                        <TextField
                            label="Percentage%"
                            variant="outlined"
                            value={surgeOrderPercentage}
                            onChange={(e) =>
                                setSurgeOrderPercentage(e.target.value)
                            }
                        />
                    </FormControl>
                    <FormControl style={{ margin: "10px", width: "300px" }}>
                        <TextField
                            label="Enter Radius"
                            variant="outlined"
                            value={surgeOrder}
                            onChange={(e) => setSurgeOrder(e.target.value)}
                        />
                    </FormControl>
                    <div
                        style={{ display: "flex", gap: "10px", width: "100%" }}
                    >
                        <Button
                            variant="contained"
                            onClick={handleSurgeOrderPrice}
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
            </div> */}
             <div className="priceWrapper">
            <HeaderToggle
                toggleList={PriceToggleItems}
                handleToggle={handleToggle}
                toggleType={toggleType}
            />
           <PriceDeatilsBody>
             {toggleType === "Radial Price" && (
                    <RadialPrice />
                )}
                {toggleType === "Custom Price" && (
                    <CustomPrice />
                )}
             </PriceDeatilsBody> 
             </div> 
        </>

        
    );

};

export default Price;
