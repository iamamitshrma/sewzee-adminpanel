import RefreshIcon from '@mui/icons-material/Refresh';
import { useSelector } from 'react-redux';


import "./DahboardHeader.css"


const DahboardHeader = ({ toggleType, setToggleType, handleRefresh }) => {
    const { dashboard } = useSelector((state) => state);
    return (
        <div className="dashboardTopBar">
            <div className='dashboardTopTitle'>
                <h6><span>Hey Admin,</span> Welcome to Sewzee administration</h6>
                <p>Here you can see all the stats.</p>
            </div>
            <div className='dashboardTopBarAction'>
                <RefreshIcon className={dashboard?.isRefreshing ? "refreshData" : "refreshDataOff"} onClick={handleRefresh} />
                {["Weekly", "Monthly"].map(item =>
                    <p
                        onClick={() => setToggleType(item.toLowerCase())}
                        className={toggleType === item.toLowerCase() && "active"}
                        key={item}>
                        {item}
                    </p>
                )}
            </div>
        </div>
    )
}

export default DahboardHeader