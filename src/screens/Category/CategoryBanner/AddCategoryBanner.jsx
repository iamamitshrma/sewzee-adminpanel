import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useEffect, useRef, useState } from "react";
import {
    Autocomplete,
    FormControl,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    InputLabel,
    ListItemText,
    Slider,
    Switch,
    Tooltip,
} from "@mui/material";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import "./CategoryBanner.css";
import API from "../../../services/common";
import ProductTopHead from "../../../components/ProductTopHead/ProductTopHead";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { colorsArray } from "../../../constants";
import { storage } from "../../../firebase/firebase";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// Gender options
const genderList = ["Men", "Women"];
const SizeList = ["XS", "S", "M", "L", "XL"];

function valuetext(value) {
    return `${value}°C`;
}

const AddCategoryBanner = () => {
    const imgref = useRef(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [percentUpload, setPercentUpload] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({
        type: "",
        brand: "",
        boutique: "",
        category: "",
        image: "",
        is_banner: 0,
        is_banner2: 0,
        is_thumbnail: 0,
        filters: null,
    });
    const [filters, setFilters] = useState({
        gender: [],
        category: [],
        brand: [],
        boutique: [],
        colorname: [],
        size: [],
        price: {
            min: "",
            max: "",
        },
    });
    const [rangeValue, setRangeValue] = useState([10, 1000]);
    const [brandData, setBrandData] = useState([]);
    const [categoryData, setCategoryData] = useState({
        category: [],
        categoryTypeMen: [],
        categoryTypeWomen: [],
    });
    const [boutiqueData, setBoutiqueData] = useState([]);

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const response = await API.get(`api/admin/brandname?search=`);
                setBrandData(response.data.data);
            } catch (error) {
                toast.error(error?.response?.data?.message);
            }
        };
        const fetchBoutique = async () => {
            try {
                const response = await API.get(
                    `api/admin/boutiquename?search=`
                );
                setBoutiqueData(response.data.data);
            } catch (error) {
                toast.error(error?.response?.data?.message);
            }
        };
        const fetchCategory = async () => {
            try {
                const response = await API.get(
                    `api/admin/categoryname?type=&search=`
                );
                if (response.status === 200) {
                    console.log(response.data.category[0]);
                    const data = response.data.category.map((item) => {
                        return {
                            label: item?.category,
                            value: item?.id,
                            type: item?.type,
                        };
                    });
                    const filterForMen = data.filter(
                        (item) => item.type === "Men"
                    );
                    const filterForWomen = data.filter(
                        (item) => item.type === "Women"
                    );

                    setCategoryData({
                        ...categoryData,
                        category: data,
                        categoryTypeMen: filterForMen,
                        categoryTypeWomen: filterForWomen,
                    });
                }
            } catch (error) {
                toast.error(error?.response?.data?.message);
            }
        };

        fetchBrand();
        fetchBoutique();
        fetchCategory();
    }, []);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (
            name === "is_banner" ||
            name === "is_thumbnail" ||
            name === "is_banner2"
        ) {
            setFormData((prev) => ({
                ...prev,
                [name]: checked ? 1 : 0,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleCategory = (e, item) => {
        console.log(item);
        setFormData({
            ...formData,
            category: item?.value,
        });
    };

    const handleName = (e, item) => {
        setFormData({
            ...formData,
            brand: formData?.type === "brand" ? item?.id : null,
            boutique: formData?.type === "boutique" ? item?.id : null,
        });
    };
    // handle filter change
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
        if (name === "price") {
            setRangeValue(value);
            setFilters((prevFilters) => ({
                ...prevFilters,
                price: {
                    min: value[0],
                    max: value[1],
                },
            }));
        } else if (name === "min") {
            // set range value on state and filters
            setRangeValue([value, rangeValue[1]]);
            setFilters((prevFilters) => ({
                ...prevFilters,
                price: {
                    ...prevFilters?.price,
                    min: value,
                },
            }));
        } else if (name === "max") {
            // set range value on state and filters
            setRangeValue([rangeValue[0], value]);
            setFilters((prevFilters) => ({
                ...prevFilters,
                price: {
                    ...prevFilters?.price,
                    max: value,
                },
            }));
        }
    };
    // handle upload
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
                    setFormData((prev) => ({
                        ...prev,
                        image: downloadURL,
                    }));
                });
            }
        );
    };

    // handle update
    const handleUpdate = async () => {
        let bodyData;
        setIsLoading(true);

        // Checking if type is selected or not
        if (!formData?.type) {
            toast.error("Please Select Type");
            setIsLoading(false);
            return;
        }
        // Checking if brand or boutique is selected or not
        if (
            !formData?.brand &&
            !formData?.boutique &&
            formData?.type !== "product"
        ) {
            toast.error(`Please Select ${formData?.type}`);
            setIsLoading(false);
            return;
        }

        // Checking if image is uploaded or not
        if (!formData?.image) {
            toast.error("Please Upload Image");
            setIsLoading(false);
            return;
        }
        // Checking if banner or thumbnail is selected or not
        if (
            formData?.is_banner === 0 &&
            formData?.is_thumbnail === 0 &&
            formData?.is_banner2 === 0
        ) {
            toast.error("Please Select Banner or Thumbnail");
            setIsLoading(false);
            return;
        }
        // Checking if type is product or not
        if (formData?.type === "product") {
            // Checking if all filters are empty or not
            if (
                filters?.gender?.length === 0 &&
                filters.category.length === 0 &&
                filters.brand.length === 0 &&
                filters.boutique.length === 0 &&
                filters.size.length === "" &&
                filters.colorname.length === "" &&
                filters.price.min === "" &&
                filters.price.max === ""
            ) {
                toast.error("Please Select Minimum One Filters Options");
                setIsLoading(false);
                return;
            }
            // add product filter data
            bodyData = {
                ...formData,
                brand: null,
                boutique: null,
                filters: {
                    ...filters,
                    brand:
                        filters?.brand?.length > 0
                            ? filters?.brand?.map((item) => {
                                  return {
                                      id: item?.id,
                                      name: item?.name,
                                  };
                              })
                            : [],
                    boutique:
                        filters?.boutique?.length > 0
                            ? filters?.boutique?.map((item) => {
                                  return {
                                      id: item?.id,
                                      name: item?.name,
                                  };
                              })
                            : [],
                    category:
                        filters?.category?.length > 0
                            ? filters?.category?.map((item) => {
                                  return {
                                      id: item?.value,
                                      name: item?.label,
                                  };
                              })
                            : [],
                    size: filters.size.length > 0 ? filters?.size : [],
                    colorname:
                        filters.colorname.length > 0
                            ? filters?.colorname?.map((item) => item?.name)
                            : [],
                    gender: filters.gender.length > 0 ? filters.gender : [],
                    price: {
                        min:
                            filters?.price?.min === ""
                                ? ""
                                : filters?.price?.min,
                        max:
                            filters?.price?.max === ""
                                ? ""
                                : filters?.price?.max,
                    },
                },
            };
        } else {
            // add brand or boutique data
            bodyData = formData;
        }

        // Checking if brand or boutique is selected or not

        // sedning post request on api
        try {
            console.log(bodyData);
            const response = await API.post(
                "api/admin/category/media",
                bodyData
            );
            if (response.status === 200) {
                toast.success(response.data.message);
                navigate("/category/thumbs");
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(error?.response?.data?.message);
        }
    };

    console.log(formData);
    return (
        <div className="categoryBannerWrapper">
            <PageHeader
                headerBtnName={`${isLoading ? "Loading..." : "Save"}`}
                headerTitle={"Add Category Banner / Thumbnail"}
                isBtn={true}
                type="back"
                handleClick={handleUpdate}
                handleBack={() => navigate("/category/thumbs")}
            />
            <ProductTopHead
                title={"Category Brand / Boutiques / Product Info "}
            />
            <div>
                <div className="categoryBannerInputContainer">
                    <div className="categoryBannerAutoInput">
                        <Autocomplete
                            id="combo-box-demo"
                            options={categoryData?.category}
                            name="category"
                            sx={{ width: 300 }}
                            onChange={handleCategory}
                            // value={defaultData}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => (
                                <TextField
                                    value={params}
                                    {...params}
                                    label={`Select Category`}
                                />
                            )}
                        />
                    </div>
                    <div className="categoryBannerInput">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Change Type
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Change Type"
                                name="type"
                                onChange={handleChange}
                                value={formData?.type}
                            >
                                <MenuItem value="brand">Brand</MenuItem>
                                <MenuItem value="boutique">Boutique</MenuItem>
                                <MenuItem value="product">Product</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    {(formData?.type === "brand" ||
                        formData?.type === "boutique") && (
                        <div className="categoryBannerAutoInput">
                            <Autocomplete
                                id="combo-box-demo"
                                options={
                                    formData?.type === "brand"
                                        ? brandData
                                        : boutiqueData
                                }
                                name="name"
                                sx={{ width: 300 }}
                                onChange={handleName}
                                // value={defaultData}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <TextField
                                        value={params}
                                        {...params}
                                        label={`Select ${formData?.type} name`}
                                    />
                                )}
                            />
                        </div>
                    )}
                </div>
            </div>
            {formData?.type === "product" && (
                <>
                    <ProductTopHead
                        title={
                            "Markateplace Banner / Thumbnail Product Filters Options"
                        }
                    />
                    <div className="productFilter">
                        <div
                            style={{
                                marginRight: "19px",
                            }}
                            className="categoryBannerAutoInput"
                        >
                            <FormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel id="demo-multiple-checkbox-label">
                                    Select Gender
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Change Gender"
                                    name="gender"
                                    multiple
                                    onChange={handleFilterChange}
                                    value={filters?.gender}
                                    input={
                                        <OutlinedInput label="Select Gender" />
                                    }
                                    renderValue={(selected) =>
                                        selected.join(", ")
                                    }
                                    MenuProps={MenuProps}
                                >
                                    {genderList.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            <Checkbox
                                                checked={
                                                    filters?.gender?.indexOf(
                                                        name
                                                    ) > -1
                                                }
                                            />
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="">
                            <Autocomplete
                                className="categoryBannerAutoComplete1"
                                multiple
                                id="demo-simple-select"
                                disableCloseOnSelect
                                options={
                                    filters?.gender.length === 2
                                        ? categoryData?.category
                                        : filters?.gender.includes("Women")
                                        ? categoryData?.categoryTypeWomen
                                        : categoryData?.categoryTypeMen
                                }
                                getOptionLabel={(option) => option?.label}
                                value={filters?.category}
                                onChange={(_, newValue) =>
                                    handleFilterChange({
                                        target: {
                                            name: "category",
                                            value: newValue,
                                        },
                                    })
                                }
                                renderValue={(selected) => selected.join(", ")}
                                renderOption={(props, option, { selected }) => (
                                    <li key={option?.id} {...props}>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option?.label}
                                    </li>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Select Category"
                                        placeholder="Search"
                                    />
                                )}
                            />
                        </div>
                        <div className="">
                            <Autocomplete
                                className="categoryBannerAutoComplete1"
                                multiple
                                id="demo-simple-select"
                                disableCloseOnSelect
                                options={colorsArray}
                                getOptionLabel={(option) => option?.name}
                                value={filters?.colorname}
                                onChange={(_, newValue) =>
                                    handleFilterChange({
                                        target: {
                                            name: "colorname",
                                            value: newValue,
                                        },
                                    })
                                }
                                renderValue={(selected) => selected.join(", ")}
                                renderOption={(props, option, { selected }) => (
                                    <li
                                        className=""
                                        key={option?.id}
                                        {...props}
                                    >
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        <div className="d-flex align-items-center">
                                            <span>{option?.name} </span>
                                            <p
                                                style={{
                                                    backgroundColor:
                                                        option?.code,
                                                }}
                                                className="checkboxpara"
                                            ></p>
                                        </div>
                                    </li>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Select Color"
                                        placeholder="Search"
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="productFilter my-3">
                        <div className="">
                            <Autocomplete
                                className="categoryBannerAutoComplete1"
                                multiple
                                id="demo-simple-select"
                                disableCloseOnSelect
                                options={brandData}
                                getOptionLabel={(option) => option?.name}
                                value={filters?.brand}
                                onChange={(_, newValue) =>
                                    handleFilterChange({
                                        target: {
                                            name: "brand",
                                            value: newValue,
                                        },
                                    })
                                }
                                renderValue={(selected) => selected.join(", ")}
                                renderOption={(props, option, { selected }) => (
                                    <li key={option?.id} {...props}>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option?.name}
                                    </li>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Select Brand"
                                        placeholder="Search"
                                    />
                                )}
                            />
                        </div>
                        <div className="">
                            <Autocomplete
                                className="categoryBannerAutoComplete1"
                                multiple
                                id="demo-simple-select"
                                disableCloseOnSelect
                                options={boutiqueData}
                                getOptionLabel={(option) => option?.name}
                                value={filters?.boutique}
                                onChange={(_, newValue) =>
                                    handleFilterChange({
                                        target: {
                                            name: "boutique",
                                            value: newValue,
                                        },
                                    })
                                }
                                renderValue={(selected) => selected.join(", ")}
                                renderOption={(props, option, { selected }) => (
                                    <li key={option?.id} {...props}>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option?.name}
                                    </li>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Select Boutique"
                                        placeholder="Search"
                                    />
                                )}
                            />
                        </div>
                        <div className="categoryBannerAutoInput">
                            <FormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel id="demo-multiple-checkbox-label">
                                    Select Size
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Select Size"
                                    name="size"
                                    multiple
                                    onChange={handleFilterChange}
                                    value={filters?.size}
                                    input={
                                        <OutlinedInput label="Select Gender" />
                                    }
                                    renderValue={(selected) =>
                                        selected.join(", ")
                                    }
                                    MenuProps={MenuProps}
                                >
                                    {SizeList.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            <Checkbox
                                                checked={
                                                    filters?.size?.indexOf(
                                                        name
                                                    ) > -1
                                                }
                                            />
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="productFilter my-3"></div>
                    <div className="productFilter">
                        <div className="categoryBannerInputContainer w-100 ms-3">
                            <div className="categoryBannerInput">
                                <h6>Price Range</h6>
                                <Box sx={{ width: 272 }}>
                                    <Slider
                                        getAriaLabel={() => "Price range"}
                                        value={rangeValue}
                                        min={0}
                                        name="price"
                                        max={10000}
                                        onChange={handleFilterChange}
                                        valueLabelDisplay="auto"
                                        getAriaValueText={valuetext}
                                    />
                                </Box>
                            </div>
                            <div className="categoryBannerInput">
                                <TextField
                                    id="outlined-basic"
                                    label="Price Min"
                                    variant="outlined"
                                    name="min"
                                    onChange={handleFilterChange}
                                    value={filters?.price?.min}
                                />
                            </div>
                            <div className="categoryBannerInput">
                                <TextField
                                    id="outlined-basic"
                                    label="Price Max"
                                    variant="outlined"
                                    name="max"
                                    value={filters?.price?.max}
                                    onChange={handleFilterChange}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
            <ProductTopHead title={"Category Banner / Thumbnail"} />
            <div>
                <div className="categoryBannerMediaOption">
                    <div className="categoryBannerMediaUoload">
                        <h6>Image Upload</h6>
                        <div className="categoryBannerMediaInputs">
                            <label
                                onClick={() => imgref.current.click()}
                                className="categoryBannerLogoUploadBtn {
                                    "
                            >
                                {" "}
                                {isUploading
                                    ? percentUpload
                                    : formData?.image
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
                    <div className="categoryBannerMediaOther">
                        <h6>
                            Make This Image as Banner One{" "}
                            <Tooltip
                                className="flex"
                                title={
                                    formData?.image
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
                                        name="is_banner"
                                        disabled={!formData.image}
                                        defaultChecked={
                                            formData?.is_banner === 1
                                                ? true
                                                : false
                                        }
                                    />
                                }
                            />
                        </FormGroup>
                    </div>
                    <div className="categoryBannerMediaOther">
                        <h6>
                            Make This Image as Banner Two{" "}
                            <Tooltip
                                className="flex"
                                title={
                                    formData?.image
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
                                        name="is_banner2"
                                        disabled={!formData.image}
                                        defaultChecked={
                                            formData?.is_banner2 === 1
                                                ? true
                                                : false
                                        }
                                    />
                                }
                            />
                        </FormGroup>
                    </div>
                    <div className="categoryBannerMediaOther">
                        <h6>
                            Make This Image as Thumbnail{" "}
                            <Tooltip
                                className="flex"
                                title={
                                    formData?.image
                                        ? "Please toggle the switch to set this image as the thumbnail."
                                        : "First Upload Image"
                                }
                                placement="bottom"
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
                                        disabled={!formData.image}
                                        name="is_thumbnail"
                                        defaultChecked={
                                            formData?.is_thumbnail === 1
                                                ? true
                                                : false
                                        }
                                    />
                                }
                            />
                        </FormGroup>
                    </div>
                </div>

                <div className="categoryBannerMedia">
                    {(formData?.is_banner === 1 ||
                        formData?.is_banner2 === 1) && (
                        <div className="categoryBannerPrev">
                            <h6>Banner</h6>
                            <img src={formData?.image} alt="" />
                        </div>
                    )}
                    {formData?.is_thumbnail === 1 && (
                        <div className="categoryBannerThumbnailPrev">
                            <h6>Thumbnail</h6>
                            <img src={formData?.image} alt="" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddCategoryBanner;
