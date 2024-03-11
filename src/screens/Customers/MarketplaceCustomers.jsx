import React, { useState, useEffect } from "react";
import API from "../../services/common";
import "./MarketplaceCustomers.css"; // Make sure to adjust the CSS file name accordingly
import PageHeader from "../../components/PageHeader/PageHeader";
import { EnhancedTable } from "../../components/Table/Table";
import { MarketplaceTableHeader } from "../../constants/TableHeader";
import { TableLoader } from '../../ui/SkeltonLoader/SkeltonLoader'

const MarketplaceCustomers = () => {
  const [customers, setCustomers] = useState({
    isLoading: true,
    data: [],
  });
  console.log("customers", customers);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await API.get("/api/admin/marketplaceCust?search=&from&to");

        setCustomers({
          isLoading: false,
          data: response.data.data,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setCustomers({
          isLoading: false,
          data: [],
        });
      }
    };

    fetchData();
  }, []);

  return (
    <section className="marketplaceCustomersWrapper">
      <PageHeader headerTitle={"Marketplace Customers"} isBtn={false} />
      <div className="productTableWtapper">
        {customers.isLoading ? (
          <TableLoader />
        ) : (
          <EnhancedTable
            tableHeader={MarketplaceTableHeader} 
            tableData={customers.data}
            tableTitle="Marketplace Customers"
            isCustomToolbar={false}
          />
        )}
      </div>
    </section>
  );
};

export default MarketplaceCustomers;
