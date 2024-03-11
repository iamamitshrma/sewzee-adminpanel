import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { memo } from "react";

// local imports
import "./Table.css";

import CustomToolbarAutoComplete from "../CustomToolbar/CustomToolbarAutoComplete";

// Options for the table
const options = {
    filterType: "checkbox",
};

const Table = ({
    tableData,
    tableHeader,
    tableTitle,
    handleDelete,
    handlePageLimit,
    isCustomToolbar,
    setFilterCategory,
    filterCategory,
    customeClasses,
}) => {
    console.log("tableData", tableData);

    return (
        <Box>
            <MUIDataTable
                title={tableTitle}
                data={tableData}
                className={`tableWrapper ${
                    isCustomToolbar && "tableWrapper--autoComplete"
                } ${customeClasses}`}
                columns={tableHeader}
                options={{
                    ...options,
                    onRowsDelete: handleDelete,
                    onChangeRowsPerPage: handlePageLimit,
                    customToolbar: isCustomToolbar
                        ? () => (
                              <CustomToolbarAutoComplete
                                  setFilterCategory={setFilterCategory}
                                  filterCategory={filterCategory}
                              />
                          )
                        : null,
                }}
            />
        </Box>
    );
};

export const EnhancedTable = memo(Table);
