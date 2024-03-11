import "./Users.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import { EnhancedTable } from "../../components/Table/Table";
import { UserTableHeader } from "../../constants/TableHeader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsersThunk } from "../../store/actions/usersActions/usersAction";
import { TableLoader } from "../../ui/SkeltonLoader/SkeltonLoader";

const Users = () => {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state);

    useEffect(() => {
        dispatch(
            getUsersThunk({
                search: "",
                from: "",
                to: "",
            })
        );
    }, []);

    console.log("users", users);
    return (
        <section className="usersWrapper">
            <PageHeader headerTitle={"Users"} isBtn={false} />
            <div className="usersWtapper">
                {users?.isLoading ? (
                    <TableLoader />
                ) : (
                    <EnhancedTable
                        tableHeader={UserTableHeader}
                        tableData={users?.users}
                        tableTitle="Users"
                        isCustomToolbar={false}
                    />
                )}
            </div>
        </section>
    );
};

export default Users;
