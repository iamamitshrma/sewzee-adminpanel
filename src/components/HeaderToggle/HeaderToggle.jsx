import "./HeaderToggle.css";

const HeaderToggle = ({ toggleList, handleToggle, toggleType }) => {
    return (
        <div className="headerToggleWrapper">
            <div className="headerToggle">
                {toggleList.map((item) => (
                    <div
                        onClick={() => handleToggle(item)}
                        key={item}
                        className={`headerToggleItem ${
                            item === toggleType && "activeToggle"
                        }`}
                    >
                        <p>{item}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HeaderToggle;
