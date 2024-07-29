import React, { useState } from 'react';
import './AddCategory.css';
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserCircle } from 'react-icons/fa';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from './store/Auth';
import { useNavigate } from 'react-router-dom';


export const AddCategory = () => {

  const [category, setCategory] = useState({
    categoryName:"",
    categorySequence:"",
    status:"Active",
    image:""
  });

  const { authorizationToken } = useAuth();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };

  const handleInput= (e)=>(
    setCategory({
      ...category,
      [e.target.name]: e.target.value
    })
  )

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategory({
        ...category,
        [e.target.name]:e.target.files[0],
      });
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API call to save the category
        const response = await axios.post("http://localhost:5000/api/admin/save-category", category, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: authorizationToken
            }
        });
        const res_data = response.data;
        if( response.status == '201' ){
            toast.success("Category Added successful");
            setCategory({
              categoryName:"",
              categorySequence:"",
              status:"Active",
              image:""
            })
            navigate("/category")
        }else{
            toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        }
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
          <div className="add-category-page">
           <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h2>Add Category</h2>
                </div>
                
            </div>
           </div>
            <form onSubmit={handleSubmit} className="add-category-form">
              <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="categoryName">Category Name</label>
                        <input
                            type="text"
                            id="categoryName"
                            name='categoryName'
                            value={category.categoryName}
                            onChange={handleInput}
                            required
                        />
                    </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="categorySequence">Category Sequence</label>
                    <input
                    type="number"
                    id="categorySequence"
                    name='categorySequence'
                    value={category.categorySequence}
                    onChange={handleInput}
                    required
                    />
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="imageUpload">Upload Image</label>
                    <input
                    type="file"
                    id="imageUpload"
                    name='image'
                    accept="image/*"
                    required
                    onChange={handleImageUpload}
                    />
                  </div>
                </div>
                <div className="col-md-6"><br />
                    <h5>Upload Image</h5>
                    {image && <img src={image} alt="Category Preview" className="image-preview" />}
                </div>
              
              </div>
              
              <div className="form-buttons">
                <button type="button" className="cancel-button" onClick={() => window.history.back()}>Cancel</button>
                <button type="submit" className="save-button">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showLogoutModal && <LogoutModal toggleModal={toggleLogoutModal} />}
    </div>
  );
};

