import "./OrderInfoHeader.css";

const OrderInfoHeader = ({ orderInfo }) => {
    return (
        <div className="orderInfoHeader">
            <h2>{orderInfo?.customerName}</h2>
            <p>Order Id - {orderInfo?.orderId}</p>
            <button className={orderInfo?.status}>{orderInfo?.status}</button>
        </div>
    );
};

export default OrderInfoHeader;
