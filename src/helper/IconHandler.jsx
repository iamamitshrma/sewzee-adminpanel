// iocns
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StoreIcon from "@mui/icons-material/Store";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

// SideBar
export const IconHandaler = (title, type) => {
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
        case "Banner & Thumb..":
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
                        color: "white",
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
        default:
            break;
    }

    return icon;
};

// Page Header

export const HeaderIconHandler = (title) => {
    let icon;

    switch (title) {
        case "Markateplace Banner":
            icon = (
                <StoreIcon
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
