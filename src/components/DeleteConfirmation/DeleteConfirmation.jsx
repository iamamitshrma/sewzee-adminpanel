import CloseIcon from "@mui/icons-material/Close";

// local imports
import "./DeleteConfirmation.css";
import { CustomButton } from "../../ui/constants";
import CustomModal from "../../ui/CustomModal/CustomModal";
import { sewzeeImages } from "../../assets";

const DeleteConfirmation = ({
    open,
    handleClose,
    handleDelete,
    isSingle,
    modalData,
    singleDeletecompoment,
}) => {
    return (
        <CustomModal open={open} handleClose={handleClose}>
            <div className="deleteConfirmationWrapper">
                <div className="deleteConfirmationHeader">
                    <h6>Delete Product Confirmation</h6>
                    <CloseIcon onClick={handleClose} />
                </div>
                <div
                    className={`deleteConfirmationBody ${
                        !isSingle && "flexJustifyCenter"
                    }`}
                >
                    {!isSingle ? (
                        <div className="deleteConfirmationSingleProduct">
                            <h4>{singleDeletecompoment?.title}</h4>
                            <div className="deleteConfirmationSingleProductContent">
                                <div className="deleteModalImage">
                                    <img
                                        src={
                                            singleDeletecompoment?.image
                                                ? singleDeletecompoment?.image
                                                : sewzeeImages?.NoImaege
                                        }
                                        alt=""
                                    />
                                </div>
                                {singleDeletecompoment?.name && (
                                    <div className="deleteModalContent">
                                        <h5>
                                            {" "}
                                            {singleDeletecompoment?.type} Name :{" "}
                                            {singleDeletecompoment?.name}
                                        </h5>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <h5>Are you sure you want to delete all this ?</h5>
                    )}
                </div>
                <div className="deleteConfirmationFooter">
                    <CustomButton
                        handleClick={handleDelete}
                        classId="confirmationBtn confirmationBtn--yes"
                    >
                        Yes
                    </CustomButton>
                    <CustomButton
                        handleClick={handleClose}
                        classId="confirmationBtn confirmationBtn--no"
                    >
                        No
                    </CustomButton>
                </div>
            </div>
        </CustomModal>
    );
};

export default DeleteConfirmation;
