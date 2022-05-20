import React , {useState , useEffect} from 'react'
import { db } from '../../../Firebase';

import { Button , Col } from 'react-bootstrap'
export default function Free_section(props) {
  
  const [loading, setLoading] = useState(true);
  const [apps , setapps]=useState([])  

  
 
  useEffect(() => {
    const getPostsFromFirebase = [];
    const subscriber = db
      .collection("DeveloperApps").where("category","<=",props.section).where("category",">=",props.section).orderBy('category' ,'desc').limit(8)
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
               <h6 className='fw-bold   fs-5 mt-2 mx-2'>{props.section}</h6>
             </div>
             <div className='col-sm-2 row justify-content-end me-2'>
             <Button  as={Col} onClick={props.changeState} variant="dark">Back</Button>
             </div>
           </div>

         </div>
         <div className='container content_container   p-4'>
         <div className='row px-lg-4 px-md-3 px-sm-0 px-0'>
         {
 apps.map((i, index) => (


   <>
   {
     i.type==="Free App"?<>
     {i.status==="Active" ?<>
  
     <div className='col ms-lg-4 ms-md-2 ms-sm-0 ms-0 app_container_cat my-1 py-3 bg-white' key={index}>
              <div className='img_container1 d-flex justify-content-center py-2 px-3'>
              <img className='app-img ' width="160px" height="140px" alt="logo" src={i.logo}></img>
              </div>
              <div className='img_container1 d-flex justify-content-center'>
              <a className=' small_text1 text-justify fs-6 ' >{i.name}</a>
    
              </div>

              <div className='img_container1 p-1 d-flex justify-content-center'>
                <a href={`/exclusive/${i.id}`} className='btn small_text text-white btn-success'>Download</a>
              </div>

            </div>
           

           
   </>:<></>}
     </>:<></>
   }
   </>
 

 ))}

</div>
         </div>
    </div>
      </div>
    </div>
  )
}
