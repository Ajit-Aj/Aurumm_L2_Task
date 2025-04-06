import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { MdAddToPhotos } from "react-icons/md";
import "./Product.css"


const Products = () => {
    const [products, setProducts] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('cards');
    const { user } = useAuth();

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const limit = 20;



    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get('/products', {
                params: { page, limit, search, sortField, sortOrder }
            });
            setProducts(res.data.products);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            toast.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page, search, sortField, sortOrder]);

    const confirmDelete = async () => {
        try {
            await axiosInstance.delete(`/products/${deleteId}`);
            toast.success('Product deleted successfully');
            fetchProducts();
        } catch (err) {
            toast.error('Failed to delete product');
        } finally {
            setShowModal(false);
            setDeleteId(null);
        }
    };

    const convertBufferToBase64 = (bufferObj) => {
        if (!bufferObj || !bufferObj.data) return null;
        try {
            const mimeType = 'image/jpeg';
            const base64 = btoa(String.fromCharCode(...new Uint8Array(bufferObj.data)));
            return `data:${mimeType};base64,${base64}`;
        } catch (err) {
            console.error('Error converting buffer to base64:', err);
            return null;
        }
    };

    const getImageSrc = (product) => {
        const buffer = product?.imageBuffer;
        if (buffer?.data && Array.isArray(buffer.data)) return convertBufferToBase64(buffer);
        if (product.image) return `http://localhost:5000/uploads/${product.image}`;
        return 'https://via.placeholder.com/400x200.png?text=No+Image';
    };

    return (
        <div className="container mt-4">
            <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="mb-0">Jewellery Products</h2>
                    {user?.role !== 'user' && (
                        <Link to="/add" className="btn text-white d-flex align-items-center gap-2" style={{ backgroundColor: '#d7b56d', fontWeight: "600" }}>
                            <MdAddToPhotos size={20} />
                            Add Product
                        </Link>
                    )}
                </div>

                <div className="row mb-4  bg-white py-3 shadow-sm" style={{ top: '70px', }}>
                    <div className="col-md-4 mb-2 mb-md-0">
                        <input
                            type="text"
                            placeholder="Search by name/category/description"
                            className="form-control"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                        />
                    </div>

                    <div className="col-md-3 mb-2 mb-md-0">
                        <select
                            className="form-select"
                            value={sortField}
                            onChange={(e) => setSortField(e.target.value)}
                        >
                            <option value="name">Sort by Name</option>
                            <option value="category">Sort by Category</option>
                            <option value="price">Sort by Price</option>
                        </select>
                    </div>

                    <div className="col-md-2 mb-2 mb-md-0">
                        <select
                            className="form-select"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>

                    <div className="col-md-3 d-flex justify-content-md-end justify-content-start mt-2 mt-md-0">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <button
                                    className="nav-link border-0"
                                    onClick={() => setActiveTab('cards')}
                                    style={{
                                        color: activeTab === 'cards' ? '#d7b56d' : 'grey',
                                        fontWeight: activeTab === 'cards' ? '600' : 'normal',
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    Card View
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="nav-link border-0"
                                    onClick={() => setActiveTab('table')}
                                    style={{
                                        color: activeTab === 'table' ? '#d7b56d' : 'grey',
                                        fontWeight: activeTab === 'table' ? '600' : 'normal',
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    Table View
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {
                loading ? (
                    <div className="text-center mt-5">
                        <div className="spinner-border text-warning" role="status"></div>
                        <p className="text-muted mt-3">Loading products...</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center mt-5">
                        <img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" width="150" className="mb-3" />
                        <p className="text-muted">No products available.</p>
                    </div>
                ) : (
                    <>
                        {activeTab === 'cards' ? (
                            <div className="row">
                                {products.map((p, index) => (
                                    <div
                                        className="col-md-4 col-sm-6 mb-4"
                                        key={p._id}
                                        data-aos="fade-up"
                                        data-aos-delay={`${index * 100}`}
                                    >
                                        <div className="card h-100 shadow-sm card-hover-gold" >
                                            <div
                                                style={{
                                                    width: '100%',
                                                    height: '200px',
                                                    overflow: 'hidden',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: '#f9f9f9',
                                                }}
                                            >
                                                <img
                                                    src={getImageSrc(p)}
                                                    alt={p.name}
                                                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                                                />
                                            </div>
                                            <div className="card-body d-flex flex-column">
                                                <h5 className="card-title">{p.name}</h5>
                                                <h6 className="card-subtitle mb-2 text-muted">{p.category}</h6>
                                                <p className="card-text">
                                                    <strong>Price:</strong> ₹{p.price}<br />
                                                    <strong>Stock:</strong> {p.stock}<br />
                                                    <strong>Manufacture Date:</strong> {new Date(p.manufactureDate).toLocaleDateString()}<br />
                                                    <strong>Description:</strong> {p.description}
                                                </p>
                                                {user?.role !== 'user' && (
                                                    <td>
                                                        <Link to={`/edit/${p._id}`} className="text-warning me-3" title="Edit">
                                                            <FaEdit size={18} />
                                                        </Link>
                                                        <span
                                                            role="button"
                                                            className="text-danger"
                                                            onClick={() => {
                                                                setDeleteId(p._id);
                                                                setShowModal(true);
                                                            }}
                                                            title="Delete"
                                                        >
                                                            <FaTrash size={18} />
                                                        </span>
                                                    </td>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Category</th>
                                            <th>Price</th>
                                            <th>Stock</th>
                                            <th>Manufacture Date</th>
                                            <th>Description</th>
                                            {user?.role !== 'user' && <th>Actions</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(p => (
                                            <tr key={p._id}>
                                                <td>
                                                    <img
                                                        src={getImageSrc(p)}
                                                        alt={p.name}
                                                        width="60"
                                                        height="60"
                                                        style={{ objectFit: 'cover', borderRadius: '8px' }}
                                                    />
                                                </td>
                                                <td>{p.name}</td>
                                                <td>{p.category}</td>
                                                <td>₹{p.price}</td>
                                                <td>{p.stock}</td>
                                                <td>{new Date(p.manufactureDate).toLocaleDateString()}</td>
                                                <td>{p.description}</td>
                                                {user?.role !== 'user' && (
                                                    <td className="d-flex gap-3">
                                                        <Link to={`/edit/${p._id}`} title="Edit" className="text-warning">
                                                            <FaEdit size={18} style={{ cursor: 'pointer' }} />
                                                        </Link>
                                                        <span
                                                            title="Delete"
                                                            className="text-danger"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => {
                                                                setDeleteId(p._id);
                                                                setShowModal(true);
                                                            }}
                                                        >
                                                            <FaTrash size={18} />
                                                        </span>
                                                    </td>

                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Pagination Controls */}
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <p className="mb-0">Page {page} of {totalPages}</p>
                                    <div>
                                        <button
                                            className="btn btn-sm btn-outline-secondary me-2"
                                            disabled={page === 1}
                                            onClick={() => setPage(p => Math.max(p - 1, 1))}
                                        >Previous</button>
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            disabled={page === totalPages}
                                            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                                        >Next</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )
            }

            {
                showModal && (
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirm Deletion</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to delete this product?</p>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default Products;
