import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Drivers.css"; 
import PageHeader from "../../components/PageHeader/PageHeader";
import { EnhancedTable } from "../../components/Table/Table";
import { DriverTableHeader} from "../../constants/TableHeader";
import { TableLoader } from "../../ui/SkeltonLoader/SkeltonLoader";

const Drivers = () => {
 
  const [drivers, setDrivers] = useState({
    
    isLoading: true,
    data: [],
  });
  console.log("drivers", drivers); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          "https://api.sewzee.shop/api/admin/drivers",
          { headers }
        );

        setDrivers({
          isLoading: false,
          data: response.data.data,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setDrivers({
          isLoading: false,
          data: [],
        });
      }
    };

    fetchData();
  }, []);

  return (
    <section className="driversWrapper">
      {" "}
      {/* Updated class name */}
      <PageHeader headerTitle={"Drivers"} isBtn={false} />{" "}
      {/* Updated header title */}
      <div className="productTableWtapper">
        {" "}
        {/* Updated class name */}
        {drivers.isLoading ? (
          <TableLoader />
        ) : (
          <EnhancedTable
            tableHeader={DriverTableHeader}
            tableData={drivers.data}
            tableTitle="Drivers"
          />
        )}
      </div>
    </section>
  );
};

export default Drivers; // Updated export name
