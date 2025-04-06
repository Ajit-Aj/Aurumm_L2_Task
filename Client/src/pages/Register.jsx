import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setForm({ ...form, role: checked ? 'admin' : 'user' });
    } else {
      setForm({ ...form, [name]: value });

      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Enter a valid email';
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axiosInstance.post('/auth/register', form);
      toast.success('Registered successfully! Please log in.');
      navigate('/login');
    } catch (err) {
      const message = err?.response?.data?.message;

      if (message === 'User already exists') {
        toast.error(message);
      } else {
        toast.error('Registration failed. Try again.');
      }
    }

  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h3 className="mb-4 text-center">Register</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Name</label>
                <input
                  name="name"
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="mb-3">
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email address"
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="registerAsAdmin"
                  checked={form.role === 'admin'}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="registerAsAdmin">
                  Register as admin
                </label>
              </div>

              <p className="text-center mt-3">
                Already have an account? <a href="/login">Login</a>
              </p>

              <button
                style={{ backgroundColor: '#d7b56d', color: 'white' }}
                type="submit"
                className="btn w-100"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
