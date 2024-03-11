import dayjs from "dayjs";
import { useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import "./OrderHeader.css";

const OrderHeader = ({
    marketplaceOrders,
    handleRefresh,
    setFilterData,
    filterData,
    filterByDate,
}) => {
    return (
        <div className="orderHeaderWrapper">
            <div className="orderTopDate">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                        <DatePicker
                            label="From"
                            variant="standard"
                            id="standard-basic"
                            value={
                                filterData?.from?.$d ? filterData.from : null
                            }
                            onChange={(value) =>
                                setFilterData({
                                    ...filterData,
                                    from: value,
                                })
                            }
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                        <DatePicker
                            label="To"
                            variant="standard"
                            value={filterData?.to?.$d ? filterData.from : null}
                            onChange={(value) =>
                                setFilterData({
                                    ...filterData,
                                    to: value,
                                })
                            }
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <SearchIcon
                    onClick={() => filterByDate()}
                    className="searchIcon"
                />
            </div>
            <div className="orderTopBarAction">
                <RefreshIcon
                    className={
                        marketplaceOrders?.isRefreshing
                            ? "refreshData"
                            : "refreshDataOff"
                    }
                    onClick={handleRefresh}
                />
                {["Completed", "Ongoing", "Pending", "Rejected"].map((item) => (
                    <p
                        onClick={() =>
                            setFilterData({
                                ...filterData,
                                status: item.toLowerCase(),
                            })
                        }
                        className={` text-uppercase ${item}
                            ${
                                filterData.status === item.toLowerCase() &&
                                "orderActive"
                            }`}
                        key={item}
                    >
                        {item}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default OrderHeader;
