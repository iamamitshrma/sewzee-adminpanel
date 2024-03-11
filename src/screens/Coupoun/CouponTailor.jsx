import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import "./Coupoun.css"
import PageHeader from "../../components/PageHeader/PageHeader";
const CouponTailor = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5; 
  const [open, setOpen] = useState(false);
  const [couponData, setCouponData] = useState({
    code: "",
    title: "",
    description: "",
    discount: 10,
    type: "percentage",
    used_limit: 10,
    validity: "YYYY-MM-DD",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get("https://api.sewzee.shop/api/admin/tailorcoupon", { headers })
      .then((response) => {
        setCoupons(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); 
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateCoupon = () => {
    // Make the API call to create the coupon using the couponData state
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .post("https://api.sewzee.shop/api/admin/tailorcoupon", couponData, {
        headers,
      })
      .then((response) => {
        // Handle successful response, e.g., show a success message
        console.log("Coupon created successfully!");
        // If the API response contains the new coupon data, add it to the table
        toast.success(`Coupount created successfully for ${code} and discount ${discount}`)
        setCoupons((prevCoupons) => [...prevCoupons, response.data]);
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error("Error creating coupon:", error);
      });
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCouponData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { code, title, description, discount, type, used_limit, validity } =
    couponData;

  // Calculate the index of the first and last item to be displayed on the current page
  const lastIndex = page * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  return (
    <>
    <div className="couponWrapper">
       <PageHeader headerTitle={"Coupons for Tailors"} isBtn={false} />
      
      {loading ? (
        <p>Loading user data...</p>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Validity</TableCell>
                  <TableCell>Discount</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coupons.slice(firstIndex, lastIndex).map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell>{coupon.id}</TableCell>
                    <TableCell>{coupon.code}</TableCell>
                    <TableCell>{coupon.title}</TableCell>
                    <TableCell>{coupon.description}</TableCell>
                    <TableCell>{coupon.validity}</TableCell>
                    <TableCell>{coupon.discount}</TableCell>
                    <TableCell>{coupon.type}</TableCell>
                    <TableCell>{coupon.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={Math.ceil(coupons.length / itemsPerPage)}
            page={page}
            onChange={handleChangePage}
          />
          {/* Modal for creating a new coupon */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create Coupon</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Code"
                name="code"
                value={code}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Title"
                name="title"
                value={title}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Description"
                name="description"
                value={description}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Discount"
                name="discount"
                type="number"
                value={discount}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Type"
                name="type"
                value={type}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Used Limit"
                name="used_limit"
                type="number"
                value={used_limit}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Validity"
                name="validity"
                value={validity}
                onChange={handleInputChange}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleCreateCoupon} color="primary">
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
    <Button variant="contained" sx={{width:"200px",marginLeft:'1000px'}}onClick={handleClickOpen}>
    Create Coupon
  </Button>
  </>
  );
};

export default CouponTailor;
