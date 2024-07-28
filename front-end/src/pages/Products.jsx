import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaUserCircle } from 'react-icons/fa';
import { Sidebar } from '../components/Sidebar';
import LogoutModal from '../components/LogoutModal';
import { Link } from 'react-router-dom';

export const Products = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };

  useEffect(() => {
    axios.get('/api/products')
      .then(response => {
        if (Array.isArray(response.data)) {
          setProduct(response.data);
        } else {
          setProduct([]);  // Handle case where response data is not an array
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the Product!", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/product/${id}`)
      .then(response => {
        setProduct(product.filter(product => product.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the product!", error);
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
          <div className="category-page">
            <div className="header1">
              <h2>Category</h2>
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
                    product.map(products => (
                    <tr key={products.id}>
                      <td>{products.id}</td>
                      <td>{products.name}</td>
                      <td>{products.subCategory}</td>
                      <td>{products.category}</td>
                      <td className={products.status === 'Active' ? 'status-active' : 'status-inactive'}>{products.status}</td>
                      <td>
                        <button className="action-btn">
                          <FaEdit />
                        </button>
                        <button className="action-btn" onClick={() => handleDelete(products.id)}>
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

