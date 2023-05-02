import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LinkMain from "./component/links"
import LinkCreateMain from "./component/links.create"
import ManagerHome from "./component/manager"
import MenuIcon from "./component/menu"
import LinksList from "./component/links.list"
import LinkEdit from "./component/links.edit"

function App() {
  return (
    <BrowserRouter>    
      <Routes>
        <Route exact path="/" element={<LinkMain />} />  
        <Route exact path="/create" element={<LinkCreateMain />} />  
        <Route exact path="/manager" element={<ManagerHome /> } />  
        <Route exact path="/links/list" element={<LinksList /> } />  
        <Route exact path="/link/edit/:id" element={<LinkEdit /> } />  
      </Routes> 
      <MenuIcon />
    </BrowserRouter>

  );
  
}
export default App;
