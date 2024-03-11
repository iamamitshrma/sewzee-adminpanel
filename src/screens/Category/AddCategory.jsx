import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import {
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
    Tooltip,
} from "@mui/material";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import "./Category.css";

import ProductTopHead from "../../components/ProductTopHead/ProductTopHead";
import PageHeader from "../../components/PageHeader/PageHeader";
import { storage } from "../../firebase/firebase";
import API from "../../services/common";
import { toast } from "react-hot-toast";

const AddCategory = () => {
    const imgref = useRef(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [percentUpload, setPercentUpload] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [category, setCategory] = useState({
        type: "",
        category: "",
        image: "",
        is_show: 0,
    });

    const handleUpdate = async () => {
        setIsLoading(true);
        if (!category.type || !category.category || !category.image) {
            setIsLoading(false);
            toast.error("Please fill all the fields");
            return;
        }
        try {
            const response = await API.post("api/admin/category", category);
            if (response.status === 200) {
                setIsLoading(false);
                navigate("/category");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
            setIsLoading(false);
        }
    };
    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (name === "is_show") {
            setCategory({
                ...category,
                [name]: checked === true ? 1 : 0,
            });
            return;
        }
        setCategory({
            ...category,
            [name]: value,
        });
    };

    const handleUpload = (e) => {
        setIsUploading(true);
        const file = e.target.files[0];
        const sotrageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, file);
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
                    setCategory((prev) => ({
                        ...prev,
                        image: downloadURL,
                    }));
                });
            }
        );
    };

    
    return (
        <div className="categoryWrapper">
            <PageHeader
                headerTitle={"Add Category"}
                isBtn={true}
                type="back"
                headerBtnName={`${isLoading ? "Loading..." : "Save"}`}
                handleClick={handleUpdate}
                handleBack={() => navigate("/category")}
            />
            <div className="categoryContainer">
                <ProductTopHead title={"Category Info "} />
                <div>
                    <div className="categoryInputContainer mb-5">
                        <FormControl className="categoryInputSelect">
                            <InputLabel id="demo-simple-select-label">
                                Select Type
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Select Type"
                                name="type"
                                onChange={handleChange}
                            >
                                <MenuItem value="Men">Men</MenuItem>
                                <MenuItem value="Women">Women</MenuItem>
                            </Select>
                        </FormControl>
                        {category?.type && (
                            <div className="categoryInput">
                                <TextField
                                    id="outlined-basic"
                                    name="category"
                                    onChange={handleChange}
                                    label="Category Name"
                                    variant="outlined"
                                />
                            </div>
                        )}
                    </div>
                    <div className="categoryOther">
                        <h6>
                            Show this category on Home page{" "}
                            <Tooltip
                                className="flex"
                                title={
                                    category?.image
                                        ? "Please toggle the switch to set this image as the banner."
                                        : "First Upload Image"
                                }
                                placement="right"
                            >
                                {" "}
                                <InfoIcon />
                            </Tooltip>
                        </h6>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        onChange={handleChange}
                                        name="is_show"
                                        disabled={!category.image}
                                        defaultChecked={
                                            category?.is_show === 1
                                                ? true
                                                : false
                                        }
                                    />
                                }
                            />
                        </FormGroup>
                    </div>
                </div>
                <ProductTopHead title={"Category Image"} />
                <div>
                    <div className="categoryMediaUoload">
                        <h6>Image Upload</h6>
                        <div className="categoryInputs">
                            <label
                                onClick={() => imgref.current.click()}
                                className="marketplaceBannerLogoUploadBtn"
                            >
                                {" "}
                                {isUploading
                                    ? percentUpload
                                    : category?.image
                                    ? "Upload Again"
                                    : "Upload"}
                            </label>
                            <input
                                onChange={handleUpload}
                                type="file"
                                name="image"
                                ref={imgref}
                                hidden
                            />
                        </div>
                    </div>
                    <div className="categoryMedia">
                        {category?.image && (
                            <div className="categoryMediaPrev my-4">
                                <h6>Category Image</h6>
                                <img src={category?.image} alt="" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;
