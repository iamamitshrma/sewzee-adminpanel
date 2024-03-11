import { Toaster } from "react-hot-toast"

const ToastContainer = () => {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
        />
    )
}

export default ToastContainer