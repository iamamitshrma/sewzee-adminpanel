import "./CustomButton.css"

const CustomButton = ({ children, classId, handleClick, isDesabled }) => {
    return (
        <button disabled={isDesabled} onClick={handleClick} type="submit" className={`customButton ${classId}`}>{children}</button>
    )
}

export default CustomButton;