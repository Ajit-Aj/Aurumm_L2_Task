import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-hot-toast';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
    category: '',
    manufactureDate: '',
  });

  useEffect(() => {
    axiosInstance
      .get(`/products/${id}`)
      .then((res) => {
        const productData = res.data;

        setForm({
          name: productData.name || '',
          price: productData.price || '',
          stock: productData.stock || '',
          description: productData.description || '',
          category: productData.category || '',
          manufactureDate: productData.manufactureDate
            ? productData.manufactureDate.slice(0, 10)
            : '',
        });
      })
      .catch((err) => {
        toast.error('Failed to fetch product data.');
      });
  }, [id]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/products/${id}`, form);
      toast.success('Product updated successfully!');
      navigate('/');
    } catch (err) {
      toast.error('Failed to update product.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h3 className="mb-4 text-center">Edit Product</h3>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">Product Name</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                className="form-control"
                placeholder="Enter product name"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="price" className="form-label">Price</label>
              <input
                id="price"
                name="price"
                value={form.price}
                onChange={handleChange}
                type="number"
                className="form-control"
                placeholder="Enter product price"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="stock" className="form-label">Stock</label>
              <input
                id="stock"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                type="number"
                className="form-control"
                placeholder="Enter product stock"
              />
            </div>

            <div className="col-md-12">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                className="form-control"
                rows="4"
                placeholder="Enter product description"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="category" className="form-label">Category</label>
              <input
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                type="text"
                className="form-control"
                placeholder="Enter product category"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="date" className="form-label">Manufacture Date</label>
              <input
                id="date"
                name="date"
                value={form.manufactureDate}
                onChange={handleChange}
                type="date"
                className="form-control"
              />
            </div>

            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary px-4 mt-3">
                Update Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
