import React , {useState } from 'react'
import './dashboard.css'
import { Navbar , Nav , NavDropdown , Container} from 'react-bootstrap'
import Upload_Apps from './Components/Upload_Apps'
import Profile from './Components/Profile';
import View_uploads from './Components/View_uploads'
import Notifications from './Components/Notifications';
export default function DeveloperDashboard({user}) {
  const [uploadapp , setuploadapp]=useState(false);
  const [Viewuploads , setviewuploads]=useState(false)
  const [profile , setprofile]=useState(false)
  const[notification , setnot]=useState(false)
  const changePage = (str) => {
    if (str === "Upload") {
      setuploadapp(true);
      setviewuploads(false);
      setprofile(false);
      setnot(false)
    }else if (str === "Profile") {
      setuploadapp(false);
      setviewuploads(false);
      setprofile(true);
      setnot(false)
  }
  else if (str === "viewuploads") {
    setuploadapp(false);
    setviewuploads(true);
    setprofile(false);
    setnot(false)
}

else if (str === "not") {
  setuploadapp(false);
  setviewuploads(false);
  setprofile(false);
  setnot(true)
}


  }
  return (
    <div >
        <Navbar bg='white' expand="lg" className='mt-1 navbar_dash'> 
  <Container>
  <Navbar.Brand className='text-black header-font d-lg-none .d-md-none .d-sm-block'  href="/">Profile</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav1" />
    <Navbar.Collapse id="basic-navbar-nav1" className='justify-content-center' >

      <Nav >
      
        <Nav.Link className='nav-text text-black ' href="#" onClick={() => changePage('Profile')}>Your Profile</Nav.Link>
       <Nav.Link className='nav-text text-black ' onClick={() => changePage('viewuploads')}>Your Uploads</Nav.Link>
       <Nav.Link className='nav-text text-black ' onClick={() => changePage('Upload')}>Upload Apps</Nav.Link>
       <Nav.Link className='nav-text text-black ' onClick={() => changePage('not')}>Notifications</Nav.Link>
      </Nav>
      {/*  */}
      {/* <Nav className='justify-content-center '>
        <Nav.Link className='nav-text text-black ' href="#" onClick={() => changePage('viewuploads')}>Your Uploads</Nav.Link>
      
        <NavDropdown className='dropdown ' title="Components "  id="basic-nav-dropdown1">
          <NavDropdown.Item href="#" onClick={() => changePage('viewuploads')}>Your Uploads </NavDropdown.Item>
          <NavDropdown.Item href="#" onClick={() => changePage('Upload')}>Upload Apps </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Your Paid Apps </NavDropdown.Item>
         
        </NavDropdown>
      </Nav> */}
      {/*  */}
     
    </Navbar.Collapse>
  </Container>
</Navbar>
<div className='container main_container_dashboard  mt-1 px-lg-5 px-md-4'>
{
  profile ?
  <Profile user={user}/>:
  (
    uploadapp ?
    <Upload_Apps user={user}/>:
    (
      Viewuploads ?
      <View_uploads user={user}/>
      :
     (
       notification?
       <Notifications user={user}/>
       :<>
       <Profile user={user}/>
       </>
     )
    )
  )
}
</div>
        </div>
   
  )
}
