import React , {useState , useEffect} from 'react'
import './Categories.css'
import Side_apps from './Side_apps'
import Apps_filter from './App_filter'
import { db } from '../../Firebase'
export default function Categories() {


  const [loading, setLoading] = useState(true);
  const [cat , setcat]=useState([])  
  const [Filter, setFilter] = useState('')
  
  const [showFilter, setshowFilter] = useState(false)

  const changeFilter = (filter) => {
    setshowFilter(true)
    setFilter(filter)
   
  }

  const hideFilter = () => {
    setshowFilter(false)
    window.location.reload(false);
  }
  useEffect(() => {
    const getPostsFromFirebase = [];
    const subscriber = db
      .collection("Categories").orderBy("Category" , "desc")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          getPostsFromFirebase.push({
            ...doc.data(), //spread operator
            id: doc.id, // `id` given to us by Firebase
          });
        });
        setcat(getPostsFromFirebase);
        setLoading(false);
        
      });

    // return cleanup function
    return () => subscriber();
  }, [cat, loading]);
  if (loading) {
    return <h1 className='text-center Apps-text fs-3'>Loading Please Wait..</h1>
      ;
  }
  return (
    <div>

      <div className='container-fluid py-3 bg-light'>
        <div className='row'>
          <div className='col-sm-2 left-cont bg-white d-none d-lg-block'>
            
                  <Side_apps/>
          </div>
          <div className='col-sm-10 right-cont'>
            {/* categories container */}
            <div className='container p-2 my-2 justify-content-evenly'>
            {showFilter ? <Apps_filter hideFilter={hideFilter} filtername={Filter}  /> :
        <>
       {
           
           
           <div class="row row-cols-2 row-cols-lg-4 g-2 g-lg-3 bg-white">
             {
 cat.map((i, index) => (


 
  <div key={index} class=" col-sm-3 ms-auto  apps_section " onClick={() => changeFilter(`${i.Category}`)}>
  <div className='img-block px-4 py-2 d-flex justify-content-center '>
  <img className='app-img ' width="60%" height="100%" alt="logo" src={i.Catimg}></img>
  </div>
  <div className='text-block p-1 mb-1'>
   <h6 className='text-center Apps-text '>
    {i.Category}
   </h6>
  

  </div>
  
  
  </div>
  ))}
  </div>
  

   }</>}

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
