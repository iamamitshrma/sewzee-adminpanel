
import { styled } from "@mui/material/styles";
import { IconButton, Toolbar, Typography, } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";

import "./Topbar.css"



const drawerWidth = 180;
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#7D5FFE",
    color: "white",
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Topbar = ({ open, toggleDrawer, handleLogout }) => {
    return (
        <AppBar position="absolute" open={true}>
            <Toolbar
                sx={{
                    pr: "24px", // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="#2e2ab9"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: "36px",
                        ...(open && { display: "none" }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                </Typography>
                <div className=''>
                    <button
                        className='topbarLogoutbtn'
                        onClick={handleLogout}
                    >
                        Log out
                    </button>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Topbar