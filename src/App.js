import  React ,{ useState , useEffect } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import { auth } from './Firebase';
import './App.css';
import Home from "./Pages/Home";
import Header from './Header/Header'
import Footer from './Header/Footer'
import Categories from './Pages/Appscomponents/Categories';
import AdminDashboard from './Admin/AdminDashboard';
import Apps_detail from './Pages/Appscomponents/Apps_detail';
import Developer_login from './Developer/Developer_login';
import DeveloperDashboard from './Developer/DeveloperDashboard';

import Approve_apps from './Admin/Approve_apps';
import FreeApps from './Pages/Exclusiveapps/FreeApps';
import PaidApps from './Pages/Exclusiveapps/PaidApps';
import Exclusive from './Pages/Exclusiveapps/Exclusive';
import Free_upload from './Admin/Free_upload';
import Update_uploads from './Developer/Components/Update_uploads';

import Users_Signup from './Users/Users_Signup';
import Users_Login from './Users/Users_Login';
import Cart from './Users/Cart';
function App() {
  const [user,Setuser]=useState(null)
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
Setuser(user)
      }else{
        Setuser(null)
      }
    })
  }, [user])
  return (
    <>
      <BrowserRouter>
        <Header user={user} />
        <div className='bg-light'>
        <Switch>
          {/* header */}
          <Route exact path="/">
            <Home />
          </Route>
          {/* header close */}
          <Route path="/Categories">


            <Categories />
          </Route>
          {/* view details */}
          <Route path="/Details/:id"
            render={props => <Apps_detail {...props} />} />

            {/* exclusive Apps */}
            <Route path="/free_apps">
              <FreeApps/>
            </Route>
            <Route path="/paid_apps">
              <PaidApps/>
            </Route>
            {/* <Route path="">
              <Exclusive/>
            </Route> */}
              <Route path="/exclusive/:id"
            render={props => <Exclusive  {...user} {...props }  />} />


          {/* developer dasboard routes */}

          <Route path="/login">
            <Developer_login />
          </Route>
          <Route  path="/Dashboard">
            <DeveloperDashboard user={user}/>
          </Route>
          <Route path="/update/:id"
            render={props => <Update_uploads {...props} />} />

          {/* ddr ends */}
          <Route path ="/users_signup">
            {/* <User_Login/> */}
            <Users_Signup/>
          </Route>
          <Route path="/users_login">
             {/* <login_user/> */}
             <Users_Login/>
          </Route>
          <Route path="/cart">
            <Cart user={user}/>
          </Route>

          <Route path="/admin_dashboard">

            <AdminDashboard />
          </Route>
           <Route path="/Free_uploads">
            <Free_upload/>
           </Route>
           <Route path="/Approve">
             <Approve_apps/>
           </Route>
        </Switch>
        <Footer />
        </div>
       
      </ BrowserRouter >
    </>
  );
}

export default App;
