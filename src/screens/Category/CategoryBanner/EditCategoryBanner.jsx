import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-hot-toast";
import InfoIcon from "@mui/icons-material/Info";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import "./CategoryBanner.css";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { colorsArray } from "../../../constants";
import API from "../../../services/common";
import { storage } from "../../../firebase/firebase";
import {
    Autocomplete,
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    Slider,
    Switch,
    TextField,
    Tooltip,
} from "@mui/material";
import ProductTopHead from "../../../components/ProductTopHead/ProductTopHead";
import {
    InputWithOutLebelLoader,
    OneLineTextLoader,
} from "../../../ui/SkeltonLoader/SkeltonLoader";

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
const EditCategoryBanner = () => {
    const { id } = useParams();
    const imgref = useRef(null);
    const navigate = useNavigate();
    const [isEditLoading, setIsEditLoading] = useState(false);
    const [percentUpload, setPercentUpload] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [rangeValue, setRangeValue] = useState([10, 1000]);
    const [formData, setFormData] = useState({});
    const [brandData, setBrandData] = useState([]);
    const [defaultData, setDefaultData] = useState(null);
    const [boutiqueData, setBoutiqueData] = useState([]);
    const [categoryBanner, setCategoryBanner] = useState({
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
    const setCategoryDataOnState = async (data, isSingle) => {
        const CategoryResponse = await fetchCategoryData();
        if (isSingle) {
            let datas = CategoryResponse.find((brand) => brand.id === data);
            return {
                label: datas?.category,
                value: datas?.id,
                type: datas?.type,
            };
        } else {
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
        }
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
                const response = await API.get(
                    `api/admin/category/media/${id}`
                );
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
                    const singleCategory = response.data.data.category
                        ? await setCategoryDataOnState(
                              response.data.data.category,
                              true
                          )
                        : null;

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
                    console.log(singleCategory);
                    setCategoryBanner({
                        isLoading: false,
                        data: {
                            ...response.data.data,
                            category: singleCategory,
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
                    const singleCategory = response.data.data.category
                        ? await setCategoryDataOnState(
                              response.data.data.category,
                              true
                          )
                        : null;
                    setCategoryBanner({
                        isLoading: false,
                        data: {
                            ...response.data.data,
                            category: singleCategory,
                        },
                    });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setCategoryBanner({
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

    const handleCategory = (e, item) => {
        console.log(item);
        setFormData({
            ...formData,
            category: item?.value,
        });
    };
    // handle change for banner type , name , image , is_banner, is_banner2 , is_thumbnail
    const handleChange = (e, item) => {
        const { name, value, checked } = e.target;

        if (
            name === "is_banner" ||
            name === "is_thumbnail" ||
            name === "is_banner2"
        ) {
            const data = {
                ...categoryBanner.data,
                [name]: checked === true ? 1 : 0,
            };
            setCategoryBanner({
                ...categoryBanner,
                data: data,
            });
            return;
        }

        if (formData.type !== "product") {
            if (name === "type") {
                if (value === "product") {
                    const data = {
                        ...categoryBanner.data,
                        [name]: value,
                        filters: {
                            ...categoryBanner.data.filters,
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
                    setCategoryBanner({
                        ...categoryBanner,
                        data: data,
                    });
                    return;
                }
            }
        }

        setCategoryBanner({
            ...categoryBanner,
            data: {
                ...categoryBanner.data,
                [name]: value,
            },
        });
    };

    // handle change for product filters
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setCategoryBanner({
            ...categoryBanner,
            data: {
                ...categoryBanner.data,
                filters: {
                    ...categoryBanner.data.filters,
                    [name]: value,
                },
            },
        });
        if (name === "price") {
            setRangeValue(value);
            setCategoryBanner({
                ...categoryBanner,
                data: {
                    ...categoryBanner.data,
                    filters: {
                        ...categoryBanner.data.filters,
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
            setCategoryBanner({
                ...categoryBanner,
                data: {
                    ...categoryBanner.data,
                    filters: {
                        ...categoryBanner.data.filters,
                        price: {
                            ...categoryBanner.data.filters.price,
                            min: value,
                        },
                    },
                },
            });
        } else if (name === "max") {
            // set range value on state and filters
            setRangeValue([rangeValue[0], value]);
            setCategoryBanner({
                ...categoryBanner,
                data: {
                    ...categoryBanner.data,
                    filters: {
                        ...categoryBanner.data.filters,
                        price: {
                            ...categoryBanner.data.filters.price,
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
            ...categoryBanner.data,
            name: item.name,
            brand: categoryBanner?.data?.type === "brand" ? item?.id : null,
            boutique:
                categoryBanner?.data?.type === "boutique" ? item?.id : null,
        };
        setCategoryBanner({
            ...categoryBanner,
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
                    setCategoryBanner({
                        ...categoryBanner,
                        data: {
                            ...categoryBanner.data,
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
            categoryBanner?.data?.type !== formData.type &&
            categoryBanner?.data?.type !== "product"
        ) {
            if (categoryBanner?.data?.name === formData?.name) {
                toast.error(`Please Select ${categoryBanner?.data?.type} Name`);
                setIsEditLoading(false);
                return;
            }
        }

        if (categoryBanner?.data?.type === "product") {
            // Checking if all filters are empty or not
            if (
                categoryBanner?.data.filters?.gender?.length === 0 &&
                categoryBanner?.data?.filters?.category?.length === 0 &&
                categoryBanner?.data?.filters?.brand?.length === 0 &&
                categoryBanner?.data?.filters?.boutique?.length === 0 &&
                categoryBanner?.data?.filters?.price?.min === "" &&
                categoryBanner?.data?.filters?.price?.max === ""
            ) {
                toast.error("Please Select Minimum One Filters Options");
                setIsEditLoading(false);
                return;
            }
            // add product filter data
            bodyData = {
                ...categoryBanner?.data,

                category: categoryBanner?.data.value,
                brand: null,
                boutique: null,
                filters: {
                    ...categoryBanner?.data.filters,
                    brand:
                        categoryBanner?.data.filters?.brand?.length > 0
                            ? categoryBanner?.data.filters?.brand?.map(
                                  (item) => {
                                      return {
                                          id: item?.id,
                                          name: item?.name,
                                      };
                                  }
                              )
                            : [],
                    boutique:
                        categoryBanner?.data?.filters?.boutique?.length > 0
                            ? categoryBanner?.data?.filters?.boutique?.map(
                                  (item) => {
                                      return {
                                          id: item?.id,
                                          name: item?.name,
                                      };
                                  }
                              )
                            : [],
                    category:
                        categoryBanner?.data?.filters?.category?.length > 0
                            ? categoryBanner?.data?.filters?.category?.map(
                                  (item) => {
                                      return {
                                          id: item?.value,
                                          name: item?.label,
                                      };
                                  }
                              )
                            : [],
                    gender:
                        categoryBanner?.data?.filters.gender.length > 0
                            ? categoryBanner?.data?.filters.gender
                            : [],
                    size:
                        categoryBanner?.data?.filters.size.length > 0
                            ? categoryBanner?.data?.filters?.size
                            : [],
                    colorname:
                        categoryBanner?.data?.filters.colorname.length > 0
                            ? categoryBanner?.data?.filters?.colorname?.map(
                                  (item) => item?.name
                              )
                            : [],
                    price: {
                        min:
                            categoryBanner?.data?.filters?.price?.min === ""
                                ? ""
                                : categoryBanner?.data?.filters?.price?.min,
                        max:
                            categoryBanner?.data?.filters?.price?.max === ""
                                ? ""
                                : categoryBanner?.data?.filters?.price?.max,
                    },
                },
            };
        } else {
            // add brand or boutique data
            bodyData = {
                ...categoryBanner?.data,
                category: categoryBanner?.data?.value,
            };
        }

        try {
            //  delete categoryBanner?.data?.name , markateplaceBanner?.data?.id , markateplaceBanner?.data?.created_at , markateplaceBanner?.data?.updated_at
            console.log(bodyData);
            delete bodyData?.name;
            delete bodyData?.id;
            delete bodyData?.created_at;
            delete bodyData?.updated_at;
            delete bodyData?.seller;

            const response = await API.put(
                `/api/admin/category/media/${id}`,
                bodyData
            );
            if (response.status === 200) {
                toast.success("Updated Successfully");
                setIsEditLoading(false);
                navigate("/category/thumbs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.error("Error fetching data:", error.response.data.message);
            setIsEditLoading(false);
        }
    };

    // set default data for brand and boutique
    useMemo(() => {
        if (categoryBanner?.data?.type === "brand") {
            const defaultOption = brandData.find(
                (item) => item.name === categoryBanner?.data?.name
            );
            setDefaultData(defaultOption);
        } else {
            const defaultOption = boutiqueData.find(
                (item) => item.name === categoryBanner?.data?.name
            );
            setDefaultData(defaultOption);
        }
    }, [
        categoryBanner?.data?.type,
        categoryBanner?.data?.name,
        boutiqueData,
        brandData,
    ]);

    console.log(categoryBanner?.data);
    return (
        <div className="categoryBannerWrapper">
            <PageHeader
                headerBtnName={`${isEditLoading ? "Loading..." : "Save"}`}
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
                        {categoryBanner?.isLoading ? (
                            <InputWithOutLebelLoader />
                        ) : (
                            <Autocomplete
                                id="combo-box-demo"
                                options={categoryData?.category}
                                name="category"
                                sx={{ width: 300 }}
                                onChange={handleCategory}
                                value={categoryBanner?.data?.category}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                    <TextField
                                        value={params}
                                        {...params}
                                        label={`Select Category`}
                                    />
                                )}
                            />
                        )}
                    </div>
                    <div className="categoryBannerInput">
                        {categoryBanner?.isLoading ? (
                            <InputWithOutLebelLoader />
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
                                    value={categoryBanner?.data?.type}
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
                    {(categoryBanner?.data?.type === "brand" ||
                        categoryBanner?.data?.type === "boutique") && (
                        <div className="categoryBannerAutoInput">
                            <Autocomplete
                                id="combo-box-demo"
                                options={
                                    categoryBanner?.data?.type === "brand"
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
                                        label={`Select ${categoryBanner?.data?.type} name`}
                                    />
                                )}
                            />
                        </div>
                    )}
                </div>
            </div>
            {categoryBanner?.data?.type === "product" && (
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
                                    value={
                                        categoryBanner?.data?.filters?.gender
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
                                                    categoryBanner?.data?.filters?.gender?.indexOf(
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
                                    categoryBanner?.data?.filters?.gender
                                        .length === 2
                                        ? categoryData?.category
                                        : categoryBanner?.data?.filters?.gender.includes(
                                              "Women"
                                          )
                                        ? categoryData?.categoryTypeWomen
                                        : categoryData?.categoryTypeMen
                                }
                                getOptionLabel={(option) => option?.label}
                                value={categoryBanner?.data?.filters?.category}
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
                                value={categoryBanner?.data?.filters?.colorname}
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
                                value={categoryBanner?.data?.filters?.brand}
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
                                value={categoryBanner?.data?.filters?.boutique}
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
                                    value={categoryBanner?.data?.filters?.size}
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
                                                    categoryBanner?.data?.filters?.size?.indexOf(
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
                                    value={
                                        categoryBanner?.data?.filters?.price
                                            ?.min
                                    }
                                />
                            </div>
                            <div className="categoryBannerInput">
                                <TextField
                                    id="outlined-basic"
                                    label="Price Max"
                                    variant="outlined"
                                    name="max"
                                    value={
                                        categoryBanner?.data?.filters?.price
                                            ?.max
                                    }
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
                                    : categoryBanner?.data?.image
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
                        {categoryBanner.isLoading ? (
                            <OneLineTextLoader />
                        ) : (
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            onChange={handleChange}
                                            name="is_banner"
                                            disabled={
                                                !categoryBanner?.data?.image
                                            }
                                            defaultChecked={
                                                categoryBanner?.data
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
                    <div className="categoryBannerMediaOther">
                        <h6>
                            Make This Image as Banner Two{" "}
                            <Tooltip
                                className="flex"
                                title={
                                    categoryBanner?.data?.image
                                        ? "Please toggle the switch to set this image as the banner."
                                        : "First Upload Image"
                                }
                                placement="right"
                            >
                                {" "}
                                <InfoIcon />
                            </Tooltip>
                        </h6>
                        {categoryBanner.isLoading ? (
                            <OneLineTextLoader />
                        ) : (
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            onChange={handleChange}
                                            name="is_banner2"
                                            disabled={
                                                !categoryBanner?.data.image
                                            }
                                            defaultChecked={
                                                categoryBanner?.data
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
                    <div className="categoryBannerMediaOther">
                        <h6>
                            Make This Image as Thumbnail{" "}
                            <Tooltip
                                className="flex"
                                title={
                                    categoryBanner?.data?.image
                                        ? "Please toggle the switch to set this image as the thumbnail."
                                        : "First Upload Image"
                                }
                                placement="bottom"
                            >
                                {" "}
                                <InfoIcon />
                            </Tooltip>
                        </h6>
                        {categoryBanner.isLoading ? (
                            <OneLineTextLoader />
                        ) : (
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            onChange={handleChange}
                                            disabled={
                                                !categoryBanner?.data.image
                                            }
                                            name="is_thumbnail"
                                            defaultChecked={
                                                categoryBanner?.data
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

                <div className="categoryBannerMedia">
                    {(categoryBanner?.data?.is_banner === 1 ||
                        categoryBanner?.data?.is_banner2 === 1) && (
                        <div className="categoryBannerPrev">
                            <h6>Banner</h6>
                            <img src={categoryBanner?.data?.image} alt="" />
                        </div>
                    )}
                    {categoryBanner?.data?.is_thumbnail === 1 && (
                        <div className="categoryBannerThumbnailPrev">
                            <h6>Thumbnail</h6>
                            <img src={categoryBanner?.data?.image} alt="" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditCategoryBanner;
