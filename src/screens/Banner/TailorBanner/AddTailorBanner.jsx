import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import "./TailorBanner.css";
import { storage } from "../../../firebase/firebase";
import PageHeader from "../../../components/PageHeader/PageHeader";
import ProductTopHead from "../../../components/ProductTopHead/ProductTopHead";
import { toast } from "react-hot-toast";
import API from "../../../services/common";

const AddTailorBanner = () => {
    const imgref = useRef(null);
    const navigate = useNavigate();
    const [percentUpload, setPercentUpload] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tailorBanner, setTailorBanner] = useState({
        image: "",
    });

    const handleUpdate = async () => {
        setIsLoading(true);
        if (!tailorBanner?.image) {
            setIsLoading(false);
            return toast.error("Please upload banner image");
        }
        try {
            const response = await API.post("api/admin/banner", tailorBanner);
            if (response.status === 200) {
                toast.success(response.data.message);
                navigate("/banner/tailor");
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(error?.response?.data?.message);
        }
    };

    // handle upload
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
                    setTailorBanner((prev) => ({
                        ...prev,
                        image: downloadURL,
                    }));
                });
            }
        );
    };

    return (
        <div className="tailorBannerWrapper mb-2">
            <PageHeader
                headerTitle={"Add Tailor Banner"}
                isBtn={true}
                type="back"
                headerBtnName={`${isLoading ? "Loading..." : "Save"}`}
                handleClick={handleUpdate}
                handleBack={() => navigate("/banner/tailor")}
            />
            <div className="addtailorBannerContainer">
                <ProductTopHead title={"Tailor Banner Image"} />
                <div className="tailorBannerMediaOption">
                    <div className="tailorBannerMediaUoload">
                        <h6>Image Upload</h6>
                        <div className="marketplaceBannerMediaInputs">
                            <label
                                onClick={() => imgref.current.click()}
                                className="tailorBannerLogoUploadBtn"
                            >
                                {" "}
                                {isUploading
                                    ? percentUpload
                                    : tailorBanner?.image
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
                </div>
                <div className="tailorBannerMedia">
                    {tailorBanner?.image && (
                        <div className="tailorBannerPrev">
                            <h6>Banner</h6>
                            <img src={tailorBanner?.image} alt="" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddTailorBanner;
