import "./PageHeader.css";
import { CustomButton } from "../../ui/constants";
import { sewzeeImages } from "../../assets";
import { HeaderIconHandler } from "../../helper/IconHandler";
import { CircularProgress } from "@mui/material";

const PageHeader = ({
    headerTitle,
    handleClick,
    headerBtnName,
    type,
    handleBack,
    isBtn,
}) => {
    return (
        <div className="topHeaderWrapper">
            <div className="topHeaderTitle">
                {type === "back" ? (
                    <div onClick={handleBack} className="topHeaderBackBtn">
                        {" "}
                        <img src={sewzeeImages.BackIcon} alt="backIcon" />
                    </div>
                ) : (
                    <div>{HeaderIconHandler(headerTitle)}</div>
                )}
                <h5>{headerTitle}</h5>
            </div>
            {headerBtnName && (
                <div className="topHeaderButtons">
                    <CustomButton
                        handleClick={handleClick}
                        classId="topHeaderBtn pointer"
                    >
                        {headerBtnName === "Loading..." ? (
                            <CircularProgress
                                sx={{ color: "white" }}
                                size={20}
                            />
                        ) : (
                            headerBtnName
                        )}
                    </CustomButton>
                </div>
            )}
        </div>
    );
};

export default PageHeader;
