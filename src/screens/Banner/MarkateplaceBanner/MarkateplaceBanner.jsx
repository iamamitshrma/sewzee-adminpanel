import { useEffect, useState } from "react";

import API from "../../../services/common";
import "./MarkateplaceBanner.css";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { EnhancedTable } from "../../../components/Table/Table";
import { TableLoader } from "../../../ui/SkeltonLoader/SkeltonLoader";
import { markateplaceBannerTableHeader } from "../../../constants/TableHeader";
import DeleteConfirmation from "../../../components/DeleteConfirmation/DeleteConfirmation";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MarkateplaceBanner = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isModalOpen, setModalOpen] = useState(false);
    const handleClose = () => setModalOpen(false);
    const handleShow = () => setModalOpen(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [markateplaceBanner, setMarkateplaceBanner] = useState({
        isLoading: true,
        data: [],
    });
    // select media for delete
    const handleDeleteClick = (rowsDeleted, data) => {
        if (rowsDeleted.data.length === 1) {
            const selectedRow =
                markateplaceBanner?.data[rowsDeleted.data[0].index];
            setSelectedProduct(selectedRow);
        } else {
            setSelectedProduct(null);
            const selectedRows = rowsDeleted.data.map((item) => {
                return markateplaceBanner?.data[item.index];
            });
            setSelectedProduct(selectedRows);
        }
        handleShow();
    };
    const fetchData = async () => {
        try {
            const response = await API.get(
                `api/admin/media?limit=${rowsPerPage}`
            );
            setMarkateplaceBanner({
                isLoading: false,
                data: response.data.data,
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            setMarkateplaceBanner({
                isLoading: false,
                data: [],
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, [rowsPerPage]);

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
                    `api/admin/media/${selectedProduct?.id}`
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
        <div className="markateplaceBannerWrapper">
            <PageHeader
                headerBtnName="Add New Banner Or Thumbnail"
                headerTitle={"Markateplace Banner / Thumbnail"}
                handleClick={() => navigate("/banner/marketplace/add")}
            />
            <div className="usersWtapper">
                {markateplaceBanner?.isLoading ? (
                    <TableLoader />
                ) : (
                    <EnhancedTable
                        tableHeader={markateplaceBannerTableHeader}
                        tableData={markateplaceBanner?.data}
                        tableTitle="Markateplace Banner"
                        handleDelete={handleDeleteClick}
                        isCustomToolbar={false}
                        handlePageLimit={handlePageLimit}
                    />
                )}
            </div>
            <DeleteConfirmation
                open={isModalOpen}
                handleClose={handleClose}
                handleDelete={handleDeleteConfirmation}
                singleDeletecompoment={{
                    title: "Are you sure you want to delete this Banner?",
                    image: selectedProduct?.image,
                    name: selectedProduct?.name,
                }}
                modalData={selectedProduct}
                isSingle={selectedProduct?.length > 0 ? true : false}
            />
        </div>
    );
};

export default MarkateplaceBanner;
