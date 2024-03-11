import React, { useState, useEffect } from "react";
import API from "../../services/common";
import "./TailorCustomers.css"; // Make sure to adjust the CSS file name accordingly
import PageHeader from "../../components/PageHeader/PageHeader";
import { EnhancedTable } from "../../components/Table/Table";
import { TailorCustomerTableHeader } from "../../constants/TableHeader"; // Make sure to adjust the table header import path
import { TableLoader } from '../../ui/SkeltonLoader/SkeltonLoader'

const TailorCustomers = () => {
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

        const response = await API.get("/api/admin/tailoringCust?search=&from&to"); // Update the API endpoint to fetch tailor customers data

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
    <section className="tailorCustomersWrapper">
      <PageHeader headerTitle={"Tailor Customers"} isBtn={false} /> {/* Update the page header accordingly */}
      <div className="productTableWtapper">
        {customers.isLoading ? (
          <TableLoader />
        ) : (
          <EnhancedTable
            tableHeader={TailorCustomerTableHeader} // Update the table header if needed
            tableData={customers.data}
            tableTitle="Tailor Customers"
            isCustomToolbar={false}
          />
        )}
      </div>
    </section>
  );
};

export default TailorCustomers;
