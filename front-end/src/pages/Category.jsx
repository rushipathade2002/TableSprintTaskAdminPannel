import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaUserCircle } from 'react-icons/fa';
import { Sidebar } from '../components/Sidebar';
import LogoutModal from '../components/LogoutModal';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './store/Auth';



export const Category = () => {
  const {  authorizationToken } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const URL = "http://localhost:5000/uploads/"
  
  const toggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };


  useEffect(()=>{
    getAllCategories();
},[]);

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
            setLoading(false)
          
}

  const handleDelete = (id) => {
    axios.delete(`/api/categories/${id}`)
      .then(response => {
        setCategories(categories.filter(category => category.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the category!", error);
      });
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <header className="header">
          <div className="logo"></div>
          <div className="user-icon" onClick={toggleLogoutModal}>
            <FaUserCircle size={50} color="#fff" />
          </div>
        </header>
        <div className="content">
          <div className="category-page text-dark">
            <div className="header1">
              <h2>Category</h2>
              <Link to="/add-category" className='add-category'>Add Category</Link>
            </div>
            <table className="category-table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Category name</th>
                  <th>Image</th>
                  <th>Status</th>
                  <th>Sequence</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6">Loading...</td>
                  </tr>
                ) : (
                  categories.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{"textAlign":"center","padding":"10px 0px 50px 0px ", "fontWeight":"bold"}}>No Data Found</td>
                  </tr>
                  ) : (
                    categories.map((category,index) => (

                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{category.categoryName}</td>
                      <td>
                          {category.image ? (
                            <img src={`${URL}${category.image}`} alt={category.categoryName} className="category-image" />
                          ) : (
                            "No Image"
                          )}
                        </td>
                      {/* <td><img src={`http://localhost:5000/uploads/${category.image}`} alt={category.categoryName} className="category-image" /></td> */}
                      <td className={category.status === 'Active' ? 'status-active' : 'status-inactive'}>{category.status}</td>
                      <td>{category.categorySequence}</td>
                      <td>
                          <button className="action-btn" onClick={() => navigate(`/edit-category/${category._id}`)}>
                            <FaEdit />
                          </button>
                          <button className="action-btn" onClick={() => handleDelete(category._id)}>
                            <FaTrashAlt />
                          </button>
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showLogoutModal && <LogoutModal toggleModal={toggleLogoutModal} />}
    </div>
  );
};

