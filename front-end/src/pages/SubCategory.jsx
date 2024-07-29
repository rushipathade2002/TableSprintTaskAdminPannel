import React, { useState, useEffect } from 'react';
import { Link, useNavigate,  } from 'react-router-dom';
import axios from 'axios';
import { Sidebar } from '../components/Sidebar';
import './SubCategory.css';
import { toast } from "react-toastify";
import { FaUserCircle, FaTrashAlt, FaEdit } from 'react-icons/fa';
import LogoutModal from '../components/LogoutModal';
import { useAuth } from './store/Auth';



export const SubCategory = () => {
  const history = useNavigate();
  const {  authorizationToken } = useAuth();
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const URL = "http://localhost:5000/"


  useEffect(()=>{
        getAllSubCategories();
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
                setLoading(false)
              
    }

  const toggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };


  const deleteSubCategory=async (id)=>{
    try {
      const response = await fetch(`http://localhost:5000/api/admin/subcategory/delete/${id}`,{
            method:"DELETE",
            headers:{
                    "Content-Type":"application/json",
                    authorization:authorizationToken,
                    }
            });
            if(!response.success) {
                  toast.error(response.message);
                }
                getAllSubCategories();
                toast.success("Deleted Sub-Category Successfully");                                   
    } catch (error) {
        console.log(error);
    }
  }


  return (
    <>
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
          <div className="container">
          <div className="subcategory-page">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="page-title">Sub-Categories</h2>
                    </div>
                    <div className="col-md-6 d-flex justify-content-end">
                        <Link to="/add-subcategory" className="add-subcategory-button " style={{color:'white'}}>Add Sub Category</Link>
                    </div>
                </div>
            </div>
            <table className="subcategory-table table-hover table-active">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Sub Category name</th>
                  <th>Category name</th>
                  <th>Image</th>
                  <th>Status</th>
                  <th>Sequence</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                loading ? (
                    <tr>
                      <td colSpan="6">Loading...</td>
                    </tr>
                  ) : (
                    subCategories.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{"textAlign":"center","padding":"10px 0px 50px 0px ", "fontWeight":"bold"}}>No Data Found</td>
                    </tr>
                    ) : (
                subCategories.map((subCategory, index) => (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{subCategory.subCategoryName}</td>
                    <td>{subCategory.categoryName}</td>
                    <td>
                          {subCategory.image ? (
                            <img src={`${URL}${subCategory.image}`} alt={subCategory.subCategoryName} className="category-image" />
                          ) : (
                            "No Image"
                          )}
                    </td>
                    <td className={subCategory.status === 'Active' ? 'status-active' : 'status-inactive'}>{subCategory.status}</td>
                    <td>{subCategory.subCategorySequence}</td>
                    <td>
                        <button className="action-btn btn-success" onClick={() => history(`/edit-subCategory/${subCategory._id}`)}>
                            <FaEdit />
                        </button>
                        <button className="btn btn-danger" 
                                    onClick={()=>{
                                        if(window.confirm("Are you sure you want to Delete")){
                                                  deleteSubCategory(subCategory._id);    
                                    }
                              } }> <FaTrashAlt />
                        </button>
                    </td>
                  </tr>
                            )   )
                        )
                    )
                }
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>

      {showLogoutModal && <LogoutModal toggleModal={toggleLogoutModal} />}
      
    </div>
    </>
  );
};
