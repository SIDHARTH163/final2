import React , {useState , useEffect} from 'react'
import { db } from '../../Firebase'
import './app.css'
import { Button , Col } from 'react-bootstrap'
export default function Apps_filter(props) {
 
  const [loading, setLoading] = useState(true);
  const [apps , setapps]=useState([]) 
  const [data , setdata]=useState([])  
  useEffect(() => {
    const getPostsFromFirebase = [];
    const subscriber = db
      .collection("DeveloperApps").where("category","<=",props.filtername).where("category",">=",props.filtername).orderBy('category' ,'desc')
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          getPostsFromFirebase.push({
            ...doc.data(), //spread operator
            id: doc.id, // `id` given to us by Firebase
          });
        });
        setdata(getPostsFromFirebase);
       
        setLoading(false);
        
      });

    // return cleanup function
    return () => subscriber();
  }, [apps, loading , props.title]);
  
 
  useEffect(() => {
    const getPostsFromFirebase = [];
    const subscriber = db
      .collection("Uploads").where("category","<=",props.filtername).where("category",">=",props.filtername).orderBy('category' ,'desc').limit(8)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          getPostsFromFirebase.push({
            ...doc.data(), //spread operator
            id: doc.id, // `id` given to us by Firebase
          });
        });
        setapps(getPostsFromFirebase);
        setLoading(false);
        
      });

    // return cleanup function
    return () => subscriber();
  }, [apps, loading , props.title]);
  if (loading) {
    return <h1 className='text-center Apps-text fs-3'>Loading Please Wait..</h1>
      ;
  }
  return (
    // <div onClick={() => { props.changeState(props.title) }}>{props.title}</div>
    <div className='container-fluid'>
      <div className='row'>
        
      <div className='main_container container my-1 p-2'>
         <div className='col-sm head_container bg-light px-2 py-2'>
           <div className="d-flex flex-row justify-content-between">
             <div className='col-sm'>
               <h6 className='fw-bold   fs-5 mt-2 mx-2'>{props.filtername}</h6>
             </div>
             <div className='col-sm-2 row justify-content-end me-2'>
             <Button  as={Col} onClick={props.hideFilter} variant="dark">Back</Button>
             </div>
           </div>

         </div>
         <h6 className='fw-bold   fs-5 my-2 mx-2'>Free Apps</h6>
         <div className='container content_container   p-4'>
         
         <div className='row px-lg-4 px-md-3 px-sm-0 px-0'>
           
           {
  apps.map((i, index) => (
           <div className='col ms-lg-4 ms-md-2 ms-sm-0 ms-0 app_container_cat my-1 py-3 bg-white' key={index}>
               <div className='img_container1 d-flex justify-content-center py-2'>
               <img className='app-img ' width="90%" height="130px" alt="logo" src={i.logo}></img>
               </div>
               <div className='img_container1 d-flex justify-content-center'>
               <a className=' small_text1 text-justify fs-6 ' >{i.name}</a>
     
               </div>
 
               <div className='img_container1 p-1 d-flex justify-content-center'>
                 <a href={`/Details/${i.id}`} className='btn small_text text-white btn-success'>Download</a>
               </div>
 
             </div>
            
 
            
  ))}
 
            
 
            
            
           </div>
         </div>

{/* exclusive apps */}
<h6 className='fw-bold   fs-5 my-2 mx-2'>Exclusive Apps</h6>
         <div className='container content_container   p-4'>
         <div className='row px-lg-4 px-md-3 px-sm-0 px-0'>
           
          {
 data.map((i, index) => (
          <div className='col ms-lg-4 ms-md-2 ms-sm-0 ms-0 app_container_cat my-1 py-3 bg-white' key={index}>
              <div className='img_container1 d-flex justify-content-center py-2 px-3'>
              <img className='app-img ' width="90%" height="140px" alt="logo" src={i.logo}></img>
              </div>
              <div className='img_container1 d-flex justify-content-center'>
              <a className=' small_text1 text-justify fs-6 ' >{i.name}</a>
    
              </div>

              <div className='img_container1 p-1 d-flex justify-content-center'>
                <a href={`/exclusive/${i.id}`} className='btn small_text text-white btn-success'>Download</a>
              </div>

            </div>
           

           
 ))}

           

           
           
          </div>
         </div>
    </div>
      </div>
    </div>
  )
}
