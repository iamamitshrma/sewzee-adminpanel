import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../components/PageHeader/PageHeader";
import "../Orders.css";
import OrderInfoHeader from "../../../components/OrderInfoHeader/OrderInfoHeader";
import { useEffect, useState } from "react";
import API from "../../../services/common";
import OrderPageHeader from "../../../components/PageHeader/OrderPageHeader";
import { SingleOrderTopLoader } from "../../../ui/SkeltonLoader/SkeltonLoader";
import OrderHeader from "../../../components/OrderHeader/OrderHeader";
import HeaderToggle from "../../../components/HeaderToggle/HeaderToggle";
import { SingleOrderToggleItems } from "../../../constants/ToggleItems";
import OrderDeatilsBody from "../../../components/OrderDeatilsBody/OrderDeatilsBody";
import Timeline from "../../../components/Orders/OrderTimeline/OrderTimeline";
import OrderTimeline from "../../../components/Orders/OrderTimeline/OrderTimeline";

const SingleMarketPlaceOrders = () => {
    const { orderId } = useParams();
    const [toggleType, setToggleType] = useState("Order Details");
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState({
        isLoading: true,
        data: [],
    });

    const fetchData = async () => {
        try {
            const response = await API.get(`api/admin/order/${orderId}`);
            setOrderData({
                isLoading: false,
                data: response?.data?.data,
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            setOrderData({
                isLoading: false,
                data: [],
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleToggle = (type) => {
        setToggleType(type);
    };

    return (
        <div className="ordersWrapper">
            <OrderPageHeader
                headerTitle={"Back"}
                type="back"
                handleBack={() => navigate("/orders/marketplace")}
            />
            {orderData.isLoading ? (
                <SingleOrderTopLoader />
            ) : (
                <OrderInfoHeader
                    orderInfo={{
                        orderId: orderData.data?.id,
                        customerName: orderData?.data?.cname,
                        status: orderData?.data?.status,
                    }}
                />
            )}
            <HeaderToggle
                toggleList={SingleOrderToggleItems}
                handleToggle={handleToggle}
                toggleType={toggleType}
            />
            <OrderDeatilsBody>
                {toggleType === "Timeline" && (
                    <OrderTimeline timelineData={orderData?.data?.timeline} />
                )}
            </OrderDeatilsBody>
        </div>
    );
};

export default SingleMarketPlaceOrders;
