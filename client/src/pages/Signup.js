import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Signup() {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/auth/signup`, { name, email, password });
      toast.success('Signup successful! Please sign in.');
      navigate('/signin');
    } catch (err) {
      if (err.response && err.response.status === 403) {
        toast.error('Forbidden. You are not allowed to sign up.');
      } else {
        toast.error(err?.response?.data?.error || 'Failed to sign up.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          className="form-control"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Sign Up</button>
    </form>
  );
}
