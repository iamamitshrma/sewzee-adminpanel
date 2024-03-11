import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Notify from './Notification';
import EmailNotification from './EmailNotification';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ modalData }) {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  return (
    <div>
      <Button
        variant="contained"
        // size="small"
        onClick={handleOpen}
        style={{
          fontSize: "11px",
          height: "40px",
          padding: "12px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          background: "#7D5FFE",
          color: "#fff",
          marginRight: "10px",
          width: "130px",
        }}
      >
        Push Notification
      </Button>
      <Button
        variant="contained"
        size="small"
        onClick={handleOpen1}
        style={{
          fontSize: "11px",
          height: "40px",
          padding: "12px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          background: "#7D5FFE",
          color: "#fff",
          marginRight: "10px",
          width: "130px",
        }}
      >
        Email Notification
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Notify modalData={modalData} />
        </Box>
      </Modal>
      <Modal open={open1} onClose={handleClose1}>
        <Box sx={style}>
          <EmailNotification modalData={modalData} />
        </Box>
      </Modal>
    </div>
  );
}
