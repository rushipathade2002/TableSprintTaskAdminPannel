import React, { useState, useEffect } from 'react';
import { Link, useNavigate,  } from 'react-router-dom';
import axios from 'axios';
import { Sidebar } from '../components/Sidebar';
import './SubCategory.css';
import { FaUserCircle, FaTrashAlt, FaEdit } from 'react-icons/fa';
import LogoutModal from '../components/LogoutModal';



export const SubCategory = () => {
  const history = useNavigate();
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    axios.get('/api/subcategories')
      .then(response => {
        if (Array.isArray(response.data)) {
            setSubCategories(response.data);
          } else {
            setSubCategories([]);  // Handle case where response data is not an array
          }
          setLoading(false);
        // setSubCategories(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the subcategory data!", error);
        setLoading(false);
      });
  }, []);

  const toggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };

  const toggleDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(!showDeleteModal);
  };

  const deleteSubCategory = () => {
    axios.delete(`/api/subcategories/${deleteId}`)
      .then(() => {
        setSubCategories(subCategories.filter(subCategory => subCategory.id !== deleteId));
        toggleDeleteModal(null);
      })
      .catch(error => {
        console.error("There was an error deleting the subcategory!", error);
      });
  };


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
                subCategories.map(subCategory => (
                  <tr key={subCategory.id}>
                    <td>{subCategory.id}</td>
                    <td>{subCategory.name}</td>
                    <td>{subCategory.categoryName}</td>
                    <td><img src={subCategory.image} alt={subCategory.name} className="subcategory-image" /></td>
                    <td className={subCategory.status === 'Active' ? 'status-active' : 'status-inactive'}>{subCategory.status}</td>
                    <td>{subCategory.sequence}</td>
                    <td>
                      <FaEdit className="edit-icon" onClick={() => history(`/edit-subcategory/${subCategory.id}`)} />
                      <FaTrashAlt className="delete-icon" onClick={() => toggleDeleteModal(subCategory.id)} />
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
      {showLogoutModal && <LogoutModal toggleModal={toggleLogoutModal} />}
      {showDeleteModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <h2>Delete</h2>
            <p>Are you sure you want to delete?</p>
            <div className="delete-modal-buttons">
              <button onClick={() => toggleDeleteModal(null)} className="cancel-button">Cancel</button>
              <button onClick={deleteSubCategory} className="confirm-button">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};
