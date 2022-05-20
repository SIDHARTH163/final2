import React, { useState, useEffect } from 'react'
// import { db , serverTimestamp} from '../Firebase'
import { db, serverTimestamp } from '../../Firebase';
import Analytics from './Analytics';
import './Upload.css'
export default function Approve_apps({ user }) {
  const [loading, setLoading] = useState(true);
  const [Showapp, setShowapp] = useState(false)
  const [id , setid]=useState("")
  const ShowSignleapp = (id) => {
    setShowapp(!Showapp)
    
    setid(id)
  }
  const [apps, setapps] = useState([])
  const currentUserId = user ? user.uid : null;

  useEffect(() => {

    const getPostsFromFirebase = [];
    const subscriber = db
      .collection("DeveloperApps").where('user', '<=', currentUserId).where('user', '>=', currentUserId).orderBy('user', 'desc')
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          getPostsFromFirebase.push({
            ...doc.data(), //spread operator
            id: doc.id, // `id` given to us by Firebase
            time: doc.data().time.toDate().toDateString(),
          });
        });
        setapps(getPostsFromFirebase);
        setLoading(false);


      });

    // return cleanup function
    return () => subscriber();
  }, [apps, loading]);



  // reviews

  if (loading) {
    return <>
      <div className='d-flex justify-content-center'>
        <p className='Apps-text text-center'>Loading Please Wait</p>
        <div class="spinner-border text-primary text-center my-3" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
      ;
  }

  return (
    <div>
      <div className='container p-1 '>
      {
              Showapp ? <Analytics back={ShowSignleapp}  id={id} /> :
                <>
        <div class="">
          {
            apps.map((i, index) => (
              <div key={index} class="app_container bg-white container p-1">

                <div className='d-flex'>
                  <div className='col-sm-2 d-flex justify-content-center info_container'>
                    <img className='app-img my-2' width="100" height="100" alt="logo" src={i.logo}></img>
                  </div>
                  <div className='col-sm info_container'>
                    <div className='d-flex justify-content-between container'>
                      <h4 className=' Apps-text fw-bold  mx-1 mt-1' href={`/Details/${i.id}`}>{i.name} {i.status === "False" ? <><span className='text-danger'>Not Approved</span></> : <><span className='text-primary'>Approved</span></>}</h4>

                      <h4 className=' Apps-text fw-bold text-center ms-2 mt-1' href={`/Details/${i.id}`}>{i.time} </h4>
                    </div>

                    <div className='d-flex justify-content-between container mt-2'>
                      <h4 className=' Apps-text fw-bold text-center mx-1 mt-1' href={`/Details/${i.id}`}>{i.category} </h4>

                      <h4 className=' Apps-text fw-bold text-center mx-1 mt-1' href={`/Details/${i.id}`}>{i.type} </h4>
                    </div>

                    <div className='d-flex justify-content-between container mt-2'>
                      <h4 className='btn btn-warning Apps-text  text-white text-center ' onClick={() => ShowSignleapp(`${i.id}`)}>View Analytics </h4>

                      <a href={`/update/${i.id}`}><h4 className='btn btn-primary Apps-text  text-white text-center ' >Update</h4></a>
                      <h4 className=' btn btn-danger Apps-text  text-white text-center ' href={`/Details/${i.id}`}>Delete</h4>

                    </div>

                  </div>

                </div>
               
              </div>



            ))}


        </div>
        </>}
      </div>
    </div>
  )
}
