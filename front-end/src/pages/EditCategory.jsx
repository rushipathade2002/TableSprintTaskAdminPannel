import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import './EditCategory.css';
import { toast } from "react-toastify";
import { FaUserCircle } from 'react-icons/fa';
import LogoutModal from '../components/LogoutModal';
import { useAuth } from './store/Auth';

export const EditCategory = () => {
  const { id } = useParams();
  const { authorizationToken } = useAuth();
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    categoryName: '',
    categorySequence: '',
    status: 'Active',
    image: '',
  });
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const URL_BASE = "http://localhost:5000/";

  useEffect(() => {
    getCategoryById();
  }, []);

  const getCategoryById = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/category/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCategory(data);
        if (data.image) {
          setImagePreview(`${URL_BASE}${data.image}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => (
    setCategory({
      ...category,
      [e.target.name]: e.target.value
    })
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(window.URL.createObjectURL(file)); // Correctly referencing window.URL
      setCategory({
        ...category,
        image: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('categoryName', category.categoryName);
    formData.append('categorySequence', category.categorySequence);
    formData.append('status', category.status);
    if (category.image instanceof File) {
      formData.append('image', category.image);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/admin/category/update/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: authorizationToken
        },
        body: formData,
      });

      const res_data = await response.json();
      if (response.ok) {
        toast.success("Category updated successfully");
        setCategory({
          categoryName: "",
          categorySequence: "",
          status: "Active",
          image: ""
        });
        setImagePreview(null);
        navigate("/category");
      } else {
        toast.error(res_data.message || "Update failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while updating the category");
    }
  };

  const toggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <header className="header">
          <div className="logo"></div>
          <div className="user-icon" onClick={toggleLogoutModal}>
            <FaUserCircle size={30} color="white" />
          </div>
        </header>
        <div className="content">
          <div className="edit-category-page">
            <h2>Edit Category</h2>
            <div className="container">
              <form onSubmit={handleSubmit} className="edit-category-form" encType="multipart/form-data">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name">Category Name</label>
                      <input
                        type="text"
                        id="name"
                        name="categoryName"
                        value={category.categoryName}
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
                        name="categorySequence"
                        value={category.categorySequence}
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
                        id="imageUpload"
                        name="image"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      {imagePreview && <img src={imagePreview} alt={category.categoryName} className="category-image" />}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-actions">
                      <button type="button" className="cancel-button" onClick={() => navigate('/category')}>Cancel</button>
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
