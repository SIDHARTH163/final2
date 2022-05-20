import React,{useEffect , useState} from 'react'
import './Notification.css'
import { db } from '../../Firebase';
export default function Notifications({user}) {
  const [ notifications , setnotifications]=useState([])
  const currentUserId = user ? user.uid : null;
  const [loading, setLoading] = useState(true);
  useEffect(() => {

    const getPostsFromFirebase = [];
    const subscriber = db
      .collection("Notifications").where('user', '<=', currentUserId).where('user', '>=', currentUserId).orderBy('user', 'asc')
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          getPostsFromFirebase.push({
            ...doc.data(), //spread operator
            id: doc.id, // `id` given to us by Firebase
            time: doc.data().time.toDate().toDateString(),
          });
        });
        setnotifications(getPostsFromFirebase);
        setLoading(false);


      });

    // return cleanup function
    return () => subscriber();
  }, [notifications, loading]);

  return (
    <div>
       {
            notifications.map((i, index) => (
      <div className='container main_container_notification my-2 p-2'>
           <a className=' Apps-text fs-5 text-justify mx-lg-1 mx-0 mt-lg-1 mt-0 fw-normal'>{index}. {i.Text}<br/><span className='fs-6 small_text  '> {i.time}</span> </a>
    
      </div>
      
      ))}
    </div>
  )
}
