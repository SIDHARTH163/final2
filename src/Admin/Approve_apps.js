import React , {useState , useEffect} from 'react'
import { db , serverTimestamp} from '../Firebase'
import './Admin.css'

export default function Approve_apps() {
    const [loading, setLoading] = useState(true);
  const [apps , setapps]=useState([])  
  const [currentItemId, setcurrentItemId] = useState(null);
  const [data , setdata]=useState('')
  const [show, setShow] = useState(false);
const allapps=()=>{
  const getPostsFromFirebase = [];
  const subscriber = db
    .collection("DeveloperApps").orderBy('time' , 'desc')
    .onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        getPostsFromFirebase.push({
          ...doc.data(), //spread operator
          id: doc.id, // `id` given to us by Firebase
         time:doc.data().time.toDate().toDateString(),
      });
      });
      setapps(getPostsFromFirebase);
      setLoading(false);
     
      
    });

  // return cleanup function
  return () => subscriber();
}
  
  useEffect(() => {
  allapps();

    
  }, [apps, loading]);
  if (loading) {
    return <><p className='Apps-text text-center'>Loading Please Wait ...</p></>
      ;
  }
  // get by id
  const loadapps = async (id) => {
    setcurrentItemId(id)
    try {
      const docRef = db.collection("DeveloperApps").doc(id);
      const result = await docRef.get();
      if (result.exists) {

        setdata(result.data());
        
        // sett(result.data().time.toDate().toDateString())
      } else {
        console.log("no Document Found");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  // aprrove
  const Approve =async(currentItemId)=>{
    try{
      await db.collection("Notifications").add({
        user:data.user,
        Read:'false',
        Text:`Congratulations Dear! Your App ${data.name} Has Been Approved To Abtaran App Store Cheers`,
        time:serverTimestamp()
      })
  
  
  
      await  db.collection("DeveloperApps").doc(currentItemId).update({status: "Active" });
     
  //   M.toast({html: 'Blog Created',classes:"green"}) 
   
  window.alert(`Dear App Approved To Abtaran And Notification Send To Developer`)
  window.location.reload(false)
 
  }catch(err){
    console.log(err)
    
     window.alert(`Dear Approval Failed`)
     // router.push("/Developers/Dashboard")
  }
  }
  return (
    <div>
         <div className='container  aprove_cont  '>
         <div class="row row-cols-2 my-2 row-cols-lg-4 g-2 g-lg-3  ">
            {
 apps.map((i, index) => (
              <>
              {i.status=="False" ?<> <div key={index} class=" col-sm bg-white d-flex f  p-2  justify-content-center ">
  <div className='img-block  py-2 d-flex px-2  '>
  <img className='app-img ' width="60" height="65" alt="logo" src={i.logo}></img>
  </div>
  <div className='mt-1 '>
  
  <a className=' Apps-text text-justify mx-1 mt-1' href={`/Details/${i.id}`}>{i.name} </a><br/>
    
  <a className=' Apps-text text-justify mx-1 mt-1' href={`/Details/${i.id}`}>{i.versiontype==="new"?<>Payment:Done</>:<>no payment required</>} </a> <br/>
   <p className='small_text mt-1 mx-1'>{i.time} <br/> Status:{i.status=="False"?<>Waiting For Approval</>:<>Approved</>}</p>
  
   <a className=' Apps_text text-center mx-1 ' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => loadapps(`${i.id}`)}>Action </a>
   {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button> */}

  </div><br/>
 
 
  {/* modal */}
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Action For {data.name}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body justify-content-center">
      <a className=' Apps-text text-center mx-1 mt-1' > Category: {data.category}</a><br/>
      <a className=' Apps-text text-center mx-1 mt-1' > Marketing Type:  {data.marketing}</a><br/>
      <a className=' Apps-text text-center mx-1 mt-1' > Type: {data.type}</a><br/>
      <a className=' Apps-text text-center mx-1 mt-1' > Taregt Audience: {data.target}</a><br/>
      <a className=' Apps-text text-center mx-1 mt-1' > Version: {data.version}</a><br/>
      <a className=' Apps-text text-center mx-1 mt-1' > Comunity: {data.comunity}</a><br/>
      <p className='small_text mt-1 mx-1 text-justify'> Desc:{data.desc}</p>
  
    
      
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button>
        <a className='btn btn-danger' href={`${data.Apk}`}>download</a>
        <a className='btn btn-success' onClick={() => Approve(`${currentItemId}`)}>Approve</a>
    
   
      </div>
    </div>
  </div>
</div>
  {/* modals */}
  </div>
 </>:<>
             
              </> }
              </>
                
 ))}
  

            </div>
        </div>
    </div>
  )
}
