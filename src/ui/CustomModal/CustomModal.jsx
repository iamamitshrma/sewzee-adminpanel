import { Modal, Backdrop } from '@mui/material';


const CustomModal = ({ open, handleClose, children }) => {
 
    return (
        <Modal
            open={open}
            onClose={handleClose}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            {children}
        </Modal>
    )
}

export default CustomModal