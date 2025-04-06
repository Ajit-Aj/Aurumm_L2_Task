import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const res = await axiosInstance.post('/auth/login', { email, password });
            const token = res.data.token;

            const decodeToken = (token) => {
                const payload = token.split('.')[1];
                const decodedPayload = JSON.parse(atob(payload));
                return decodedPayload;
            };

            const decoded = decodeToken(token);
            const role = decoded.role;
            login(token, role);

            toast.success('Logged in successfully!');
            // setTimeout(() => {
            navigate('/', { replace: true });
            window.location.reload()
            // }, 700);
        } catch (err) {
            toast.error('Login failed. Check your credentials.');
        }
    };



    const validate = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter a valid email';
        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4 shadow-sm">
                        <h3 className="mb-4 text-center">Login</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="Enter email"
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>

                            <div className="mb-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter password"
                                />
                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                            </div>

                            <p className="text-center mt-3">
                                Don&apos;t have an account? <a href="/register">Register</a>
                            </p>

                            <button style={{ backgroundColor: '#d7b56d' }} type="submit" className="btn text-white w-100">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
