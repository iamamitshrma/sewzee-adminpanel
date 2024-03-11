import { CiEdit } from "react-icons/ci";
import PageHeader from "../../components/PageHeader/PageHeader";
import "./FooterText.css";
import { useEffect, useState } from "react";
import API from "../../services/common";
import { toast } from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import { CustomButton } from "../../ui/constants";

const FooterText = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [footerText, setFooterText] = useState({
        isLoading: true,
        data: {},
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get("api/admin/text/footer");

                setFooterText({
                    isLoading: false,
                    data: response.data.data,
                });
            } catch (error) {
                toast.error(error?.response?.data?.message);
                setFooterText({
                    isLoading: false,
                    data: [],
                });
            }
        };

        fetchData();
    }, []);

    const handleChnage = (e) => {
        setFooterText({
            ...footerText,
            data: {
                ...footerText.data,
                [e.target.name]: e.target.value,
            },
        });
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!footerText?.data?.text || !footerText?.data?.text2)
            return toast.error("Please fill all the fields");

        try {
            delete footerText?.data?.id;
            const res = await API.put(
                "api/admin/text/footer",
                footerText?.data
            );
            console.log(res);
            if (res.status === 200) {
                setIsEdit(false);
                setIsLoading(false);
                toast.success("Successfully Updated");
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            toast.error(error?.response?.data?.message);
        }
    };

    return (
        <div className="footerTextWrapper">
            <PageHeader headerTitle={"Footer Text"} isBtn={false} />
            <div className="footerTextContainer">
                <form onSubmit={handleEdit} className="footerTextContnet">
                    {isEdit ? (
                        <div className="">
                            <div className="footerTextContnetInput">
                                <label>Text 1</label>
                                <input
                                    onChange={handleChnage}
                                    type="text"
                                    name="text"
                                    id="name"
                                    placeholder={`Name`}
                                    required
                                    defaultValue={footerText.data?.text}
                                />
                            </div>
                            <div className="footerTextContnetInput my-2">
                                <label>Text 2</label>
                                <input
                                    onChange={handleChnage}
                                    type="text"
                                    name="text2"
                                    id="name"
                                    placeholder={`Name`}
                                    required
                                    defaultValue={footerText.data?.text2}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="">
                            <h6>{footerText?.data?.text}</h6>
                            <h6>{footerText?.data?.text2}</h6>
                        </div>
                    )}
                    {isEdit ? (
                        <CustomButton classId="profileEditBtn">
                            {isLoading ? (
                                <CircularProgress
                                    size={18}
                                    sx={{ color: "white" }}
                                />
                            ) : (
                                "Save"
                            )}
                        </CustomButton>
                    ) : (
                        <div
                            onClick={() => setIsEdit(true)}
                            className="footerTextContnetEdit"
                        >
                            <span>Edit</span>
                            <CiEdit />
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default FooterText;
