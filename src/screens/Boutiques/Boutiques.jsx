import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Boutiques.css"; // Updated CSS file name
import PageHeader from "../../components/PageHeader/PageHeader";
import { EnhancedTable } from "../../components/Table/Table";
import { BoutiqueTableHeader } from "../../constants/TableHeader";
import { TableLoader } from "../../ui/SkeltonLoader/SkeltonLoader";

const Boutiques = () => {
    // Updated component name
    const [boutiques, setBoutiques] = useState({
        // Updated state variable name
        isLoading: true,
        data: [],
    });
    console.log("boutiques", boutiques); // Updated console log

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const response = await axios.get(
                    "https://sewzee.onrender.com/api/admin/boutiques?search=&from&to", // Updated API endpoint
                    { headers }
                );

                setBoutiques({
                    // Updated state variable name
                    isLoading: false,
                    data: response.data.data,
                });
            } catch (error) {
                console.error("Error fetching data:", error);
                setBoutiques({
                    // Updated state variable name
                    isLoading: false,
                    data: [],
                });
            }
        };

        fetchData();
    }, []);
    const tableData = boutiques.data.map((boutique) => ({
        id: boutique.id,
        name: boutique.name,
        tagline: boutique.tagline,
        logo: boutique.logo,
        contactDetails: boutique.contactDetails,
    }));

    return (
        <section className="boutiqueWrapper">
            {" "}
            {/* Updated class name */}
            <PageHeader headerTitle={"Boutiques"} isBtn={false} />{" "}
            {/* Updated header title */}
            <div className="productTableWtapper">
                {" "}
                {/* Updated class name */}
                {boutiques.isLoading ? (
                    <TableLoader />
                ) : (
                    <EnhancedTable
                        tableHeader={BoutiqueTableHeader}
                        tableData={boutiques.data}
                        tableTitle="Boutiques"
                        isCustomToolbar={false}
                    />
                )}
            </div>
        </section>
    );
};

export default Boutiques; // Updated export name
