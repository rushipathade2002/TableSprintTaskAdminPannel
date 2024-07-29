import React, { useEffect, useState } from 'react';
import './AddSubCategory.css';
import { FaUserCircle } from 'react-icons/fa';
import { Sidebar } from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './store/Auth';
import LogoutModal from '../components/LogoutModal';
import { toast } from 'react-toastify';
import axios from 'axios';

export const AddSubCategory = () => {
  const [subCategory, setSubCategory] = useState({
    categoryName: "",
    subCategoryName: "",
    subCategorySequence: "",
    status: "Active",
    image: ""
  });

  const [categories, setCategories] = useState([]);
  const { authorizationToken } = useAuth();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    getAllCategories();
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
      console.log(error);
    }
  };

  const handleInputChange = (e) => (
    setSubCategory({
      ...subCategory,
      [e.target.name]: e.target.value
    })
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setSubCategory({
        ...subCategory,
        image: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/admin/save-subcategory",subCategory, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: authorizationToken
      }
      });
  
      const res_data = await response.data;
      if (response.status == '201') {
        toast.success("Subcategory added successfully");
        setSubCategory({
          categoryName: "",
          subCategoryName: "",
          subCategorySequence: "",
          status: "Active",
          image: ""
        });
        setImagePreview(null);
        navigate("/subcategory");
      } else {
        toast.error(res_data.message || "Add failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while adding the subcategory");
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
          <div className="add-sub-category-page">
            <div className="container">
              <form onSubmit={handleSubmit} className="add-sub-category-form" encType="multipart/form-data">
                <div className="row">
                  <div className="col-md-12">
                    <h2>Add Sub Category</h2>
                  </div>

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
                      <label htmlFor="subCategoryName">Sub Category Name</label>
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

                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="imageUpload">Upload Image</label>
                      <input
                        type="file"
                        id="imageUpload"
                        name="image"
                        accept="image/*"
                        onChange={handleImageUpload}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                      {imagePreview && <img src={imagePreview} alt="SubCategory Preview" className="image-preview w-100" />}
                  </div>

                  <div className="col-md-12">
                    <div className="form-actions">
                      <button type="button" className="cancel-button" onClick={() => window.history.back()}>Cancel</button>
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
