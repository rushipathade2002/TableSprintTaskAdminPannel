import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaUserCircle } from 'react-icons/fa';
import { Sidebar } from '../components/Sidebar';
import LogoutModal from '../components/LogoutModal';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useAuth } from './store/Auth';


export const Products = () => {
  const {  authorizationToken } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const URL = "http://localhost:5000/"


  const toggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };

  useEffect(()=>{
    getAllProducts();
  },[]);

const getAllProducts = async()=>{
     const response = await fetch("http://localhost:5000/api/admin/products", {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization : authorizationToken
            },
        });

        const data = await response.json();
          if(response.ok){
            setProduct(data); 
          }
            setLoading(false)    
}


    const deleteProduct=async (id)=>{
      try {
        const response = await fetch(`http://localhost:5000/api/admin/product/delete/${id}`,{
              method:"DELETE",
              headers:{
                      "Content-Type":"application/json",
                      authorization:authorizationToken,
                      }
                  });
              if(!response.success) {
                    toast.error(response.message);
                  }
                  getAllProducts();
                  toast.success("Deleted Product Successfully");                                   
      } catch (error) {
          console.log(error);
      }
    }

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
          <div className="category-page">
            <div className="header1">
              <h2>Product</h2>
              <Link to="/add-product" className='add-category'>Add Product</Link>
            </div>
            <table className="category-table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Product name</th>
                  <th>Sub Category</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6">Loading...</td>
                  </tr>
                ) : (
                  product.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{"textAlign":"center","padding":"10px 0px 50px 0px ", "fontWeight":"bold"}}>No Data Found</td>
                  </tr>
                  ) : (
                    product.map((products,index) => (
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{products.productName}</td>
                      <td>{products.subCategoryName}</td>
                      <td>{products.categoryName}</td>
                      <td className={products.status === 'Active' ? 'status-active' : 'status-inactive'}>{products.status}</td>
                      <td>
                          <button className="btn btn-success ml-1" onClick={() => navigate(`/edit-product/${products._id}`)}>
                              <FaEdit />
                          </button>
                          <button className="btn btn-danger ml-3" 
                                      onClick={()=>{
                                          if(window.confirm("Are you sure you want to Delete")){
                                                    deleteProduct(products._id);    
                                      }
                                } }> <FaTrashAlt />
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

