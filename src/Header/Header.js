import React , {useEffect , useState} from 'react'
import { Navbar , Container , NavDropdown , Nav } from 'react-bootstrap'
import logo from './logo.png'
import './Header.css'
import { auth , db } from '../Firebase'
import { useHistory , Link } from 'react-router-dom'
export default function Header({user}) {
  const [users , setusers]=useState([])
  const [loading, setLoading] = useState(true);
  const history = useHistory()
  useEffect(()=>{
    if(user){
        const docRef =db.collection('Profiles').doc(user.uid)
        docRef.onSnapshot(docSnap=>{
            if(docSnap.exists){
                
                setusers(docSnap.data())
                // console.log(data,'user data')
               
            }else{
                console.log("no docs")
            }
        })

    }else{
        console.log("login first")
    }
},)
  // auth with 
 
  // logout
  const logout=()=>{
    auth.signOut().then(() => {
      window.alert('Logged out successfully. Come back soon to Abtaran App Store')
      history.push('/')
    }).catch((error) => {
      // An error happened.
    });
    
    
    // window.alert('Logged out successfully. Come back soon to Abtaran App Store')
   
  }
  return (
    <div>
      <Navbar className="nv py-2" expand="lg">
  <Container fluid>
    <Navbar.Brand className='text-black header-font ' href="/"> <img className='' width="40" height="40" alt="logo" src={logo}></img>  Abtaran App Store</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav " className='bg-light' />
    <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end p-1'>
      <Nav className='text-black'>
        
        {/* <Nav.Link className='text-black nav-Text' href="/">Home</Nav.Link> */}
        <Link className="nav-link  mx-lg-2 mx-md-2 mx-sm-2 mx-0 fs-5 text-black nav-Text" aria-current="page" to="/">Home</Link>
        {/* <Nav.Link className='text-black nav-Text' href="/Categories">Categories</Nav.Link> */}
        <Link className="nav-link mx-lg-2 mx-md-2 mx-sm-2 mx-0 fs-5 text-black nav-Text" aria-current="page" to="/Categories">Categories</Link>
        <NavDropdown className="fs-5"  title="Exclusive Apps" id="basic-nav-dropdown">
          <NavDropdown.Item href="/free_apps">Free Apps</NavDropdown.Item>
           <NavDropdown.Item href="/paid_apps">Paid Apps</NavDropdown.Item>
          
             {user?<>
          
          {users.as==="user"?<>
            {/* <Nav.Link className='fw-bold' href="/cart">User Cart</Nav.Link> */}
            <NavDropdown.Item href="/cart">User Cart</NavDropdown.Item>
          </>:<>
         
          </>}
          </>:<>
          {/* <Nav.Link className='fw-bold' href="/Login">User Login</Nav.Link>
           */}
            <NavDropdown.Item href="/users_signup">User Login</NavDropdown.Item>
          </>}
          
          <NavDropdown.Divider />
          {user?<>
          
          {users.as==="developer"?<>
            <NavDropdown.Item href="/Dashboard">Developer Dashboard</NavDropdown.Item>
           
          </>:<>
          {/* <Nav.Link className='fw-bold' href="/Login">Developer Login</Nav.Link> */}
            {/* <NavDropdown.Item href="/Login">Developer Login</NavDropdown.Item> */}
          </>}
          </>:<>
          {/* <Nav.Link className='fw-bold' href="/Login">Developer Login</Nav.Link> */}
          <NavDropdown.Item href="/Login">Developer Login</NavDropdown.Item>         
          
          </>}
          
         
          {user?<>
           
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </>:<>
         
          </>}
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    </div>
  )
}
