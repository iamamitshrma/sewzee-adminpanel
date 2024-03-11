import { useNavigate } from "react-router-dom";

import "../Orders.css";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { useEffect, useState } from "react";
import { TableLoader } from "../../../ui/SkeltonLoader/SkeltonLoader";
import { EnhancedTable } from "../../../components/Table/Table";
import { MarketPlaceOrdersTableHeader } from "../../../constants/TableHeader";
import API from "../../../services/common";
import OrderHeader from "../../../components/OrderHeader/OrderHeader";
import { toast } from "react-hot-toast";

const MarketplaceOrders = () => {
    const handleShow = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);
    const [filterData, setFilterData] = useState({
        status: "",
        from: {},
        to: {},
    });
    const [toggleType, setToggleType] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [marketplaceOrders, setMarketplaceOrders] = useState({
        isLoading: true,
        data: [],
    });

    const fetchData = async () => {
        try {
            const filterByStatus = filterData.status
                ? `&status=${
                      filterData.status === "ongoing"
                          ? "accepted"
                          : filterData.status
                  }`
                : "";
            const filterByDate =
                filterData.from?.$d && filterData.to?.$d
                    ? `&from=${filterData.from.$d}&to=${filterData.to.$d}`
                    : "";

            const response = await API.get(
                `api/admin/orders?limit=${rowsPerPage}${filterByStatus}${filterByDate}`
            );
            setMarketplaceOrders({
                isLoading: false,
                data: response?.data?.data,
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            setMarketplaceOrders({
                isLoading: false,
                data: [],
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, [rowsPerPage, filterData.status]);

    const fetchDataByDate = async () => {
        if (!filterData.from?.$d && !filterData.to?.$d) {
            toast.error("Please select date range");
            return;
        } else if (!filterData.from?.$d) {
            toast.error("Please select from date");
            return;
        } else if (!filterData.to?.$d) {
            toast.error("Please select to date");
            return;
        }
        try {
            fetchData();
        } catch (error) {
            console.error("Error fetching data:", error);
            setMarketplaceOrders({
                isLoading: false,
                data: [],
            });
        }
    };

    const handleDeleteClick = (rowsDeleted, data) => {
        if (rowsDeleted.data.length === 1) {
            const selectedRow =
                marketplaceOrders?.data[rowsDeleted.data[0].index];
            setSelectedProduct(selectedRow);
        } else {
            setSelectedProduct(null);
            const selectedRows = rowsDeleted.data.map((item) => {
                return marketplaceOrders?.data[item.index];
            });
            setSelectedProduct(selectedRows);
        }
        handleShow();
    };

    const handlePageLimit = (limit) => {
        setRowsPerPage(limit);
    };

    console.log(filterData);
    return (
        <div className="ordersWrapper">
            <PageHeader headerTitle={"Marketplace Orders"} />
            <div>
                <OrderHeader
                    setFilterData={setFilterData}
                    filterData={filterData}
                    handleRefresh={fetchData}
                    filterByDate={fetchDataByDate}
                    marketplaceOrders={marketplaceOrders}
                />
                {marketplaceOrders?.isLoading ? (
                    <TableLoader />
                ) : (
                    <EnhancedTable
                        tableHeader={MarketPlaceOrdersTableHeader}
                        tableData={marketplaceOrders?.data}
                        tableTitle="Marketplace Orders"
                        handleDelete={handleDeleteClick}
                        handlePageLimit={handlePageLimit}
                        isCustomToolbar={false}
                        customeClasses="marketplaceOrders"
                    />
                )}
            </div>
        </div>
    );
};

export default MarketplaceOrders;
