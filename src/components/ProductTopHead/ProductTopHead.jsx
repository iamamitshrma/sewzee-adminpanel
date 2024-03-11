import "./ProductTopHead.css"

const ProductTopHead = ({ title, isbtn, handleClick }) => {
    return (
        <div className="productTopHeadWrapper">
            <h6>{title}</h6>
            {isbtn && <p className="productTopHeadBtn" onClick={() => handleClick()} >+ Add more Variants </p>}
        </div>
    )
}

export default ProductTopHead