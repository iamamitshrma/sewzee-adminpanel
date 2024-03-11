import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import "./CategoryBanner.css";
import DeleteConfirmation from "../../../components/DeleteConfirmation/DeleteConfirmation";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { TableLoader } from "../../../ui/SkeltonLoader/SkeltonLoader";
import { EnhancedTable } from "../../../components/Table/Table";
import API from "../../../services/common";
import { categoryBannerTableHeader } from "../../../constants/TableHeader";

const CategoryBanner = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [filterCategory, setFilterCategory] = useState({});
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isModalOpen, setModalOpen] = useState(false);
    const handleClose = () => setModalOpen(false);
    const handleShow = () => setModalOpen(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [markateplaceBanner, setMarkateplaceBanner] = useState({
        isLoading: true,
        data: [],
    });

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
                filterCategory?.id
                    ? `api/admin/category/media?limit=${rowsPerPage}&id=${filterCategory?.id}`
                    : `api/admin/category/media?limit=${rowsPerPage}`
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
    }, [rowsPerPage, page, filterCategory]);

    const handleDeleteConfirmation = async () => {
        if (selectedProduct?.length > 0) {
            // Multiple Item Delete
            const selectedIds = selectedProduct.map((item) => item.id);
            selectedIds.forEach(async (id, index, data) => {
                try {
                    await API.delete(`api/admin/category/media/${id}`);
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
                    `api/admin/category/media/${selectedProduct?.id}`
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

    console.log("markateplaceBanner", filterCategory);
    return (
        <div className="categoryBannerWrapper">
            <PageHeader
                headerBtnName="Add Category Banner Or Thumbnail"
                headerTitle={"Category Banner / Thumbnail"}
                handleClick={() => navigate("/category/thumbs/add")}
            />
            <div className="usersWtapper">
                {markateplaceBanner?.isLoading ? (
                    <TableLoader />
                ) : (
                    <EnhancedTable
                        tableHeader={categoryBannerTableHeader}
                        tableData={markateplaceBanner?.data}
                        tableTitle="Category Banner / Thumbnail"
                        handleDelete={handleDeleteClick}
                        handlePageLimit={handlePageLimit}
                        setFilterCategory={setFilterCategory}
                        isCustomToolbar={true}
                        filterCategory={filterCategory}
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

export default CategoryBanner;
