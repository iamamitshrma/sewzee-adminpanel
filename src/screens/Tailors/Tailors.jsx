import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Tailors.css"; // Updated CSS file name
import PageHeader from "../../components/PageHeader/PageHeader";
import { EnhancedTable } from "../../components/Table/Table";
import { TailorTableHeader } from "../../constants/TableHeader";
import { TableLoader } from "../../ui/SkeltonLoader/SkeltonLoader";

const Tailors = () => {
  // Updated component name
  const [tailors, setTailors] = useState({
    // Updated state variable name
    isLoading: true,
    data: [],
  });
  console.log("tailors", tailors); // Updated console log

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          "https://api.sewzee.shop/api/admin/tailors",
          { headers }
        );

        setTailors({
          isLoading: false,
          data: response.data.data,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setTailors({
          isLoading: false,
          data: [],
        });
      }
    };

    fetchData();
  }, []);

  return (
    <section className="tailorsWrapper">
      {" "}
      {/* Updated class name */}
      <PageHeader headerTitle={"Tailors"} isBtn={false} />{" "}
      {/* Updated header title */}
      <div className="productTableWtapper">
        {" "}
        {/* Updated class name */}
        {tailors.isLoading ? (
          <TableLoader />
        ) : (
          <EnhancedTable
            tableHeader={TailorTableHeader}
            tableData={tailors.data}
            tableTitle="Tailors"
            isCustomToolbar={false}
          />
        )}
      </div>
    </section>
  );
};

export default Tailors; // Updated export name
