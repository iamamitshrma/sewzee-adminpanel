import { useNavigate } from "react-router-dom";
import PageHeader from "../../../components/PageHeader/PageHeader";
import "./TailorBanner.css";
import { useEffect, useState } from "react";
import { EnhancedTable } from "../../../components/Table/Table";
import { TableLoader } from "../../../ui/SkeltonLoader/SkeltonLoader";
import DeleteConfirmation from "../../../components/DeleteConfirmation/DeleteConfirmation";
import { toast } from "react-hot-toast";
import API from "../../../services/common";
import { TailorBannerTableHeader } from "../../../constants/TableHeader";

const TailorBanner = () => {
    const navigate = useNavigate();
    const handleClose = () => setModalOpen(false);
    const handleShow = () => setModalOpen(true);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [tailorBanner, setTailorBanner] = useState({
        isLoading: true,
        data: [],
    });

    const fetchData = async () => {
        try {
            const response = await API.get(
                `api/admin/banners?limit=${rowsPerPage}`
            );
            setTailorBanner({
                isLoading: false,
                data: response.data.data,
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            setTailorBanner({
                isLoading: false,
                data: [],
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, [rowsPerPage]);

    const handleDeleteClick = (rowsDeleted, data) => {
        if (rowsDeleted.data.length === 1) {
            const selectedRow = tailorBanner?.data[rowsDeleted.data[0].index];
            setSelectedProduct(selectedRow);
        } else {
            setSelectedProduct(null);
            const selectedRows = rowsDeleted.data.map((item) => {
                return tailorBanner?.data[item.index];
            });
            setSelectedProduct(selectedRows);
        }
        handleShow();
    };

    const handleDeleteConfirmation = async () => {
        if (selectedProduct?.length > 0) {
            // Multiple Item Delete
            const selectedIds = selectedProduct.map((item) => item.id);
            selectedIds.forEach(async (id, index, data) => {
                try {
                    await API.delete(`api/admin/media/${id}`);
                } catch (error) {
                    console.error("Error deleting data:", error);
                }
                if (index === data?.length - 1) {
                    toast.success("Deleted Successfully");
                    fetchData();
                }
            });
        } else {
            //  Single Item Delete
            try {
                const response = await API.delete(
                    `api/admin/banner/${selectedProduct?.id}`
                );
                if (response?.status === 200) {
                    fetchData();
                    toast.success(response?.data?.message);
                }
            } catch (error) {
                toast.error(error?.response?.data?.message);
            }
        }

        handleClose();
    };

    const handlePageLimit = (limit) => {
        setRowsPerPage(limit);
    };

    return (
        <div className="tailorBannerWrapper">
            <PageHeader
                headerBtnName="Add Tailor Banner"
                headerTitle={"Tailor Banner"}
                handleClick={() => navigate("/banner/tailor/add")}
            />
            <div className="usersWtapper">
                {tailorBanner?.isLoading ? (
                    <TableLoader />
                ) : (
                    <EnhancedTable
                        tableHeader={TailorBannerTableHeader}
                        tableData={tailorBanner?.data}
                        tableTitle="Tailor Banner"
                        handleDelete={handleDeleteClick}
                        handlePageLimit={handlePageLimit}
                    />
                )}
            </div>
            <DeleteConfirmation
                open={isModalOpen}
                handleClose={handleClose}
                handleDelete={handleDeleteConfirmation}
                modalData={selectedProduct}
                isCustomToolbar={false}
                singleDeletecompoment={{
                    title: "Are you sure you want to delete this Banner?",
                    image: selectedProduct?.image,
                    name: selectedProduct?.name,
                }}
                isSingle={selectedProduct?.length > 0 ? true : false}
            />
        </div>
    );
};

export default TailorBanner;
