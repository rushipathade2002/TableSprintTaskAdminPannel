import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from "./pages/Home"
import { Login } from './pages/Login';
import { ErrorPage } from './pages/ErrorPage';
import { Category } from './pages/Category';
import { AddCategory } from './pages/AddCategory';
import { Logout } from './pages/Logout';
import { SubCategory } from './pages/SubCategory';
import { EditCategory } from './pages/EditCategory';
import { Products } from './pages/Products';
import { AddSubCategory } from './pages/AddSubCategory';
import { AddProduct } from './pages/AddProduct';
import { EditSubCategory } from './pages/EditSubCategory';
import { EditProduct } from './pages/EditProduct';


const App = ()=>{
  return( 
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Login />}  />
          <Route path="/login" element = {<Login />}  />
          <Route path='/Home' element={<Home /> }/>
          <Route path="/category" element={<Category />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/subcategory" element={<SubCategory />} />
          <Route path="/edit-category/:id" element={<EditCategory />} />
          <Route path="/edit-subCategory/:id" element={<EditSubCategory />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/add-subcategory" element={<AddSubCategory/>}/>
          <Route path="/add-product" element={<AddProduct/>}/>

          <Route path="/products" element={<Products />} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;