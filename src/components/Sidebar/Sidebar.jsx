import React, { useState } from "react";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import {
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
} from "@mui/material";

// iocns
import StorefrontIcon from "@mui/icons-material/Storefront";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PeopleIcon from "@mui/icons-material/People";

import { FiShoppingCart } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";

import "./Sidebar.css";
import { sewzeeImages } from "../../assets";
import { sidebarList } from "../../constants";

const drawerWidth = 240;
const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    "& .MuiTypography-body1": {
        fontFamily: "Lato !important",
    },
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        height: "100vh",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        fontFamily: "Lato",
        backgroundColor: "#7D5FFE",
        color: "white",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

const IconHandaler = (title, type) => {
    let icon;

    switch (title) {
        case "Dashboard":
            icon = type ? (
                <DashboardIcon
                    style={{
                        color: "white",
                        fontSize: "1.8rem",
                    }}
                />
            ) : (
                <DashboardIcon
                    style={{
                        color: "black",
                        fontSize: "1.8rem",
                    }}
                />
            );
            break;
        case "Users":
            icon = type ? (
                <AccountCircleIcon
                    style={{
                        color: "white",
                        fontSize: "1.8rem",
                    }}
                />
            ) : (
                <AccountCircleIcon
                    style={{
                        color: "black",
                        fontSize: "1.8rem",
                    }}
                />
            );
            break;
        case "Banner":
            icon = type ? (
                <PermMediaIcon
                    style={{
                        color: "white",
                        fontSize: "1.8rem",
                    }}
                />
            ) : (
                <PermMediaIcon
                    style={{
                        color: "black",
                        fontSize: "1.8rem",
                    }}
                />
            );
            break;
        case "Customers":
            icon = type ? (
                <AssignmentIndIcon
                    style={{
                        color: "black",
                        fontSize: "1.8rem",
                    }}
                />
            ) : (
                <AssignmentIndIcon
                    style={{
                        color: "black",
                        fontSize: "1.8rem",
                    }}
                />
            );
            break;
        case "Category":
            icon = type ? (
                <BiCategory
                    style={{
                        color: "white",
                        fontSize: "1.8rem",
                    }}
                />
            ) : (
                <BiCategory
                    style={{
                        color: "black",
                        fontSize: "1.8rem",
                    }}
                />
            );
            break;
        case "Orders":
            icon = type ? (
                <FiShoppingCart
                    style={{
                        color: "white",
                        fontSize: "1.8rem",
                    }}
                />
            ) : (
                <FiShoppingCart
                    style={{
                        color: "black",
                        fontSize: "1.8rem",
                    }}
                />
            );
            break;
        default:
            break;
    }

    return icon;
};

const Sidebar = ({ toggleDrawer, open, classes, handleListClick }) => {
    const location = window.location.pathname;
    const [anchorElDashboard, setAnchorElDashboard] = useState(null);
    const [anchorElCustomer, setAnchorElCustomer] = useState(null);
    const [anchorElBanner, setAnchorElBanner] = useState(null);
    const [anchorElCategory, setAnchorElCategory] = useState(null);
    const [anchorElOrders, setAnchorElOrders] = useState(null);

    const handleMenuOpen = (event, menuId) => {
        switch (menuId) {
            case "dashboard":
                setAnchorElDashboard(event.currentTarget);
                break;
            case "customer":
                setAnchorElCustomer(event.currentTarget);
                break;
            case "banner":
                setAnchorElBanner(event.currentTarget);
                break;
            case "category":
                setAnchorElCategory(event.currentTarget);
                break;
            case "orders":
                setAnchorElOrders(event.currentTarget);
                break;
            default:
                break;
        }
    };

    const handleMenuClose = (menuId) => {
        switch (menuId) {
            case "dashboard":
                setAnchorElDashboard(null);
                break;
            case "customer":
                setAnchorElCustomer(null);
                break;
            case "banner":
                setAnchorElBanner(null);
                break;
            case "category":
                setAnchorElCategory(null);
                break;
            case "orders":
                setAnchorElOrders(null);
                break;
            default:
                break;
        }
    };


    return (
        <Drawer variant="permanent" open={true}>
            <Toolbar
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#edf1fa",
                    px: [1],
                }}
            >
                <div className="sidebar-logo">
                    <img src={sewzeeImages.sewzeeLogo} alt="" />
                </div>
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon className={classes.closeDrawer} />
                </IconButton>
            </Toolbar>
            <Divider />

            <List className={classes.listDiv}>
                {sidebarList.map((item) =>
                    item?.options ? (
                        <React.Fragment key={item?.id}>
                            <ListItem
                                button
                                className={
                                    location.includes(item?.link)
                                        ? classes.selectedList
                                        : classes.unSelectedList
                                }
                                onClick={(event) =>
                                    handleMenuOpen(event, item.collapse)
                                }
                            >
                                <ListItemIcon>
                                    {location.includes(item?.link)
                                        ? IconHandaler(item?.label, true)
                                        : IconHandaler(item?.label, false)}
                                </ListItemIcon>
                                <ListItemText
                                    style={{ color: "white" }}
                                    primary={item?.label}
                                />
                            </ListItem>
                            <Menu
                                anchorEl={
                                    item.collapse === "dashboard"
                                        ? anchorElDashboard
                                        : item.collapse === "customer"
                                        ? anchorElCustomer
                                        : item.collapse === "banner"
                                        ? anchorElBanner
                                        : item.collapse === "category"
                                        ? anchorElCategory
                                        : item.collapse === "orders"
                                        ? anchorElOrders
                                        : null
                                }
                                open={Boolean(
                                    item.collapse === "dashboard"
                                        ? anchorElDashboard
                                        : item.collapse === "customer"
                                        ? anchorElCustomer
                                        : item.collapse === "banner"
                                        ? anchorElBanner
                                        : item.collapse === "category"
                                        ? anchorElCategory
                                        : item.collapse === "orders"
                                        ? anchorElOrders
                                        : null
                                )}
                                onClose={() => handleMenuClose(item.collapse)}
                            >
                                {item?.options.map((option) => (
                                    <MenuItem
                                        key={option?.id}
                                        onClick={() => {
                                            handleListClick(option.link);
                                            handleMenuClose();
                                        }}
                                    >
                                        <ListItemText primary={option?.label} />
                                    </MenuItem>
                                ))}
                            </Menu>
                        </React.Fragment>
                    ) : (
                        <ListItem
                            key={item.id}
                            button
                            className={
                                location.includes(item.link)
                                    ? classes.selectedList
                                    : classes.unSelectedList
                            }
                            onClick={() => handleListClick(item?.link)}
                        >
                            <ListItemIcon>
                                {location.includes(item.link)
                                    ? IconHandaler(item.label, true)
                                    : IconHandaler(item.label, false)}
                            </ListItemIcon>
                            <ListItemText
                                style={{ color: "white" }}
                                primary={item.label}
                            />
                        </ListItem>
                    )
                )}
            </List>
        </Drawer>
    );
};

export default Sidebar;
