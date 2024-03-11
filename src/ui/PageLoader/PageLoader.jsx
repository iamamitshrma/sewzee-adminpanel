import "./PageLoader.css";

const PageLoader = () => {
    return (
        <div className="c-header">
            <div className="c-header-loader">
                <div className="c-slidingLoader">
                    <div className="c-slidingLoader-inner"></div>
                </div>
            </div>
        </div>
    );
};

export default PageLoader;
