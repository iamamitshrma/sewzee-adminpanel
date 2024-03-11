import { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, CssBaseline, Toolbar, createTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import useStyles from "./MainLayoutStyle";
import "./MainLayout.css";
import { logoutAction } from "../../store/slices/authSlices/authSlice";

const mdTheme = createTheme();

const MainLayout = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleLogout = () => {
        navigate("/");
        dispatch(logoutAction());
    };

    const handleListClick = (url) => {
        navigate(url);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Topbar
                open={open}
                handleLogout={handleLogout}
                toggleDrawer={toggleDrawer}
            />
            <Sidebar
                open={open}
                classes={classes}
                toggleDrawer={toggleDrawer}
                handleListClick={handleListClick}
            />
            <Box
                component="main"
                className="dashboard-outlet"
                sx={{
                    backgroundColor: (theme) =>
                        props?.location?.pathname.includes("/add")
                            ? "#fff"
                            : theme.palette.grey[100],
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "auto",
                }}
            >
                <Toolbar />
                {props.children}
            </Box>
        </Box>
    );
};

export default MainLayout;
