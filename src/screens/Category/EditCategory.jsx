import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
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

import "./Category.css";
import API from "../../services/common";
import { storage } from "../../firebase/firebase";
import PageHeader from "../../components/PageHeader/PageHeader";
import ProductTopHead from "../../components/ProductTopHead/ProductTopHead";
import {
    InputLoader,
    InputWithOutLebelLoader,
    OneLineTextLoader,
} from "../../ui/SkeltonLoader/SkeltonLoader";

const EditCategory = () => {
    const { id } = useParams();
    const imgref = useRef(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [percentUpload, setPercentUpload] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [category, setCategory] = useState({
        isLoading: true,
        data: {
            type: "",
            category: "",
            image: "",
            is_show: 0,
        },
    });

    const fetchData = async () => {
        try {
            const response = await API.get(`api/admin/category/${id}`);
            if (response.status === 200) {
                setCategory({
                    isLoading: false,
                    data: response.data.category,
                });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setCategory({
                isLoading: false,
                data: [],
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, [rowsPerPage]);

    const handleUpdate = async () => {
        setIsLoading(true);
        if (
            !category?.data?.type ||
            !category?.data?.category ||
            !category?.data?.image
        ) {
            setIsLoading(false);
            toast.error("Please fill all the fields");
            return;
        }
        try {
            delete category?.data?.created_at;
            delete category?.data?.updated_at;
            delete category?.data?.id;
            delete category?.data?.subcategory;

            const response = await API.put(
                `api/admin/category/${id}`,
                category.data
            );
            if (response.status === 200) {
                setIsLoading(false);
                toast.success("Category updated successfully");
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
                data: {
                    ...category.data,
                    [name]: checked ? 1 : 0,
                },
            });
            return;
        }
        setCategory({
            ...category,
            data: {
                ...category.data,
                [name]: value,
            },
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
                        data: {
                            ...prev.data,
                            image: downloadURL,
                        },
                    }));
                });
            }
        );
    };

    console.log(category);
    return (
        <div className="categoryWrapper">
            <PageHeader
                headerTitle={"Edit Category"}
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
                        {category.isLoading ? (
                            <InputWithOutLebelLoader />
                        ) : (
                            <FormControl className="categoryInputSelect">
                                <InputLabel id="demo-simple-select-label">
                                    Select Type
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Select Type"
                                    value={category?.data?.type}
                                    name="type"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Men">Men</MenuItem>
                                    <MenuItem value="Women">Women</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                        {category?.data?.type && (
                            <div className="categoryInput">
                                <TextField
                                    id="outlined-basic"
                                    name="category"
                                    onChange={handleChange}
                                    label="Category Name"
                                    value={category?.data?.category}
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
                                    category?.data?.image
                                        ? "Please toggle the switch to set this image as the banner."
                                        : "First Upload Image"
                                }
                                placement="right"
                            >
                                {" "}
                                <InfoIcon />
                            </Tooltip>
                        </h6>
                        {category.isLoading ? (
                            <OneLineTextLoader />
                        ) : (
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            onChange={handleChange}
                                            name="is_show"
                                            disabled={!category.data?.image}
                                            defaultChecked={
                                                category?.data?.is_show === 1
                                                    ? true
                                                    : false
                                            }
                                        />
                                    }
                                />
                            </FormGroup>
                        )}
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
                                    : category?.data?.image
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
                        {category?.data?.image && (
                            <div className="categoryMediaPrev my-4">
                                <h6>Category Image</h6>
                                <img src={category?.data?.image} alt="" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCategory;
