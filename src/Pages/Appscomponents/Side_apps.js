import React , {useState , useEffect} from 'react'
import { db } from '../../Firebase'
import './app.css'
export default function Side_apps() {
  const [loading, setLoading] = useState(true);
  const [apps , setapps]=useState([])  

  
 
  useEffect(() => {
    const getPostsFromFirebase = [];
    const subscriber = db
      .collection("DeveloperApps").orderBy('time' , 'desc').limit(10)
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
  }, [apps, loading]);
  if (loading) {
    return <></>
      ;
  }
  return (
    <div className='bg-glass p-4 side_container'>
       <h6 className='text-center Apps-text fs-6 ms-2   '>Our Excluisve apps</h6>
      {
 apps.map((i, index) => (

  <div className='col  ms-sm-0 ms-0 app_container_cat my-2 py-3 bg-white'>
  <div className='img_container1 d-flex justify-content-center py-2'>
  <img className='app-img ' width="90%" height="70%" alt="logo" src={i.logo}></img>
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
  )
}
