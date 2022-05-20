import React , {useEffect , useState} from 'react'
import { db } from '../../Firebase';
export default function Analytics(props) {
    const [AllComments, setAllComments] = useState([])
  
  const [app , setapp]=useState([])
  const[datetime , sett]=useState('')
  // downloads

  const loadnews = async () => {
    try {
      const docRef = db.collection("DeveloperApps").doc(props.id);
      const result = await docRef.get();
      if (result.exists) {
        setapp(result.data());
        sett(result.data().time.toDate().toDateString())
      } else {
        console.log("no Document Found");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  const loadcoments = async () => {
    const comments = await db.collection('DeveloperApps').doc(props.id).collection('Reviews').get()
    setAllComments(comments.docs.map(docSnap => docSnap.data()));
    
  };
  useEffect(() => {
  loadnews();
  loadcoments();
  },)
  return (
    <div>
<div>
      <div className='container p-1 '>
     
        <div class="">
       
              <div  class="app_container bg-white container p-1">

                <div className='d-flex'>
                  <div className='col-sm-2 d-flex justify-content-center info_container'>
                    <img className='app-img my-2' width="100" height="100" alt="logo" src={app.logo}></img>
                  </div>
                  <div className='col-sm info_container'>
                    <div className='d-flex justify-content-between container'>
                      <h4 className=' Apps-text fw-bold  mx-1 mt-1'>{app.name}</h4>

                      <h4 className=' Apps-text fw-bold text-center ms-2 mt-1' >{datetime} </h4>
                    </div>

                    <div className='d-flex justify-content-between container mt-2'>
                      <h4 className=' Apps-text fw-bold text-center mx-1 mt-1' >{app.category} </h4>

                      <h4 className=' Apps-text fw-bold text-center mx-1 mt-1' >{app.type} </h4>
                    </div>

                    <div className='d-flex justify-content-between container mt-2'>
                      <h4 className=' Apps-text fw-bold text-center mx-1 mt-1' >{AllComments.length} Reviews</h4>

                      <h4 className=' Apps-text text-white btn btn-danger fw-bold text-center mx-1 mt-1 ' data-bs-toggle="modal" data-bs-target="#exampleModal" >Read All Comments </h4>
                    </div>

                    

                  </div>

                </div>
               
              </div>



        </div>
    
      </div>
    </div>
    {/* modals1 */}
    {/* <!-- Modal --> */}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{app.name}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <table class="table">
  <thead>
    <tr>
    
      <th scope="col">Email</th>
      <th scope="col">Comment</th>
      <th scope="col">Rating</th>
    </tr>
  </thead>
  <tbody>
    
    {
            AllComments.map((i, index) => (
      <><tr><td>{i.email.slice(0, 6)}</td><td>{i.comment}</td><td>{i.rating}</td> </tr></>
            ))}
      
   
    </tbody>
    </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
    </div>
  </div>
</div>
    {/* modal1 ends */}
    {/*  modal2  */}
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    {/* modal 2 closes */}
    </div>
  )
}
