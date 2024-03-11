import { sewzeeImages } from "../../assets";
import "./PageHeader.css";

const OrderPageHeader = ({ type, handleBack, headerTitle }) => {
    return (
        <div className="topHeaderWrapper orderTopHeader">
            <div className="topHeaderTitle">
                <div onClick={handleBack} className="topHeaderBackBtn">
                    {" "}
                    <img src={sewzeeImages.BackIcon} alt="backIcon" />
                </div>
                <h5>{headerTitle}</h5>
            </div>
        </div>
    );
};

export default OrderPageHeader;
