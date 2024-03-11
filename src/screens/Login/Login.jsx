import { Form } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';



import "./Login.css"
import { sewzeeImages } from "../../assets"
import { CustomButton } from '../../ui/constants';
import { useEffect, useState } from 'react';

import { loginSewzeeThunk } from '../../store/actions/authActions/authaction';
import { clearAuthError } from '../../store/slices/authSlices/authSlice';

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const { auth } = useSelector((state) => state);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [inputData, setInputData] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    }

    const [isDisabled, setIsDisabled] = useState(false)


    const handleLogin = (e) => {
        e.preventDefault();
        setIsDisabled(true);
        dispatch(loginSewzeeThunk(inputData));
    }

    useEffect(() => {
        if (auth.token || token) {
            navigate("/dashboard");
        }

        if (auth.error.isError) {
            toast.error(auth.error.msg);
            setIsDisabled(false);
            dispatch(clearAuthError())
        }
    }, [token, auth.token, auth.error]);

    return (
        <div className="loginWrapper">
            <div className="loginLeft" data-aos="fade-left">
                <div className="loginLeftContainer">
                    <div className="loginLeftInfo">
                        <img src={sewzeeImages.sewzeeLogo} alt="sewzee Logo" />
                        <div className="d-flex flex-column">
                            <h6>Welcome Back</h6>
                            <p>Sewzee Admin Panel</p>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className='loginLeftInputsContainer'>
                        <Form.Group
                            className='loginLeftInput'
                        >
                            <TextField
                                onChange={handleChange}
                                id="email"
                                name="email"
                                size="small"
                                label="Email"
                                type="email"
                                required
                            />
                        </Form.Group>
                        <Form.Group
                            className='loginLeftInput'
                        >
                            <TextField
                                onChange={handleChange}
                                id="password"
                                name="password"
                                size="small"
                                label="Password"
                                required
                                type={`${passwordVisible ? "text" : "password"}`}
                            />
                            <div onClick={() => setPasswordVisible(!passwordVisible)} className="passwordToggle">
                                {
                                    passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />
                                }
                            </div>
                        </Form.Group>
                        <div className=''>
                            <CustomButton isDisabled={isDisabled} classId="loginBtn">{auth?.isLoading ? <CircularProgress sx={{ color: "white" }}
                                size={20} /> : "Log In"}</CustomButton>
                        </div>
                    </form>

                </div>
            </div>
            <div className="loginRight" data-aos="fade-right">
                <div className='loginRightContent'>
                    <p>Revolutionize Shopping:</p>
                    <h6>DISCOVER</h6>
                    <h6>LOCAL FASHION</h6>
                    <h6>GEMS</h6>
                </div>
            </div>
        </div>
    )
}

export default Login