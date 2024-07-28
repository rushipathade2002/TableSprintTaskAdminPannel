import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Sidebar } from '../components/Sidebar';
import './EditCategory.css';
import logo from "../assets/imges/logo.jpg";
import { FaUserCircle } from 'react-icons/fa';
import LogoutModal from '../components/LogoutModal';

export const EditProduct = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [category, setCategory] = useState({
    name: '',
    sequence: '',
    status: 'Active',
    image: '',
  });
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    axios.get(`/api/categories/${id}`)
      .then(response => {
        setCategory(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the category data!", error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleImageChange = (e) => {
    setCategory({ ...category, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/categories/${id}`, category)
      .then(() => {
        history('/category');
      })
      .catch(error => {
        console.error("There was an error updating the category!", error);
      });
  };

  const toggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <header className="header">
          <div className="logo"><img src={logo} alt="logo" height={50} /></div>
          <div className="user-icon" onClick={toggleLogoutModal}>
            <FaUserCircle size={30} color="white" />
          </div>
        </header>
        <div className="content">
          <div className="edit-category-page">
            <h2>Edit Category</h2>
            <div className="container">
            <form onSubmit={handleSubmit} className="edit-category-form">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="name">Category Name</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    value={category.name}
                    onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="sequence">Category Sequence</label>
                    <input
                    type="number"
                    id="sequence"
                    name="sequence"
                    value={category.sequence}
                    onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                    id="status"
                    name="status"
                    value={category.status}
                    onChange={handleInputChange}
                    >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    </select>
                </div>
              </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="image">Upload Image</label>
                    <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    />
                    {category.image && <img src={category.image} alt="Category" className="preview-image" />}
                  </div>
                </div>
                <div className="col-md-12">
                    <div className="form-actions">
                        <button type="button" className="cancel-button" onClick={() => history('/category')}>Cancel</button>
                        <button type="submit" className="save-button">Save</button>
                    </div>
                </div>
              </div> 
            </form>
            </div>
            
          </div>
        </div>
      </div>
      {showLogoutModal && <LogoutModal toggleModal={toggleLogoutModal} />}
    </div>
  );
};

