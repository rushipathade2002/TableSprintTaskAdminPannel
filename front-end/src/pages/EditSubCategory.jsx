import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Sidebar } from '../components/Sidebar';
import './EditCategory.css';
import { toast } from "react-toastify";
import { FaUserCircle } from 'react-icons/fa';
import LogoutModal from '../components/LogoutModal';
import { useAuth } from './store/Auth';

export const EditSubCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authorizationToken } = useAuth();
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState({
    categoryName: "",
    subCategoryName: "",
    subCategorySequence: "",
    status: "Active",
    image: ""
  });
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const URL_BASE = "http://localhost:5000/";

  useEffect(() => {
    getAllCategories();
    getSubCategoryById();
  }, []);

  const getAllCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCategories(data);
      }
    } catch (error) {
      console.error("There was an error fetching the categories!", error);
    }
  };

  const getSubCategoryById = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/subCategory/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken
        },
      });
      const data = await response.json();
      if (response.ok) {
        setSubCategory(data);
        if (data.image) {
          setImagePreview(`${URL_BASE}${data.image}`);
        }
      }
    } catch (error) {
      console.error("There was an error fetching the subcategory data!", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubCategory({ ...subCategory, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(window.URL.createObjectURL(file));
      setSubCategory({
        ...subCategory,
        image: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('categoryName', subCategory.categoryName);
    formData.append('subCategoryName', subCategory.subCategoryName);
    formData.append('subCategorySequence', subCategory.subCategorySequence);
    formData.append('status', subCategory.status);
    if (subCategory.image instanceof File) {
      formData.append('image', subCategory.image);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/admin/subCategory/update/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: authorizationToken
        },
        body: formData,
      });

      const res_data = await response.json();
      if (response.ok) {
        toast.success("Subcategory updated successfully");
        setSubCategory({
          categoryName: "",
          subCategoryName: "",
          subCategorySequence: "",
          status: "Active",
          image: "",
        });
        setImagePreview(null);
        navigate("/subcategory");
      } else {
        toast.error(res_data.message || "Update failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while updating the subcategory");
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
            <h2>Edit Sub-Category</h2>
            <div className="container">
              <form onSubmit={handleSubmit} className="edit-category-form">
                <div className="row">
                  <div className="col-md-12"></div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        id="Category"
                        name="categoryName"
                        value={subCategory.categoryName}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Category Name</option>
                        {
                          categories.length === 0 ? (
                            <option value="">Category Not Found</option>
                          ) : (
                            categories.map((category, index) => (
                              <option value={category.categoryName} key={index}>{category.categoryName}</option>
                            ))
                          )
                        }
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Sub Category Sequence</label>
                      <input
                        type="number"
                        id="subCategorySequence"
                        name='subCategorySequence'
                        value={subCategory.subCategorySequence}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Sub-Category Name</label>
                      <input
                        type="text"
                        id="subCategoryName"
                        name='subCategoryName'
                        value={subCategory.subCategoryName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="status">Status</label>
                      <select
                        id="status"
                        name="status"
                        value={subCategory.status}
                        onChange={handleInputChange}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="imageUpload">Upload Image</label>
                      <input
                        type="file"
                        id="imageUpload"
                        name="image"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    {imagePreview && <img src={imagePreview} alt="SubCategory Preview" className="image-preview w-100" />}
                  </div>

                  <div className="col-md-12">
                    <div className="form-buttons">
                      <button type="button" className="cancel-button" onClick={() => window.history.back()}>Cancel</button>
                      <button type="submit" className="save-button">Update</button>
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
