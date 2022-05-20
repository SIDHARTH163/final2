import React,{useEffect , useState} from 'react'
import { db } from '../Firebase'
export default function Cart({user}) {
  const [app , setapp]=useState([])
  const [loading, setLoading] = useState(true);
  const [yourapp, setyourapp]=useState([])
  const currentUserId = user ? user.uid : null;
  useEffect(() => {
    const getPostsFromFirebase = [];
    const subscriber = db
        .collection("User_Cart").where('user', '<=', currentUserId).where('user', '>=', currentUserId).orderBy('user' , 'desc')
        // .collection("Approved").where("Category",'==',props.filtername)
        .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                getPostsFromFirebase.push({
                    ...doc.data(), //spread operator'UpdatedAt',"desc"
                    id: doc.id, // `id` given to us by Firebase
                    key: doc.id
                });
            });

            setapp(getPostsFromFirebase);

            setLoading(false);


        });
    return () => subscriber();


      
   
  }, [app, loading ]);
  if (loading) {
    return <>
    <div className='d-flex justify-content-center'>
    <div class="spinner-border text-primary text-center my-3" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
    </div>
    </>
      ;
  }
  //    payment gateway

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR",

  // These options are needed to round to whole numbers if that's what you want.
  minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const loadScript = (src) => {
  return new Promise((resovle) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resovle(true);
    };

    script.onerror = () => {
      resovle(false);
    };

    document.body.appendChild(script);
  });
};

const displayRazorpay = async (amount , id) => {
   
  const res = await loadScript(
    "https://checkout.razorpay.com/v1/checkout.js"
  );

  if (!res) {
    alert("You are offline... Failed to load Razorpay SDK");
    return;
  }

  const options = {
    key: "rzp_test_F9ExcNT7bwNkvU",
    currency: "INR",
    amount: amount * 100,
    name: "Abtaran Appstore",
    description: "Thanks For Buying App",
    image:
      "https://mern-blog-akky.herokuapp.com/static/media/logo.8c649bfa.png",

    handler: function (response) {
     
      db.collection("User_Cart").doc(id).update({payment: "True" , Txnid:`${response.razorpay_payment_id}` });
     
      alert('payment successfull thanks for subscribing the app');
     
      

    },
    prefill: {
      name: "Abtaran Appstore",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};
const Delete =(id)=>{
  
  db.collection("User_Cart").doc(id).delete().then(()=>{
  window.alert('item deleted')
  }).catch((err)=>{
    console.log(err)
  })
 
 
}
  return (
    <div>
      <div className='container-fluid p-2'>
          <div className="container bg-white p-1">
            <div className='row justify-content-center  gap-lg-3 gap-sm-1'>
              {
                app.map((i , index)=>
                <>
                  
                   
                   <div key={index} className='col-lg-3 col-md-3 col-sm cart_items py-3 px-4  rounded'>
                <div className='mt-1'>
                  <p className='Apps-text text-center rounded p-1 bg-primary text-white fw-bold fs-5'>
                    {i.appname}
                  </p>
                 
                </div>
                
               <div className='d-flex justify-content-center'>
               <img className='app-img ' width="110" height="110" alt="logo" src={i.logo}></img>
              
               </div>
               
                 
               {i.payment == "False" ? <><div className='d-flex mt-1 p-1 justify-content-around'>
            <a href="#" className='btn btn-danger' onClick={() => Delete(`${i.id}`)}>Delete</a>
            <a href="#" className='btn btn-success' onClick={() => displayRazorpay(`${i.price} `, `${i.id}`)}>Buynow</a>
               
            </div></>:<>
            <div className='d-flex mt-1 p-1 justify-content-center'>
            <a href={i.apk} className='btn btn-success mt'>Download</a>
               
            </div>
          
            </>} 
              </div>
              
                  
                </>
              
               
                )
              }
              
              
            </div>
          </div>
      </div>
    </div>
  )
}
