import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Account from "./pages/account/account";
import Customer from "./pages/customer/customer";
import Dashboard from "./pages/dashboard/dashboard";
import Login from "./pages/login/login";
import Brand from "./pages/product/brand/brand";
import ItemCreate from "./pages/product/item/create/create";
import ItemEdit from "./pages/product/item/edit/edit";
import ItemList from "./pages/product/item/list/list";
import MakePurchase from "./pages/product/purchase/create/create";
import PurchaseDetails from "./pages/product/purchase/details/details";
import PurchaseList from "./pages/product/purchase/list/list";
import Category from "./pages/product/category/category";
import Unit from "./pages/product/unit/unit";
import Supplier from "./pages/supplier/supplier";
import Pos from "./pages/pos/pos";
import Add from "./pages/account/add/add";
import Widthdraw from "./pages/account/widthdraw/widthdraw";
import Transection from "./pages/account/transection/transection";

const App: React.FC = () => {
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL2p3dFwvcHVibGljXC9hcGlcL2xvZ2luIiwiaWF0IjoxNjUzNzI0MzEzLCJleHAiOjE2NTM3Mjc5MTMsIm5iZiI6MTY1MzcyNDMxMywianRpIjoicGJMb0lMc2R2eFBYRXpiZiIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.8irVtWpQD69M9H876BjrybKd0V9gsYGQ5pCwThwixOk";
  // axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard>
              <h1>Hello World</h1>
            </Dashboard>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/*"
          element={
            <Dashboard>
              <h1>Hello World</h1>
            </Dashboard>
          }
        ></Route>
        <Route path="/unit" element={<Unit />}></Route>
        <Route path="/account" element={<Account />}></Route>
        <Route path="/account/add-money" element={<Add />}></Route>
        <Route path="/account/widthdraw-money" element={<Widthdraw />}></Route>
        <Route path="/account/history" element={<Transection />}></Route>
        <Route path="/brand" element={<Brand />}></Route>
        <Route path="/category" element={<Category />}></Route>
        <Route path="/supplier" element={<Supplier />}></Route>
        <Route path="/customer" element={<Customer />}></Route>
        <Route path="/product/item/create" element={<ItemCreate />}></Route>
        <Route
          path="/product/item/edit/:productId"
          element={<ItemEdit />}
        ></Route>
        <Route path="/product/item/list" element={<ItemList />}></Route>
        <Route path="/product/item/purchase" element={<MakePurchase />}></Route>
        <Route
          path="/product/item/purchase/list"
          element={<PurchaseList />}
        ></Route>
        <Route
          path="/product/item/purchase/details/:detailsId"
          element={<PurchaseDetails />}
        ></Route>
        <Route path="/pos" element={<Pos />}></Route>
      </Routes>
    </div>
  );
};

export default App;
