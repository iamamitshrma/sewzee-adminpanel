import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { Link } from "react-router-dom";
import API from "../services/common";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { sewzeeImages } from "../assets";

export const UserTableHeader = [
    {
        name: "userId",
        label: "User Id",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "userName",
        label: "User Name",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "email",
        label: "Email",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "phone",
        label: "Phone",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "gender",
        label: "Gender",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "accountCreated",
        label: "Account Created",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value) => {
                return (
                    //  add time also with date
                    <span>
                        {new Date(value).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                        })}
                    </span>
                );
            },
        },
    },
    {
        name: "status",
        label: "Status",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => {
                return (
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    defaultChecked={
                                        value === "Active" ? true : false
                                    }
                                />
                            }
                            label={value}
                        />
                    </FormGroup>
                );
            },
        },
    },
    {
        name: "action",
        label: "Action",
        options: {
            customBodyRender: (value) => {
                return (
                    <div className="actionWrapper">
                        <Link to={`/users`} className="actionBtn">
                            Edit
                        </Link>
                        {/* kk<p className="actionBtn">Edit</p> */}
                        {/* <button  className="actionBtn">Edit</button> */}
                    </div>
                );
            },
            filter: false,
            sort: false,
        },
    },
    {
        name: "action",
        label: "Details",
        options: {
            customBodyRender: (value) => {
                console.log(value);
                return (
                    <div className="actionWrapper">
                        <Link to={`/users/details/${value}`}>
                            <VisibilityIcon />
                        </Link>
                        {/* kk<p className="actionBtn">Edit</p> */}
                        {/* <button  className="actionBtn">Edit</button> */}
                    </div>
                );
            },
            filter: false,
            sort: false,
        },
    },
];
export const MarketplaceTableHeader = [
    {
        name: "id",
        label: "Customer Id",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "name",
        label: "Customer Name",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "email",
        label: "Email",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "number",
        label: "Phone",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "gender",
        label: "Gender",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "created_at",
        label: "Account Created",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value) => {
                return (
                    //  add time also with date
                    <span>
                        {new Date(value).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                        })}
                    </span>
                );
            },
        },
    },
    {
        name: "status",
        label: "Status",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => {
                return (
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    defaultChecked={
                                        value === "Active" ? true : false
                                    }
                                />
                            }
                            label={value}
                        />
                    </FormGroup>
                );
            },
        },
    },
    {
        name: "action",
        label: "Action",
        options: {
            customBodyRender: (value) => {
                return (
                    <div className="actionWrapper">
                        <Link to={`/users`} className="actionBtn">
                            Edit
                        </Link>
                        {/* kk<p className="actionBtn">Edit</p> */}
                        {/* <button  className="actionBtn">Edit</button> */}
                    </div>
                );
            },
            filter: false,
            sort: false,
        },
    },
];

export const TailorCustomerTableHeader = [
    {
        name: "id",
        label: "Customer Id",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "name",
        label: "Customer Name",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "email",
        label: "Email",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "number",
        label: "Phone",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "gender",
        label: "Gender",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "created_at",
        label: "Account Created",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value) => {
                return (
                    //  add time also with date
                    <span>
                        {new Date(value).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                        })}
                    </span>
                );
            },
        },
    },
    {
        name: "status",
        label: "Status",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => {
                return (
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    defaultChecked={
                                        value === "Active" ? true : false
                                    }
                                />
                            }
                            label={value}
                        />
                    </FormGroup>
                );
            },
        },
    },
    {
        name: "action",
        label: "Action",
        options: {
            customBodyRender: (value) => {
                return (
                    <div className="actionWrapper">
                        <Link to={`/users`} className="actionBtn">
                            Edit
                        </Link>
                        {/* kk<p className="actionBtn">Edit</p> */}
                        {/* <button  className="actionBtn">Edit</button> */}
                    </div>
                );
            },
            filter: false,
            sort: false,
        },
    },
];
export const BoutiqueTableHeader = [
    {
        name: "id",
        label: "Boutique Id",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "name",
        label: "Boutique Name",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "email",
        label: "Email",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "number",
        label: "Phone",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "city",
        label: "City",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "created_at",
        label: "Account Created",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value) => {
                return (
                    //  add time also with date
                    <span>
                        {new Date(value).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                        })}
                    </span>
                );
            },
        },
    },
    {
        name: "status",
        label: "Status",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => {
                return (
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    defaultChecked={
                                        value === "Active" ? true : false
                                    }
                                />
                            }
                            label={value}
                        />
                    </FormGroup>
                );
            },
        },
    },
    {
        name: "action",
        label: "Action",
        options: {
            customBodyRender: (value) => {
                return (
                    <div className="actionWrapper">
                        <Link to={`/users`} className="actionBtn">
                            Edit
                        </Link>
                        {/* kk<p className="actionBtn">Edit</p> */}
                        {/* <button  className="actionBtn">Edit</button> */}
                    </div>
                );
            },
            filter: false,
            sort: false,
        },
    },
    {
        name: "id",
        label: "Details",
        options: {
            customBodyRender: (value) => {
                console.log(value);
                return (
                    <div className="actionWrapper">
                        <Link to={`/boutiques/details/${value}`}>
                            <VisibilityIcon />
                        </Link>
                        {/* kk<p className="actionBtn">Edit</p> */}
                        {/* <button  className="actionBtn">Edit</button> */}
                    </div>
                );
            },
            filter: false,
            sort: false,
        },
    },
];
export const BrandTableHeader = [
    {
        name: "id",
        label: "User Id",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "name",
        label: "Brand Name",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "email",
        label: "Email",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "number",
        label: "Phone",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "city",
        label: "City",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "created_at",
        label: "Account Created",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value) => {
                return (
                    //  add time also with date
                    <span>
                        {new Date(value).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                        })}
                    </span>
                );
            },
        },
    },
    {
        name: "status",
        label: "Status",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => {
                return (
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    defaultChecked={
                                        value === "Active" ? true : false
                                    }
                                />
                            }
                            label={value}
                        />
                    </FormGroup>
                );
            },
        },
    },
    {
        name: "action",
        label: "Action",
        options: {
            customBodyRender: (value) => {
                return (
                    <div className="actionWrapper">
                        <Link to={`/users`} className="actionBtn">
                            Edit
                        </Link>
                        {/* kk<p className="actionBtn">Edit</p> */}
                        {/* <button  className="actionBtn">Edit</button> */}
                    </div>
                );
            },
            filter: false,
            sort: false,
        },
    },
    {
        name: "id",
        label: "Details",
        options: {
            customBodyRender: (value) => {
                console.log(value);
                return (
                    <div className="actionWrapper">
                        <Link to={`/brands/details/${value}`}>
                            <VisibilityIcon />
                        </Link>
                        {/* kk<p className="actionBtn">Edit</p> */}
                        {/* <button  className="actionBtn">Edit</button> */}
                    </div>
                );
            },
            filter: false,
            sort: false,
        },
    },
];
export const TailorTableHeader = [
    {
        name: "id",
        label: "Tailor Id",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "name",
        label: "User Name",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "business_name",
        label: "Shop Name",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "number",
        label: "Phone",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "city",
        label: "City",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "perference",
        label: "Stich Prefences",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "created_at",
        label: "Account Created",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value) => {
                console.log(value);
                return (
                    //  add time also with date
                    <span>
                        {new Date(value).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                        })}
                    </span>
                );
            },
        },
    },
    {
        name: "status",
        label: "Status",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => {
                console.log(value);
                return (
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    defaultChecked={
                                        value === "Active" ? true : false
                                    }
                                />
                            }
                            label={value}
                        />
                    </FormGroup>
                );
            },
        },
    },
    {
        name: "action",
        label: "Action",
        options: {
            customBodyRender: (value) => {
                console.log(value);
                return (
                    <div className="actionWrapper">
                        <Link to={`/users`} className="actionBtn">
                            Edit
                        </Link>
                        {/* kk<p className="actionBtn">Edit</p> */}
                        {/* <button  className="actionBtn">Edit</button> */}
                    </div>
                );
            },
            filter: false,
            sort: false,
        },
    },
    {
        name: "id",
        label: "Details",
        options: {
            customBodyRender: (value) => {
                console.log(value);
                return (
                    <div className="actionWrapper">
                        <Link to={`/tailors/details/${value}`}>
                            <VisibilityIcon />
                        </Link>
                        {/* kk<p className="actionBtn">Edit</p> */}
                        {/* <button  className="actionBtn">Edit</button> */}
                    </div>
                );
            },
            filter: false,
            sort: false,
        },
    },
];
export const DriverTableHeader = [
    {
        name: "id",
        label: "Driver Id",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "name",
        label: "Driver Name",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "number",
        label: "Phone",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "city",
        label: "City",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "perference",
        label: "Stich Prefences",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "created_at",
        label: "Account Created",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value) => {
                console.log(value);
                return (
                    //  add time also with date
                    <span>
                        {new Date(value).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                        })}
                    </span>
                );
            },
        },
    },
    {
        name: "status",
        label: "Status",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => {
                console.log(value);
                return (
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    defaultChecked={
                                        value === "Active" ? true : false
                                    }
                                />
                            }
                            label={value}
                        />
                    </FormGroup>
                );
            },
        },
    },
    {
        name: "action",
        label: "Action",
        options: {
            customBodyRender: (value) => {
                console.log(value);
                return (
                    <div className="actionWrapper">
                        <Link to={`/users`} className="actionBtn">
                            Edit
                        </Link>
                        {/* kk<p className="actionBtn">Edit</p> */}
                        {/* <button  className="actionBtn">Edit</button> */}
                    </div>
                );
            },
            filter: false,
            sort: false,
        },
    },
    {
        name: "id",
        label: "Details",
        options: {
            customBodyRender: (value) => {
                console.log(value);
                return (
                    <div className="actionWrapper">
                        <Link to={`/drivers/details/${value}`}>
                            <VisibilityIcon />
                        </Link>
                        {/* kk<p className="actionBtn">Edit</p> */}
                        {/* <button  className="actionBtn">Edit</button> */}
                    </div>
                );
            },
            filter: false,
            sort: false,
        },
    },
];
export const markateplaceBannerTableHeader = [
    {
        name: "image",
        label: "Banner / Thumbnail",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value) => {
                return (
                    <img
                        className="tableImage"
                        src={value}
                        alt="productImage"
                        width="50"
                        height="50"
                    />
                );
            },
        },
    },
    {
        name: "name",
        label: "Brand / Boutique Name",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, rowData) => {
                return (
                    <span>
                        {rowData?.rowData[2] === "product"
                            ? "Product Filters"
                            : value}
                    </span>
                );
            },
        },
    },
    {
        name: "type",
        label: "Type",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "is_banner",
        label: "Banner One",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, rowData) => {
                const handleChange = async (event, allData) => {
                    const data = event.target.checked === true ? 1 : 0;
                    try {
                        const response = await API.put(
                            `api/admin/media/${allData[6]}`,
                            { is_banner: data }
                        );
                    } catch (error) {
                        console.error("Error fetching data:", error);
                    }
                };
                return (
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    defaultChecked={value === 1 ? true : false}
                                    onChange={(e) =>
                                        handleChange(e, rowData?.rowData)
                                    }
                                />
                            }
                        />
                    </FormGroup>
                );
            },
        },
    },
    {
        name: "is_banner2",
        label: "Banner Two",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, rowData) => {
                const handleChange = async (event, allData) => {
                    const data = event.target.checked === true ? 1 : 0;
                    try {
                        const response = await API.put(
                            `api/admin/media/${allData[6]}`,
                            { is_banner2: data }
                        );
                    } catch (error) {
                        console.error("Error fetching data:", error);
                    }
                };
                return (
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    defaultChecked={value === 1 ? true : false}
                                    onChange={(e) =>
                                        handleChange(e, rowData?.rowData)
                                    }
                                />
                            }
                        />
                    </FormGroup>
                );
            },
        },
    },
    {
        name: "is_thumbnail",
        label: "Thumbnail",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, rowData) => {
                const handleChange = async (event, allData) => {
                    const data = event.target.checked === true ? 1 : 0;
                    try {
                        const response = await API.put(
                            `api/admin/media/${allData[5]}`,
                            { is_thumbnail: data }
                        );
                    } catch (error) {
                        console.error("Error fetching data:", error);
                    }
                };
                return (
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    onChange={(e) =>
                                        handleChange(e, rowData?.rowData)
                                    }
                                    defaultChecked={value === 1 ? true : false}
                                />
                            }
                        />
                    </FormGroup>
                );
            },
        },
    },
    {
        name: "id",
        label: "Action",
        options: {
            customBodyRender: (value) => {
                return (
                    <div className="actionWrapper">
                        <Link
                            to={`/banner/marketplace/${value}`}
                            className="actionBtn me-2"
                        >
                            Edit
                        </Link>
                    </div>
                );
            },
            filter: false,
            sort: false,
        },
    },
];

export const TailorBannerTableHeader = [
    {
        name: "image",
        label: "Banner / Thumbnail",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value) => {
                return (
                    <img
                        className="tableImage2"
                        src={value ? value : sewzeeImages?.NoImaege}
                        alt="productImage"
                        width="200"
                        height="80"
                    />
                );
            },
        },
    },
];
export const CategoryTableHeader = [
    {
        name: "image",
        label: "Banner / Thumbnail",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value) => {
                return (
                    <img
                        className="tableImage"
                        src={value ? value : sewzeeImages?.NoImaege}
                        alt="productImage"
                        width="200"
                        height="80"
                    />
                );
            },
        },
    },
    {
        name: "category",
        label: "Category Name",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, rowData) => {
                return <span>{value}</span>;
            },
        },
    },
    {
        name: "type",
        label: "Type",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "is_show",
        label: "Show on Home",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, rowData) => {
                const handleChange = async (event, allData) => {
                    const data = event.target.checked === true ? 1 : 0;
                    try {
                        const response = await API.put(
                            `api/admin/category/${allData[4]}`,
                            { is_show: data }
                        );
                    } catch (error) {
                        console.error("Error fetching data:", error);
                    }
                };
                return (
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    onChange={(e) =>
                                        handleChange(e, rowData?.rowData)
                                    }
                                    defaultChecked={value === 1 ? true : false}
                                />
                            }
                        />
                    </FormGroup>
                );
            },
        },
    },
    {
        name: "id",
        label: "Action",
        options: {
            customBodyRender: (value, rowData) => {
                const getData = rowData?.tableData.find(
                    (item) => item.id === value
                );

                return (
                    <div className="actionWrapper">
                        <Link
                            to={`/category/edit/${value}`}
                            className="actionBtn me-2"
                        >
                            Edit
                        </Link>
                    </div>
                );
            },
            filter: false,
            sort: false,
        },
    },
];
export const categoryBannerTableHeader = [
    {
        name: "image",
        label: "Banner / Thumbnail",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value) => {
                return (
                    <img
                        className="tableImage"
                        src={value}
                        alt="productImage"
                        width="50"
                        height="50"
                    />
                );
            },
        },
    },
    {
        name: "name",
        label: "Brand / Boutique Name",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, rowData) => {
                return (
                    <span>
                        {rowData?.rowData[2] === "product"
                            ? "Product Filters"
                            : value}
                    </span>
                );
            },
        },
    },
    {
        name: "categoryname",
        label: "Category name",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, rowData) => {
                return (
                    <span>
                        {rowData?.rowData[2] === "product"
                            ? "Product Filters"
                            : value}
                    </span>
                );
            },
        },
    },
    {
        name: "type",
        label: "Type",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "is_banner",
        label: "Banner One",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, rowData) => {
                const handleChange = async (event, allData) => {
                    const data = event.target.checked === true ? 1 : 0;
                    try {
                        const response = await API.put(
                            `api/admin/media/${allData[6]}`,
                            { is_banner: data }
                        );
                    } catch (error) {
                        console.error("Error fetching data:", error);
                    }
                };
                return (
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    defaultChecked={value === 1 ? true : false}
                                    onChange={(e) =>
                                        handleChange(e, rowData?.rowData)
                                    }
                                />
                            }
                        />
                    </FormGroup>
                );
            },
        },
    },
    {
        name: "is_banner2",
        label: "Banner Two",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, rowData) => {
                const handleChange = async (event, allData) => {
                    const data = event.target.checked === true ? 1 : 0;
                    try {
                        const response = await API.put(
                            `api/admin/media/${allData[6]}`,
                            { is_banner2: data }
                        );
                    } catch (error) {
                        console.error("Error fetching data:", error);
                    }
                };
                return (
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    defaultChecked={value === 1 ? true : false}
                                    onChange={(e) =>
                                        handleChange(e, rowData?.rowData)
                                    }
                                />
                            }
                        />
                    </FormGroup>
                );
            },
        },
    },
    {
        name: "is_thumbnail",
        label: "Thumbnail",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, rowData) => {
                const handleChange = async (event, allData) => {
                    const data = event.target.checked === true ? 1 : 0;
                    try {
                        const response = await API.put(
                            `api/admin/media/${allData[5]}`,
                            { is_thumbnail: data }
                        );
                    } catch (error) {
                        console.error("Error fetching data:", error);
                    }
                };
                return (
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    onChange={(e) =>
                                        handleChange(e, rowData?.rowData)
                                    }
                                    defaultChecked={value === 1 ? true : false}
                                />
                            }
                        />
                    </FormGroup>
                );
            },
        },
    },
    {
        name: "id",
        label: "Action",
        options: {
            customBodyRender: (value) => {
                return (
                    <div className="actionWrapper">
                        <Link
                            to={`/category/thumbs/edit/${value}`}
                            className="actionBtn me-2"
                        >
                            Edit
                        </Link>
                    </div>
                );
            },
            filter: false,
            sort: false,
        },
    },
];

// Orders
export const MarketPlaceOrdersTableHeader = [
    {
        name: "id",
        label: "Order Id",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "cname",
        label: "Customer Name",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "bname",
        label: "Business Name",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, rowData) => {
                return (
                    <span>
                        {rowData?.rowData[2] === "product"
                            ? "Product Filters"
                            : value}
                    </span>
                );
            },
        },
    },
    {
        name: "amount",
        label: "Order Price",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "created_at",
        label: "Date",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value) => {
                return (
                    //  add time also with date
                    <span>
                        {new Date(value).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                        })}
                    </span>
                );
            },
        },
    },
    {
        name: "status",
        label: "Status",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value) => {
                return (
                    <p
                        className={`orderStatusBtn ${
                            value === "accepted" ? "ongoing" : value
                        }`}
                    >
                        {value === "accepted" ? "Ongoing" : value}
                    </p>
                );
            },
        },
    },
    {
        name: "id",
        label: "Notification",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, rowData) => {
                const handleChange = async (event, allData) => {
                    const data = event.target.checked === true ? 1 : 0;
                    try {
                        const response = await API.put(
                            `api/admin/media/${allData[5]}`,
                            { is_thumbnail: data }
                        );
                    } catch (error) {
                        console.error("Error fetching data:", error);
                    }
                };
                return (
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    onChange={(e) =>
                                        handleChange(e, rowData?.rowData)
                                    }
                                    defaultChecked={value === 1 ? true : false}
                                />
                            }
                        />
                    </FormGroup>
                );
            },
        },
    },
    {
        name: "id",
        label: "Action",
        options: {
            customBodyRender: (value) => {
                return (
                    <div className="actionWrapper">
                        <Link to={`/orders/marketplace/${value}`}>
                            <VisibilityIcon />
                        </Link>
                    </div>
                );
            },
            filter: false,
            sort: false,
        },
    },
];
export const TailorOrdersTableHeader = [
    {
        name: "id",
        label: "Order Id",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "cname",
        label: "Customer Name",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "bname",
        label: "Business Name",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, rowData) => {
                return (
                    <span>
                        {rowData?.rowData[2] === "product"
                            ? "Product Filters"
                            : value}
                    </span>
                );
            },
        },
    },
    {
        name: "amount",
        label: "Order Price",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "created_at",
        label: "Date",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value) => {
                return (
                    //  add time also with date
                    <span>
                        {new Date(value).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                        })}
                    </span>
                );
            },
        },
    },
    {
        name: "status",
        label: "Status",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value) => {
                return <p className={`orderStatusBtn ${value}`}>{value}</p>;
            },
        },
    },
    {
        name: "id",
        label: "Notification",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, rowData) => {
                const handleChange = async (event, allData) => {
                    const data = event.target.checked === true ? 1 : 0;
                    try {
                        const response = await API.put(
                            `api/admin/media/${allData[5]}`,
                            { is_thumbnail: data }
                        );
                    } catch (error) {
                        console.error("Error fetching data:", error);
                    }
                };
                return (
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    onChange={(e) =>
                                        handleChange(e, rowData?.rowData)
                                    }
                                    defaultChecked={value === 1 ? true : false}
                                />
                            }
                        />
                    </FormGroup>
                );
            },
        },
    },
    {
        name: "id",
        label: "Action",
        options: {
            customBodyRender: (value) => {
                return (
                    <div className="actionWrapper">
                        <Link to={`/orders/tailor/${value}`}>
                            <VisibilityIcon />
                        </Link>
                    </div>
                );
            },
            filter: false,
            sort: false,
        },
    },
];
