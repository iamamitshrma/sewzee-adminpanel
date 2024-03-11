import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import API from "../../services/common";

const CustomToolbarAutoComplete = ({ setFilterCategory, filterCategory }) => {
    const [formData, setFormData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await API.get("api/admin/categoryname");

            setFormData({
                isLoading: false,
                data: response?.data?.category,
            });
        } catch (error) {
            toast.error(error?.response?.data?.message);
            setFormData({
                isLoading: false,
                data: [],
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleName = (e, value) => {
        console.log("value", value);
        setFilterCategory(value);
    };
    return (
        <Autocomplete
            id="combo-box-demo"
            options={formData?.data}
            name="name"
            sx={{ width: 300 }}
            onChange={handleName}
            // value={filterCategory}
            getOptionLabel={(option) => option.category}
            renderInput={(params) => (
                <TextField
                    value={params}
                    {...params}
                    label={`Select Category`}
                />
            )}
        />
    );
};

export default CustomToolbarAutoComplete;
