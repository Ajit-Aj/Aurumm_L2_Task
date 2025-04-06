import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-hot-toast';

const AddProduct = () => {
    const [form, setForm] = useState({
        name: '',
        price: '',
        stock: '',
        description: '',
        category: '',
        manufactureDate: '',
        image: null,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setForm({ ...form, image: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = 'Product name is required';
        if (!form.price || form.price <= 0) newErrors.price = 'Price must be greater than 0';
        if (!form.stock || form.stock < 0) newErrors.stock = 'Stock cannot be negative';
        if (!form.description.trim()) newErrors.description = 'Description is required';
        if (!form.category.trim()) newErrors.category = 'Category is required';
        if (!form.manufactureDate) newErrors.manufactureDate = 'Manufacture date is required';
        if (!form.image) newErrors.image = 'Image file is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const data = new FormData();
        for (let key in form) {
            data.append(key, form[key]);
        }

        try {
            await axiosInstance.post('/products', data);
            toast.success('Product added successfully!');
            setForm({
                name: '',
                price: '',
                stock: '',
                description: '',
                category: '',
                date: '',
                image: null,
            });
            setErrors({});
        } catch (err) {
            toast.error(' Failed to add product. Please try again.');
        }
    };


    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h3 className="mb-4 text-center">Add New Product</h3>
                <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <input
                                name="name"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                placeholder="Product Name"
                                value={form.name}
                                onChange={handleChange}
                            />
                            <div className="invalid-feedback">{errors.name}</div>
                        </div>

                        <div className="col-md-3">
                            <input
                                name="price"
                                type="number"
                                className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                placeholder="Price"
                                value={form.price}
                                onChange={handleChange}
                            />
                            <div className="invalid-feedback">{errors.price}</div>
                        </div>

                        <div className="col-md-3">
                            <input
                                name="stock"
                                type="number"
                                className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                                placeholder="Stock"
                                value={form.stock}
                                onChange={handleChange}
                            />
                            <div className="invalid-feedback">{errors.stock}</div>
                        </div>

                        <div className="col-md-12">
                            <textarea
                                name="description"
                                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                placeholder="Product Description"
                                value={form.description}
                                onChange={handleChange}
                                rows={3}
                            ></textarea>
                            <div className="invalid-feedback">{errors.description}</div>
                        </div>

                        <div className="col-md-6">
                            <input
                                name="category"
                                className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                                placeholder="Category"
                                value={form.category}
                                onChange={handleChange}
                            />
                            <div className="invalid-feedback">{errors.category}</div>
                        </div>

                        <input
                            name="manufactureDate"
                            type="date"
                            className={`form-control ${errors.manufactureDate ? 'is-invalid' : ''}`}
                            value={form.manufactureDate}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">{errors.manufactureDate}</div>


                        <div className="col-md-12">
                            <label className="form-label">Upload Product Image</label>
                            <input
                                name="image"
                                type="file"
                                className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                                onChange={handleChange}
                                accept="image/*"
                            />
                            <div className="invalid-feedback">{errors.image}</div>
                        </div>

                        <div className="col-12 text-end">
                            <button style={{ backgroundColor: '#d7b56d', color: "white", fontWeight: "600" }} type="submit" className="btn  px-4">
                                Add Product
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
