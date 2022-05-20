import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
export default function Footer() {
  return (
    <div className="">
  <footer
          class="text-center text-lg-start text-white"
          style={{backgroundColor: "#1c2331"}}
          >
    
    <section
             class="d-flex justify-content-between p-4"
             style={{backgroundColor:"#6351ce"}}
             >
     
      <div class="me-5">
        <span className='fs-5'>Get connected with us on social networks:</span>
      </div>
  
      <div>
        <a href="" class="text-blue me-4">
        <i class="bi bi-facebook text-white fs-5"></i>

        </a>
       
        <a href="" class="text-danger me-4">
        <i class="bi bi-google fs-5"></i>
        </a>
        <a href="" class="text-danger me-4">
        <i class="bi bi-instagram fs-5"></i>
        </a>
        <a href="" class="text-white me-4">
        <i class="bi bi-linkedin fs-5"></i>
        </a>
        <a href="" class="text-danger me-4">
        <i class="bi bi-youtube fs-5"></i>
        </a>
       
        <a href="" class=" text-danger me-4">
        <i class="bi bi-pinterest fs-5"></i>
        </a>
        <a href="" class="text-warning me-4">
        <i class="bi bi-discord fs-5"></i>
        </a>
      </div>
  
    </section>
   
    <section class="">
      <div class="container text-center text-md-start mt-5">
       
        <div class="row mt-3">
       
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          
            <h6 class="text-uppercase fw-bold"></h6>
            <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
            
                style={{width:"100px", backgroundColor:"#7c4dff" , height:"3px"}}
                />
            <p className='small_text fs-4 text-white'>
            Abtaran App Store, Sailing Towards Growth.
            </p>
          </div>
       
         
         
       
          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          
            <h6 class="text-uppercase fw-bold">Useful links</h6>
            <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
            
                style={{width:"100px", backgroundColor:"#7c4dff" , height:"3px"}}
                />
            <p>
              <a href="https://www.abtaran.in/Screens/Aboutus/" target="_blank" class="text-white foot_text">About Us</a>
            </p>
            <p>
              <a href="https://www.abtaran.in/Screens/PrivacyPolicy/" target="_blank" class="text-white foot_text">Privacy And Policy</a>
            </p>
            <p>
              <a href="https://www.abtaran.in/Screens/TermsandConditions/" target="_blank" class="text-white foot_text">Terms And Contitions</a>
            </p>
            <p>
              <a href="https://www.abtaran.in/Screens/Feedback/" target='_blank' class="text-white foot_text">Give Feedback</a>
            </p>
          </div>
        
          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
      
            <h6 class="text-uppercase fw-bold">Our Contacts</h6>
            <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
            
                style={{width:"100px", backgroundColor:"#7c4dff" , height:"3px"}}
                />
            <p><i class="foot_text bi bi-house me-3"></i> New York, NY 10012, US</p>
            <p><i class=" foot_text bi bi-envelope me-3"></i> grow@abtaran.in</p>
            <p><i class=" foot_text bi bi-phone me-3"></i> + 01 234 567 88</p>
            <p><i class=" foot_text bi bi-printer-fill  me-3"></i> + 01 234 567 89</p>
          </div>
         
        </div>
    
      </div>
    </section>
  
   
  
  </footer>
</div>

  )
}
