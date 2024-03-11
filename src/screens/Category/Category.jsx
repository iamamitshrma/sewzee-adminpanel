import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader";
import "./Category.css";
import { useEffect, useState } from "react";
import API from "../../services/common";
import { TableLoader } from "../../ui/SkeltonLoader/SkeltonLoader";
import { EnhancedTable } from "../../components/Table/Table";
import { CategoryTableHeader } from "../../constants/TableHeader";
import DeleteConfirmation from "../../components/DeleteConfirmation/DeleteConfirmation";
import { toast } from "react-hot-toast";

const Category = () => {
    const navigate = useNavigate();
    const handleShow = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [category, setCategory] = useState({
        isLoading: true,
        data: [],
    });

    const fetchData = async () => {
        try {
            const response = await API.get(
                `api/admin/category?limit=${rowsPerPage}`
            );
            setCategory({
                isLoading: false,
                data: response.data.category,
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            setCategory({
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
            const selectedRow = category?.data[rowsDeleted.data[0].index];
            setSelectedProduct(selectedRow);
        } else {
            setSelectedProduct(null);
            const selectedRows = rowsDeleted.data.map((item) => {
                return category?.data[item.index];
            });
            setSelectedProduct(selectedRows);
        }
        handleShow();
    };

    const handlePageLimit = (limit) => {
        setRowsPerPage(limit);
    };
    const handleDeleteConfirmation = async () => {
        if (selectedProduct?.length > 0) {
            // Multiple Item Delete
            const selectedIds = selectedProduct.map((item) => item.id);
            selectedIds.forEach(async (id, index, data) => {
                try {
                    await API.delete(`api/admin/category/${id}`);
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
                    `api/admin/category/${selectedProduct?.id}`
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

    return (
        <div className="categoryWrapper">
            <PageHeader
                headerBtnName="Add New Category"
                headerTitle={"Category List"}
                handleClick={() => navigate("/category/add")}
            />
            <div className="usersWtapper">
                {category?.isLoading ? (
                    <TableLoader />
                ) : (
                    <EnhancedTable
                        tableHeader={CategoryTableHeader}
                        tableData={category?.data}
                        tableTitle="Category List"
                        handleDelete={handleDeleteClick}
                        handlePageLimit={handlePageLimit}
                        isCustomToolbar={false}
                    />
                )}
            </div>
            <DeleteConfirmation
                open={isModalOpen}
                handleClose={handleClose}
                singleDeletecompoment={{
                    title: "Are you sure you want to delete this category?",
                    image: selectedProduct?.image,
                    name: selectedProduct?.category,
                }}
                handleDelete={handleDeleteConfirmation}
                modalData={selectedProduct}
                isSingle={selectedProduct?.length > 0 ? true : false}
            />
        </div>
    );
};

export default Category;
