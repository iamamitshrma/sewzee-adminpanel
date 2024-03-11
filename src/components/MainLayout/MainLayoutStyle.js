import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    root: {
        "& .MuiTypography-body1": {
            fontFamily: "Lato !important",
        },
    },
    navHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginLeft: "1.5rem",
        padding: "1.5rem 1.5rem 1rem 1.5rem",
    },
    iconColor: {
        // color: '#C4C4C4',
        height: "22px",
        width: "22px",
    },
    closeDrawer: {
        color: "#2e2ab9",

    },
    listDiv: {
        marginTop: "2rem !important",
        fontFamily: "Lato",
        fontWeight: "600",
        fontSize: "20px",
        letterSpacing: "0.4px",
    },
    listItems: {
        margin: "1.2rem auto !important",
        backgroundColor: "#5854ce !important",
    },
    selectedList: {
        width: "100% !important",
        margin: "auto !important",
        padding: "5px 14px !important",
        borderRadius: "0px !important",
        backgroundColor: "#ae9bff !important",
        color: "#000 !important",
    },
    // unSelectedList: {
    //     width: "100% !important",
    //     margin: "auto !important",
    //     padding: "5px 14px !important",
    //     borderRadius: "0px !important",
    //     backgroundColor: "#b3b1ff !important",
    //     color: "#000 !important",
    // },
    profileImgDiv: {
        height: "45px",
        width: "45px",
        marginLeft: "2rem",
    },
    profileImg: {
        width: "100%",
        objectFit: "cover",
    },
    logoutBtnDiv: {
        marginLeft: "25px",
        marginRight: "10px",
    },
    logoutBtn: {
        padding: "8px 15px",
        outline: "none",
        border: "none",
        backgroundColor: "#2E2AB9",
        borderRadius: "5px",
        color: "#fff",
        fontFamily: "Lato",
        fontWeight: "500",
        fontSize: "15px",
        boxShadow:
            "0px 3px 1px -2px rgb(0 0 0 / 20%),0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
        cursor: "pointer",
    },
    navLink: {
        textDecoration: "none",
    },
}));
