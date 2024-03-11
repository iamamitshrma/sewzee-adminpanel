import React, { useState, useEffect } from "react";
import API from "../../services/common";
import "./Brands.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import { EnhancedTable } from "../../components/Table/Table";
import { BrandTableHeader } from "../../constants/TableHeader";
import { TableLoader } from "../../ui/SkeltonLoader/SkeltonLoader";

const Brands = () => {
  const [brands, setBrands] = useState({
    isLoading: true,
    data: [],
  });
  console.log("brands", brands);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await API.get("https://api.sewzee.shop/api/admin/brands?search=&from&to");

        setBrands({
          isLoading: false,
          data: response.data.data,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setBrands({
          isLoading: false,
          data: [],
        });
      }
    };

    fetchData();
  }, []);

  return (
    <section className="brandsWrapper">
      <PageHeader headerTitle={"Brands"} isBtn={false} />
      <div className="productTableWtapper">
        {brands.isLoading ? (
          <TableLoader />
        ) : (
          <EnhancedTable
            tableHeader={BrandTableHeader}
            tableData={brands.data}
            tableTitle="Brands"
            isCustomToolbar={false}
          />
        )}
      </div>
    </section>
  );
};

export default Brands;
