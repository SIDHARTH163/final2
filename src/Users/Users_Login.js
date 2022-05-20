import React , {useState} from 'react'
import './users.css'
import {auth} from '../Firebase'
import logo from './logo.png'
import { useHistory } from 'react-router-dom'
export default function Users_Login() {
  const [rating, setrating] = useState(0)
    const [email , setemail]=useState('')
    const [password , setpassword]=useState('')
    const history =useHistory()
  const changeRating = (e) => {
    setrating(e.target.value)
  }
  const handelsignin=async(e)=>{
    e.preventDefault()
    if( !email || !password ||!rating){
      window.alert('Please Enter All The Feilds')
  
  }else{
  
  try{
  const result =await auth.signInWithEmailAndPassword(email,password)
  
  window.alert(`welcome back ${result.user.displayName} good to have you back`);
  
  history.push('/cart')
  
  }catch(err){
  // window.alert(err.message);
  window.alert(err.message)
  }
  }
  }
  return (
    <section className="background-radial-gradient overflow-hidden">
    
  
    <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-3">
      <div className="row gx-lg-5  mb-5">
        <div className="col-lg-6 mb-5 mb-lg-0" style={{zIndex:10}}>
          <h1 className="my-5 display-5 mt-lg-5 mt-md-5 mt-1 fw-bold ls-tight text-white">
            Abtaran App Store <br />
            <span style={{color:"hsl(218, 81%, 75%)"}}>Sailing Towards Growth</span>
          </h1>
          <p className="mb-4 opacity-70 txt" style={{color: "hsl(218, 81%, 85%)"}}>
          Thanks for using Abtaran App Store, which has been made available in the form of a mobile application as well as website (collectively referred to as the “Platform”). We are a service provided by Abtaran App Store Private Limited ("We" or "Us"). Your use of Abtaran App Store to put up the apps, games, music, movies, books, magazines, or other digital content or services (referred to as "Elements”") through it for further Consumers to download, is subject to these Terms of Service.
          </p>
        </div>
  
        <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
  
          <div className="card bg-glass">
            <div className="card-body px-4 py-4 px-md-5">
              
              <form>
                <div className='text-center'>
                <img className='' width="38" height="38" alt="logo" src={logo}></img><p className='Apps-text'> Abtaran App Store</p>
                </div>
              
             
  
                <div className="form-outline mb-4">
                  <input value={email} onChange={(e) => setemail(e.target.value)} type="email" id="form3Example3" className="form-control" />
                  <label className="form-label" for="form3Example3">Email address</label>
                </div>
  
                <div className="form-outline mb-4">
                  <input value={password} onChange={(e) => setpassword(e.target.value)} type="password" id="form3Example4" className="form-control" />
                  <label className="form-label" for="form3Example4">Password</label>
                </div>
                <div className="mb-1 form-check">
    <input type="checkbox"  onChange={changeRating} className="form-check-input " id="exampleCheck1"/>
    <label className="form-check-label fw-bold small_text fs-6" for="exampleCheck1">Check me out</label>
  </div>
         
               
  
              
                <button onClick={handelsignin} className="btn btn-danger btn-block mb-4">
                  Login Now
                </button>
  
               
                <div className="text-center">
                  <p className='Apps-text fw-bold fs-6'>or Didn't Have An Account Continue To Signup Now:<a className='btn btn-warning ms-52 text-white fw-bold' href="/users_signup">Signup Now</a></p>
                 
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}
