import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-hot-toast';
import { FiLogOut } from 'react-icons/fi';

const AppLayout = () => {
    const { user, setUser, logout } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await axiosInstance.get('/auth/me');
                setUser(res.data);
            } catch (error) {
                console.error('Failed to fetch user info:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);


    const navbarStyle = {
        backgroundColor: '#d7b56d',
        padding: '15px'
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark shadow-sm sticky-top" style={navbarStyle}>
                <div className="container">
                    <Link className="navbar-brand fw-bold" to="/">Aurumm</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarContent"
                        aria-controls="navbarContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Products</Link>
                            </li>

                            {user && user.role === 'admin' && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/add">Add Product</Link>
                                </li>
                            )}

                        </ul>

                        <div className="d-flex align-items-center gap-3 ms-auto">
                            {user ? (
                                <>
                                    <span className="text-light mb-0 fw-semibold">
                                        Hi, <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{user.name}</span>
                                    </span>
                                    <button onClick={logout} className="btn btn-outline-light d-flex align-items-center gap-2">
                                        <FiLogOut size={18} />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="btn btn-outline-light">Login</Link>
                                    <Link to="/register" className="btn btn-light">Register</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="container py-4">
                {loading ? <p>Loading user info...</p> : <Outlet />}
            </main>
        </div>
    );
};

export default AppLayout;
