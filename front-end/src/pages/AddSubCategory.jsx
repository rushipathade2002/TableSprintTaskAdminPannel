import React, { useState } from 'react';
import './AddSubCategory.css';
import { FaUserCircle } from 'react-icons/fa';
import { Sidebar } from '../components/Sidebar';
import logo from "../assets/imges/logo.jpg";


export const AddSubCategory = () => {
  const [category, setCategory] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [subCategorySequence, setSubCategorySequence] = useState('');
  const [image, setImage] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);


  const toggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category', category);
    formData.append('subCategoryName', subCategoryName);
    formData.append('subCategorySequence', subCategorySequence);
    if (image) {
      formData.append('image', image);
    }

    console.log(formData);

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
                        <h2>Add Sub Category</h2>
                    </div>
                    <div className="col-md-12"></div>
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Select Category Name</option>
                            <option value="Ghee & Oil">Ghee & Oil</option>
                            <option value="Tea">Tea</option>
                            {/* Add more options as needed */}
                        </select>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Sub category name</label>
                        <input
                            type="text"
                            placeholder="Enter Sub Category Name"
                            value={subCategoryName}
                            onChange={(e) => setSubCategoryName(e.target.value)}
                        />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Sub Category Sequence</label>
                        <input
                            type="number"
                            placeholder="Enter Sequence"
                            value={subCategorySequence}
                            onChange={(e) => setSubCategorySequence(e.target.value)}
                        />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <label htmlFor="imageUpload">Upload Image</label>
                            <input
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            onChange={handleImageUpload}
                            />
                        </div>
                        </div>
                        <div className="col-md-3"><br />
                            <h5>Upload Image</h5>
                            {image && <img src={image} alt="Category Preview" className="image-preview" />}
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


