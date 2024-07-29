import React, { useEffect, useState } from 'react';
import './AddSubCategory.css';
import { FaUserCircle } from 'react-icons/fa';
import { Sidebar } from '../components/Sidebar';
import LogoutModal from '../components/LogoutModal';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './store/Auth';



export const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { authorizationToken } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    categoryName:"",
    subCategoryName:"",
    productName:"",
    status:"Active",
    image:""
  });


  const toggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };

  const handleInputChange = (e) => (
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setProduct({
        ...product,
        image: file,
      });
    }
  };
  useEffect(()=>{
        getAllSubCategories();
        getAllCategories();
    },[]);

    const getAllSubCategories = async()=>{
        const response = await fetch("http://localhost:5000/api/admin/subCategories", {
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    Authorization : authorizationToken
                },
            });
            const data = await response.json();
              if(response.ok){
                setSubCategories(data); 
              }              
    }

    const getAllCategories = async()=>{
      const response = await fetch("http://localhost:5000/api/admin/categories", {
             method:"GET",
             headers:{
                 "Content-Type":"application/json",
                 Authorization : authorizationToken
             },
         });
         const data = await response.json();
           if(response.ok){
             setCategories(data); 
           }           
 }

  const handleSubmit = (e) => {
    e.preventDefault();
    

    // API call to save the category
    // axios.post('/api/categories', formData)
    //   .then(response => {
    //     // Handle success
    //   })
    //   .catch(error => {
    //     // Handle error
    //   });
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
        <div className="add-sub-category-container">
            <div className="container">
                <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-12">
                        <h2> Add Sub Category </h2>
                    </div>
                    <div className="col-md-12"></div>
                    <div className="col-md-6">
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        id="Category"
                        name="categoryName"
                        value={product.categoryName}
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
                      <label>Sub Category</label>
                      <select
                        id="Category"
                        name="categoryName"
                        value={product.categoryName}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Category Name</option>
                        {
                          subCategories.length === 0 ? (
                            <option value="">Category Not Found</option>
                          ) : (
                            subCategories.map((subCategory, index) => (
                              <option value={subCategory.categoryName} key={index}>{subCategory.categoryName}</option>
                            ))
                          )
                        }
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="productName">Product Name</label>
                      <input
                        type="text"
                        placeholder="Enter Product Name"
                        id="productName"
                        name='productName'
                        value={product.productName}
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
                        value={product.status}
                        onChange={handleInputChange}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                    <div className="col-md-6">
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
                  <div className="col-md-6">
                      {imagePreview && <img src={imagePreview} alt="SubCategory Preview" className="image-preview w-100" />}
                  </div>

                    <div className="form-buttons">
                        <button type="button" className="cancel-button" onClick={() => window.history.back()}>Cancel</button>
                        <button type="submit" className="save-button">Save</button>
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


