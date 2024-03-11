

import "./Dashboard.css"

// components
import DahboardHeader from "../../components/Dashboard/DahboardHeader/DahboardHeader"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDahboardDataThunk, getDahboardRefreshThunk } from "../../store/actions/dashboardActions/dashboardAction"
import { clearDashboardError } from "../../store/slices/dashboardSlices/dashboardSlice"
import { toast } from "react-hot-toast"

const Dashboard = () => {
    const dispatch = useDispatch()
    const { dashboard } = useSelector((state) => state);
    const [toggleType, setToggleType] = useState("weekly")


    const handleRefresh = () => {
        dispatch(getDahboardRefreshThunk(toggleType))
    }

    useEffect(() => {
        dispatch(getDahboardDataThunk(toggleType))
    }, [toggleType])

    useEffect(() => {

        if (dashboard.error.isError) {
            toast.error(dashboard.error.msg);
            dispatch(clearDashboardError())
        }
    }, [dashboard.error]);

    return (
        <div className="dashboardWrapper">
            <DahboardHeader toggleType={toggleType} setToggleType={setToggleType} handleRefresh={handleRefresh} />
        </div>
    )
}

export default Dashboard