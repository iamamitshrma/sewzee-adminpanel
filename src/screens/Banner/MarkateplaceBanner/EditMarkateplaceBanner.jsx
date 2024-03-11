import { FormGroup } from "react-bootstrap";
import { useEffect, useMemo, useRef, useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import {
    Autocomplete,
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    Slider,
    Switch,
    TextField,
} from "@mui/material";

import "./MarkateplaceBanner.css";
import { storage } from "../../../firebase/firebase";
import API from "../../../services/common";
import PageHeader from "../../../components/PageHeader/PageHeader";
import ProductTopHead from "../../../components/ProductTopHead/ProductTopHead";

import { InputLoader } from "../../../ui/SkeltonLoader/SkeltonLoader";
import { toast } from "react-hot-toast";
import { colorsArray } from "../../../constants";

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
const EditMarkateplaceBanner = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const imgref = useRef(null);
    const [isEditLoading, setIsEditLoading] = useState(false);
    const [percentUpload, setPercentUpload] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [defaultData, setDefaultData] = useState(null);
    const [rangeValue, setRangeValue] = useState([10, 1000]);
    const [formData, setFormData] = useState({});
    const [brandData, setBrandData] = useState([]);
    const [boutiqueData, setBoutiqueData] = useState([]);
    const [markateplaceBanner, setMarkateplaceBanner] = useState({
        isLoading: true,
        data: {},
    });

    // category data
    const [categoryData, setCategoryData] = useState({
        category: [],
        categoryTypeMen: [],
        categoryTypeWomen: [],
    });

    // fetch brand data for autocomplete
    async function fetchBrandData() {
        try {
            const response = await API.get("api/admin/brandname?search=");
            return response.data.data;
        } catch (error) {
            console.error("Error fetching brand data:", error);
            throw error;
        }
    }
    // fetch boutique data for autocomplete
    async function fetchBoutiqueData() {
        try {
            const response = await API.get("api/admin/boutiquename?search=");
            return response.data.data;
        } catch (error) {
            console.error("Error fetching brand data:", error);
            throw error;
        }
    }
    // fetch category data for autocomplete
    async function fetchCategoryData() {
        try {
            const response = await API.get("api/admin/categoryname?search=");
            return response.data.category;
        } catch (error) {
            console.error("Error fetching brand data:", error);
            throw error;
        }
    }

    // set brand data on state
    const setBrandDataOnState = async (data) => {
        const brandResponse = await fetchBrandData();
        const brandData = data.map((item) => {
            try {
                const data = brandResponse.find(
                    (brand) => brand.id === item.id
                );
                return (item = data);
            } catch (error) {
                console.error("Error fetching data:", error);
                return {};
            }
        });
        console.log(brandData);
        return brandData;
    };
    // set boutique data on state
    const setBoutiqueDataOnState = async (data) => {
        const boutiqueResponse = await fetchBoutiqueData();
        const boutiqueData = data?.map((item) => {
            try {
                const data = boutiqueResponse.find(
                    (brand) => brand.id === item.id
                );
                return (item = data);
            } catch (error) {
                console.error("Error fetching data:", error);
                return {};
            }
        });
        return boutiqueData;
    };
    // set category data on state
    const setCategoryDataOnState = async (data) => {
        const CategoryResponse = await fetchCategoryData();
        const CategoryData = data.map((item) => {
            try {
                const data = CategoryResponse.find(
                    (brand) => brand.id === item.id
                );
                
                return (item = {
                    label: data?.category,
                    value: data?.id,
                    type: data?.type,
                });
            } catch (error) {
                console.error("Error fetching data:", error);
                return {};
            }
        });
        return CategoryData;
    };
    // set colorname data on state
    const setColornameDataOnState = (data) => {
        const colorData = data.map((item) => {
            const data = colorsArray.find((item2) => item2.name === item);
            return (item = {
                name: data?.name,
                label: data?.label,
                code: data?.code,
            });
        });
        console.log(colorData);
        return colorData;
    };

    useEffect(() => {
        // fetch data
        const fetchData = async () => {
            try {
                const response = await API.get(`api/admin/media/${id}`);
                setFormData(response.data.data);
                // if type is product then set brand , boutique , category data filets object for autocomplete
                if (response?.data?.data?.type === "product") {
                    const brand =
                        response.data.data.filters.brand.length > 0
                            ? await setBrandDataOnState(
                                  response.data.data.filters.brand
                              )
                            : [];
                    const boutique =
                        response.data.data.filters.boutique.length > 0
                            ? await setBoutiqueDataOnState(
                                  response.data.data.filters.boutique
                              )
                            : [];
                    const category =
                        response.data.data.filters.category.length > 0
                            ? await setCategoryDataOnState(
                                  response.data.data.filters.category
                              )
                            : [];
                    const colorname =
                        response.data.data.filters.colorname.length > 0
                            ? setColornameDataOnState(
                                  response.data.data.filters.colorname
                              )
                            : [];

                    if (response.data.data.filters.price.min) {
                        setRangeValue([
                            response.data.data.filters.price.min,
                            rangeValue[1],
                        ]);
                    }
                    if (response.data.data.filters.price.max) {
                        setRangeValue([
                            rangeValue[0],
                            response.data.data.filters.price.max,
                        ]);
                    }

                    setMarkateplaceBanner({
                        isLoading: false,
                        data: {
                            ...response.data.data,
                            filters: {
                                ...response.data.data.filters,
                                brand,
                                boutique,
                                category,
                                colorname,
                            },
                        },
                    });
                } else {
                    setMarkateplaceBanner({
                        isLoading: false,
                        data: response.data.data,
                    });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setMarkateplaceBanner({
                    isLoading: false,
                    data: [],
                });
            }
        };
        // fetch brand , boutique , category data
        const fetchBrand = async () => {
            try {
                const response = await API.get(`api/admin/brandname?search=`);
                setBrandData(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        const fetchBoutique = async () => {
            try {
                const response = await API.get(
                    `api/admin/boutiquename?search=`
                );
                setBoutiqueData(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
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

        fetchCategory();
        fetchBrand();
        fetchBoutique();
        fetchData();
    }, []);

    // handle change for banner type , name , image , is_banner, is_banner2 , is_thumbnail
    const handleChange = (e, item) => {
        const { name, value, checked } = e.target;

        if (
            name === "is_banner" ||
            name === "is_thumbnail" ||
            name === "is_banner2"
        ) {
            const data = {
                ...markateplaceBanner.data,
                [name]: checked === true ? 1 : 0,
            };
            setMarkateplaceBanner({
                ...markateplaceBanner,
                data: data,
            });
            return;
        }

        if (formData.type !== "product") {
            if (name === "type") {
                if (value === "product") {
                    const data = {
                        ...markateplaceBanner.data,
                        [name]: value,
                        filters: {
                            ...markateplaceBanner.data.filters,
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
                        },
                    };
                    setMarkateplaceBanner({
                        ...markateplaceBanner,
                        data: data,
                    });
                    return;
                }
            }
        }

        setMarkateplaceBanner({
            ...markateplaceBanner,
            data: {
                ...markateplaceBanner.data,
                [name]: value,
            },
        });
    };

    // handle change for product filters
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setMarkateplaceBanner({
            ...markateplaceBanner,
            data: {
                ...markateplaceBanner.data,
                filters: {
                    ...markateplaceBanner.data.filters,
                    [name]: value,
                },
            },
        });
        if (name === "price") {
            setRangeValue(value);
            setMarkateplaceBanner({
                ...markateplaceBanner,
                data: {
                    ...markateplaceBanner.data,
                    filters: {
                        ...markateplaceBanner.data.filters,
                        price: {
                            min: value[0],
                            max: value[1],
                        },
                    },
                },
            });
        } else if (name === "min") {
            // set range value on state and filters
            setRangeValue([value, rangeValue[1]]);
            setMarkateplaceBanner({
                ...markateplaceBanner,
                data: {
                    ...markateplaceBanner.data,
                    filters: {
                        ...markateplaceBanner.data.filters,
                        price: {
                            ...markateplaceBanner.data.filters.price,
                            min: value,
                        },
                    },
                },
            });
        } else if (name === "max") {
            // set range value on state and filters
            setRangeValue([rangeValue[0], value]);
            setMarkateplaceBanner({
                ...markateplaceBanner,
                data: {
                    ...markateplaceBanner.data,
                    filters: {
                        ...markateplaceBanner.data.filters,
                        price: {
                            ...markateplaceBanner.data.filters.price,
                            max: value,
                        },
                    },
                },
            });
        }
    };

    // handle change for brand and boutique name
    const handleName = (e, item) => {
        const data = {
            ...markateplaceBanner.data,
            name: item.name,
            brand: markateplaceBanner?.data?.type === "brand" ? item?.id : null,
            boutique:
                markateplaceBanner?.data?.type === "boutique" ? item?.id : null,
        };
        setMarkateplaceBanner({
            ...markateplaceBanner,
            data: data,
        });
    };

    // handle upload image
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
                    setMarkateplaceBanner({
                        ...markateplaceBanner,
                        data: {
                            ...markateplaceBanner.data,
                            image: downloadURL,
                        },
                    });
                });
            }
        );
    };

    // handle update data
    const handleUpdate = async () => {
        let bodyData;
        setIsEditLoading(true);
        if (
            markateplaceBanner?.data?.type !== formData.type &&
            markateplaceBanner?.data?.type !== "product"
        ) {
            if (markateplaceBanner?.data?.name === formData?.name) {
                toast.error(
                    `Please Select ${markateplaceBanner?.data?.type} Name`
                );
                setIsEditLoading(false);
                return;
            }
        }

        if (markateplaceBanner?.data?.type === "product") {
            // Checking if all filters are empty or not
            if (
                markateplaceBanner?.data.filters?.gender?.length === 0 &&
                markateplaceBanner?.data?.filters?.category?.length === 0 &&
                markateplaceBanner?.data?.filters?.brand?.length === 0 &&
                markateplaceBanner?.data?.filters?.boutique?.length === 0 &&
                markateplaceBanner?.data?.filters?.price?.min === "" &&
                markateplaceBanner?.data?.filters?.price?.max === ""
            ) {
                toast.error("Please Select Minimum One Filters Options");
                setIsEditLoading(false);
                return;
            }
            // add product filter data
            bodyData = {
                ...markateplaceBanner?.data,
                brand: null,
                boutique: null,
                filters: {
                    ...markateplaceBanner?.data.filters,
                    brand:
                        markateplaceBanner?.data.filters?.brand?.length > 0
                            ? markateplaceBanner?.data.filters?.brand?.map(
                                  (item) => {
                                      return {
                                          id: item?.id,
                                          name: item?.name,
                                      };
                                  }
                              )
                            : [],
                    boutique:
                        markateplaceBanner?.data?.filters?.boutique?.length > 0
                            ? markateplaceBanner?.data?.filters?.boutique?.map(
                                  (item) => {
                                      return {
                                          id: item?.id,
                                          name: item?.name,
                                      };
                                  }
                              )
                            : [],
                    category:
                        markateplaceBanner?.data?.filters?.category?.length > 0
                            ? markateplaceBanner?.data?.filters?.category?.map(
                                  (item) => {
                                      return {
                                          id: item?.value,
                                          name: item?.label,
                                      };
                                  }
                              )
                            : [],
                    gender:
                        markateplaceBanner?.data?.filters.gender.length > 0
                            ? markateplaceBanner?.data?.filters.gender
                            : [],
                    size:
                        markateplaceBanner?.data?.filters.size.length > 0
                            ? markateplaceBanner?.data?.filters?.size
                            : [],
                    colorname:
                        markateplaceBanner?.data?.filters.colorname.length > 0
                            ? markateplaceBanner?.data?.filters?.colorname?.map(
                                  (item) => item?.name
                              )
                            : [],
                    price: {
                        min:
                            markateplaceBanner?.data?.filters?.price?.min === ""
                                ? ""
                                : markateplaceBanner?.data?.filters?.price?.min,
                        max:
                            markateplaceBanner?.data?.filters?.price?.max === ""
                                ? ""
                                : markateplaceBanner?.data?.filters?.price?.max,
                    },
                },
            };
        } else {
            // add brand or boutique data
            bodyData = markateplaceBanner?.data;
        }

        try {
            //  delete markateplaceBanner?.data?.name , markateplaceBanner?.data?.id , markateplaceBanner?.data?.created_at , markateplaceBanner?.data?.updated_at
            console.log(bodyData);
            delete bodyData?.name;
            delete bodyData?.id;
            delete bodyData?.created_at;
            delete bodyData?.updated_at;
            delete bodyData?.seller;

            const response = await API.put(`api/admin/media/${id}`, bodyData);
            if (response.status === 200) {
                toast.success("Updated Successfully");
                setIsEditLoading(false);
                navigate("/banner/marketplace");
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.error("Error fetching data:", error.response.data.message);
            setIsEditLoading(false);
        }
    };

    // set default data for brand and boutique
    useMemo(() => {
        if (markateplaceBanner?.data?.type === "brand") {
            const defaultOption = brandData.find(
                (item) => item.name === markateplaceBanner?.data?.name
            );
            setDefaultData(defaultOption);
        } else {
            const defaultOption = boutiqueData.find(
                (item) => item.name === markateplaceBanner?.data?.name
            );
            setDefaultData(defaultOption);
        }
    }, [
        markateplaceBanner?.data?.type,
        markateplaceBanner?.data?.name,
        boutiqueData,
        brandData,
    ]);

    console.log(markateplaceBanner?.data);
    console.log(rangeValue);

    return (
        <div className="markateplaceBannerWrapper">
            <PageHeader
                headerTitle={"Edit Markateplace Banner / Thumbnail"}
                isBtn={true}
                type="back"
                headerBtnName={`${isEditLoading ? "Loading..." : "Update"}`}
                handleClick={handleUpdate}
                handleBack={() => navigate("/banner/marketplace")}
            />
            <ProductTopHead title={"Markateplace Brand / Boutiques Info "} />
            <div>
                {markateplaceBanner.isLoading ? (
                    <div className="marketplaceBannerInputContainer mb-5">
                        <div className="marketplaceBannerInput">
                            <InputLoader />
                        </div>
                    </div>
                ) : markateplaceBanner?.data?.type === "brand" ||
                  markateplaceBanner?.data?.type === "boutique" ? (
                    <div className="marketplaceBannerInputContainer mb-5">
                        <div className="marketplaceBannerInput">
                            <>
                                <label>Brand / Boutique Name</label>
                                <input
                                    name="name"
                                    disabled
                                    value={markateplaceBanner?.data?.name}
                                />
                            </>
                        </div>
                    </div>
                ) : null}
                <div className="marketplaceBannerInputContainer">
                    <div className="marketplaceBannerInput">
                        {markateplaceBanner.isLoading ? (
                            <InputLoader />
                        ) : (
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
                                    value={markateplaceBanner?.data?.type}
                                >
                                    <MenuItem value="brand">Brand</MenuItem>
                                    <MenuItem value="boutique">
                                        Boutique
                                    </MenuItem>
                                    <MenuItem value="product">Product</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    </div>

                    {(markateplaceBanner?.data?.type === "brand" ||
                        markateplaceBanner?.data?.type === "boutique") && (
                        <div className="">
                            {markateplaceBanner.isLoading ? (
                                <InputLoader />
                            ) : (
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={
                                        markateplaceBanner?.data?.type ===
                                        "brand"
                                            ? brandData
                                            : boutiqueData
                                    }
                                    name="name"
                                    sx={{ width: 300 }}
                                    onChange={handleName}
                                    value={defaultData}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => (
                                        <TextField
                                            value={params}
                                            {...params}
                                            label="Change Brand / Boutique Name"
                                        />
                                    )}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
            {markateplaceBanner?.data?.type === "product" && (
                <>
                    <ProductTopHead
                        title={
                            "Markateplace Banner / Thumbnail Product Filters Options"
                        }
                    />
                    <div className="productFilter">
                        <div className="marketplaceBannerInput">
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
                                    value={
                                        markateplaceBanner?.data?.filters
                                            ?.gender
                                    }
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
                                                    markateplaceBanner?.data?.filters?.gender?.indexOf(
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
                                className="marketplaceBannerAutoComplete1"
                                multiple
                                id="demo-simple-select"
                                disableCloseOnSelect
                                options={
                                    markateplaceBanner?.data.filters?.gender
                                        .length === 2
                                        ? categoryData?.category
                                        : markateplaceBanner?.data?.filters?.gender.includes(
                                              "Women"
                                          )
                                        ? categoryData?.categoryTypeWomen
                                        : categoryData?.categoryTypeMen
                                }
                                getOptionLabel={(option) => option?.label}
                                value={
                                    markateplaceBanner?.data?.filters?.category
                                }
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
                    </div>
                    <div className="productFilter my-3">
                        <div className="">
                            <Autocomplete
                                className="marketplaceBannerAutoComplete1"
                                multiple
                                id="demo-simple-select"
                                disableCloseOnSelect
                                options={brandData}
                                getOptionLabel={(option) => option?.name}
                                value={markateplaceBanner?.data?.filters?.brand}
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
                                className="marketplaceBannerAutoComplete1"
                                multiple
                                id="demo-simple-select"
                                disableCloseOnSelect
                                options={boutiqueData}
                                getOptionLabel={(option) => option?.name}
                                value={
                                    markateplaceBanner?.data?.filters?.boutique
                                }
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
                    </div>
                    <div className="productFilter my-3">
                        <div className="">
                            <Autocomplete
                                className="marketplaceBannerAutoComplete1"
                                multiple
                                id="demo-simple-select"
                                disableCloseOnSelect
                                options={colorsArray}
                                getOptionLabel={(option) => option?.name}
                                value={
                                    markateplaceBanner?.data?.filters?.colorname
                                }
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
                        <div className="">
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
                                    value={
                                        markateplaceBanner?.data?.filters?.size
                                    }
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
                                                    markateplaceBanner?.data?.filters?.size?.indexOf(
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
                    <div className="productFilter">
                        <div className="marketplaceBannerInputContainer ms-3">
                            <div className="marketplaceBannerInput slideExtraMargin">
                                <h6>Price Range</h6>
                                <Box sx={{ width: 300 }}>
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
                            <div className="marketplaceBannerInput">
                                <TextField
                                    id="outlined-basic"
                                    label="Price Min"
                                    variant="outlined"
                                    name="min"
                                    onChange={handleFilterChange}
                                    value={
                                        markateplaceBanner?.data?.filters?.price
                                            ?.min
                                    }
                                />
                            </div>
                            <div className="marketplaceBannerInput">
                                <TextField
                                    id="outlined-basic"
                                    label="Price Max"
                                    variant="outlined"
                                    name="max"
                                    value={
                                        markateplaceBanner?.data?.filters?.price
                                            ?.max
                                    }
                                    onChange={handleFilterChange}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
            <ProductTopHead title={"Markateplace Banner / Thumbnail"} />
            <div>
                <div className="marketplaceBannerMediaOption">
                    <div className="marketplaceBannerMediaUoload">
                        <h6>Image Upload</h6>
                        <div className="marketplaceBannerMediaInputs">
                            <label
                                onClick={() => imgref.current.click()}
                                className="marketplaceBannerLogoUploadBtn"
                            >
                                {" "}
                                {isUploading
                                    ? percentUpload
                                    : markateplaceBanner.data?.image
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
                    <div className="marketplaceBannerMediaOther">
                        <h6>Make This Image as Banner One</h6>
                        {markateplaceBanner.isLoading ? (
                            <span>Loading</span>
                        ) : (
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            onChange={handleChange}
                                            name="is_banner"
                                            defaultChecked={
                                                markateplaceBanner?.data
                                                    ?.is_banner === 1
                                                    ? true
                                                    : false
                                            }
                                        />
                                    }
                                />
                            </FormGroup>
                        )}
                    </div>
                    <div className="marketplaceBannerMediaOther">
                        <h6>Make This Image as Banner Two</h6>
                        {markateplaceBanner.isLoading ? (
                            <span>Loading</span>
                        ) : (
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            onChange={handleChange}
                                            name="is_banner2"
                                            defaultChecked={
                                                markateplaceBanner?.data
                                                    ?.is_banner2 === 1
                                                    ? true
                                                    : false
                                            }
                                        />
                                    }
                                />
                            </FormGroup>
                        )}
                    </div>
                    <div className="marketplaceBannerMediaOther">
                        <h6>Make This Image as Thumbnail</h6>
                        {markateplaceBanner.isLoading ? (
                            <span>Loading</span>
                        ) : (
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            onChange={handleChange}
                                            name="is_thumbnail"
                                            defaultChecked={
                                                markateplaceBanner?.data
                                                    ?.is_thumbnail === 1
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

                <div className="marketplaceBannerMedia">
                    {(markateplaceBanner?.data.is_banner === 1 ||
                        markateplaceBanner?.data.is_banner2 === 1) && (
                        <div className="marketplaceBannerPrev">
                            <h6>Banner</h6>
                            <img src={markateplaceBanner?.data?.image} alt="" />
                        </div>
                    )}
                    {markateplaceBanner?.data.is_thumbnail === 1 && (
                        <div className="marketplaceBannerThumbnailPrev">
                            <h6>Thumbnail</h6>
                            <img src={markateplaceBanner?.data?.image} alt="" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditMarkateplaceBanner;
