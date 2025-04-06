
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axiosInstance from '../api/axiosInstance';
// import { toast } from 'react-hot-toast';
// import { useAuth } from '../context/AuthContext';

// const Products = () => {
//     const [products, setProducts] = useState([]);
//     const [deleteId, setDeleteId] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const { user } = useAuth();

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     const fetchProducts = async () => {
//         try {
//             const res = await axiosInstance.get('/products');
//             setProducts(res.data);
//         } catch (error) {
//             toast.error('Failed to fetch products');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const confirmDelete = async () => {
//         try {
//             await axiosInstance.delete(`/products/${deleteId}`);
//             toast.success('Product deleted successfully');
//             setProducts(prev => prev.filter(p => p._id !== deleteId));
//         } catch (err) {
//             toast.error('Failed to delete product');
//         } finally {
//             setShowModal(false);
//             setDeleteId(null);
//         }
//     };

//     const convertBufferToBase64 = (imageBuffer) => {
//         if (!imageBuffer?.data) return null;
//         const mimeType = 'image/jpeg';
//         const base64 = btoa(
//             String.fromCharCode(...new Uint8Array(imageBuffer.data))
//         );
//         return `data:${mimeType};base64,${base64}`;
//     };

//     const getImageSrc = (product) => {
//         if (product.imageBuffer?.data) {
//             return convertBufferToBase64(product.imageBuffer);
//         } else if (product.image) {
//             return `http://localhost:4000/uploads/${product.image}`;
//         } else {
//             return 'https://via.placeholder.com/400x200.png?text=No+Image';
//         }
//     };

//     return (
//         <div className="container mt-4">
//             <div className="d-flex justify-content-between align-items-center mb-4">
//                 <h2>Jewellery Products</h2>
//                 {user && user.role !== 'user' && (
//                     <Link to="/add" className="btn text-white" style={{ backgroundColor: '#d7b56d' }}>
//                         Add Product
//                     </Link>
//                 )}
//             </div>

//             {loading ? (
//                 <div className="text-center mt-5">
//                     <div className="spinner-border text-warning" role="status"></div>
//                     <p className="text-muted mt-3">Loading products...</p>
//                 </div>
//             ) : products.length === 0 ? (
//                 <div className="text-center mt-5">
//                     <img
//                         src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
//                         alt="No Products"
//                         width="150"
//                         className="mb-3"
//                     />
//                     <p className="text-muted">No products available. Please add some.</p>
//                 </div>
//             ) : (
//                 <div className="row">
//                     {products.map(p => (
//                         <div className="col-md-4 col-sm-6 mb-4" key={p._id}>
//                             <div className="card h-100 shadow-sm">
//                                 <img
//                                     src={getImageSrc(p)}
//                                     alt={p.name}
//                                     className="card-img-top"
//                                     style={{ height: '200px', objectFit: 'cover' }}
//                                 />
//                                 <div className="card-body d-flex flex-column">
//                                     <h5 className="card-title">{p.name}</h5>
//                                     <h6 className="card-subtitle mb-2 text-muted">{p.category}</h6>
//                                     <p className="card-text">
//                                         <strong>Price:</strong> ₹{p.price}<br />
//                                         <strong>Stock:</strong> {p.stock}<br />
//                                         <strong>Manufacture Date:</strong> {new Date(p.manufactureDate).toLocaleDateString()}<br />
//                                         <strong>Description:</strong> {p.description}
//                                     </p>
//                                     {user && user.role !== 'user' && (
//                                         <div className="mt-auto">
//                                             <Link to={`/edit/${p._id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
//                                             <button
//                                                 className="btn btn-danger btn-sm"
//                                                 onClick={() => {
//                                                     setDeleteId(p._id);
//                                                     setShowModal(true);
//                                                 }}
//                                             >
//                                                 Delete
//                                             </button>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {/* Delete Confirmation Modal */}
//             {showModal && (
//                 <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//                     <div className="modal-dialog modal-dialog-centered" role="document">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">Confirm Deletion</h5>
//                                 <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
//                             </div>
//                             <div className="modal-body">
//                                 <p>Are you sure you want to delete this product?</p>
//                             </div>
//                             <div className="modal-footer">
//                                 <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
//                                 <button className="btn btn-danger" onClick={confirmDelete}>Delete</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Products;














import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axiosInstance.get('/products');
            setProducts(res.data);
        } catch (error) {
            toast.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = async () => {
        try {
            await axiosInstance.delete(`/products/${deleteId}`);
            toast.success('Product deleted successfully');
            setProducts(prev => prev.filter(p => p._id !== deleteId));
        } catch (err) {
            toast.error('Failed to delete product');
        } finally {
            setShowModal(false);
            setDeleteId(null);
        }
    };

    const convertBufferToBase64 = (bufferObj) => {
        console.log(bufferObj, "BUFFEROBJ");
        if (!bufferObj || !bufferObj.data) return null;

        try {
            if (!bufferObj || !bufferObj.data || !Array.isArray(bufferObj.data)) {
                console.warn('Invalid buffer format:', bufferObj);
                return null;
            }
            const mimeType = 'image/jpeg';
            const base64 = btoa(
                String.fromCharCode(...new Uint8Array(bufferObj.data))
            );
            return `data:${mimeType};base64,${base64}`;
        } catch (err) {
            console.error('Error converting buffer to base64:', err);
            return null;
        }
    };

    const getImageSrc = (product) => {
        console.log(product, "PRODUCT");
        if (!product) return 'https://via.placeholder.com/400x200.png?text=No+Image';

        const buffer = product?.imageBuffer;

        if (buffer && buffer.data && Array.isArray(buffer.data)) {
            return convertBufferToBase64(buffer);
        } else if (product.image) {
            return `http://localhost:5000/uploads/${product.image}`;
        } else {
            return 'https://via.placeholder.com/400x200.png?text=No+Image';
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Jewellery Products</h2>
                {user && user.role !== 'user' && (
                    <Link to="/add" className="btn text-white" style={{ backgroundColor: '#d7b56d' }}>
                        Add Product
                    </Link>
                )}
            </div>

            {loading ? (
                <div className="text-center mt-5">
                    <div className="spinner-border text-warning" role="status"></div>
                    <p className="text-muted mt-3">Loading products...</p>
                </div>
            ) : products.length === 0 ? (
                <div className="text-center mt-5">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                        alt="No Products"
                        width="150"
                        className="mb-3"
                    />
                    <p className="text-muted">No products available. Please add some.</p>
                </div>
            ) : (
                <div className="row">
                    {products.map(p => (
                        <div className="col-md-4 col-sm-6 mb-4" key={p._id}>
                            <div className="card h-100 shadow-sm">
                                {/* Image Container */}
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
                                        style={{
                                            maxHeight: '100%',
                                            maxWidth: '100%',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </div>

                                {/* Product Content */}
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{p.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{p.category}</h6>
                                    <p className="card-text">
                                        <strong>Price:</strong> ₹{p.price}<br />
                                        <strong>Stock:</strong> {p.stock}<br />
                                        <strong>Manufacture Date:</strong> {new Date(p.manufactureDate).toLocaleDateString()}<br />
                                        <strong>Description:</strong> {p.description}
                                    </p>

                                    {user && user.role !== 'user' && (
                                        <div className="mt-auto">
                                            <Link to={`/edit/${p._id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => {
                                                    setDeleteId(p._id);
                                                    setShowModal(true);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            )}

            {/* Delete Confirmation Modal */}
            {showModal && (
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
            )}
        </div>
    );
};

export default Products;
