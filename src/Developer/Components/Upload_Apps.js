import React, {useState , useEffect} from 'react'
import { storage , db  , serverTimestamp} from '../../Firebase';
import { Button } from 'react-bootstrap';
export default function Upload_Apps({user}) {
  const [loading, setLoading] = useState(true);
  const [cat, setcat] = useState([])
  const [type , settype]=useState('')
  const [logo , setlogo]=useState(null)
  const [url, setUrl] = useState('');
  const [progress, setprogress] = useState(0);
  const [image , setimage]=useState(null)
  const [url1, setUrl1] = useState('');
  const [progress1, setprogress1] = useState(0);
  const [apk , setapk]=useState(null)
  const [url2, setUrl2] = useState('');
  const [progress2, setprogress2] = useState(0);
  //  variables for save data
  const [name , setname]=useState('')
  const [category , setcategory]=useState('')
  const [version , setversion]=useState('')
  const [desc , setdesc]=useState('')
  const [comunity , setcomunity]=useState('')
  const [language , setlanguage]=useState('')
  const [target , settarget]=useState('')
  const [marketing , setmarketing]=useState('')
  const [price , setprice]=useState('')

  useEffect(() => {
    const getPostsFromFirebase = [];
    const subscriber = db
      .collection("Categories").orderBy("Category", "desc")
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
  
  const changeType = (e) => {
    settype('Free App')
  }
  const changeType1 = (e) => {
    settype('Paid App')
  }
  // upload logo
  const handelChange = (e) => {

    if (e.target.files[0]) {
      setlogo(e.target.files[0]);

    }
  };
  const handelUpload = () => {
     
  
    const uplaodTask = storage.ref(`Logos/${logo.name}`).put(logo);
    uplaodTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setprogress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage.ref("Logos")
          .child(logo.name)
          .getDownloadURL()
          .then(url => {

            setUrl(url)
            window.alert("Logo Uploaded Successfully,Click Ok To Continue")
          })
      }
    );
  };
   // upload image
   const handelChange1 = (e) => {

    if (e.target.files[0]) {
      setimage(e.target.files[0]);

    }
  };
  const handelUpload1 = () => {
     
  
    const uplaodTask = storage.ref(`Images/${image.name}`).put(image);
    uplaodTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setprogress1(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage.ref("Images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {

            setUrl1(url)
            window.alert("Image Uploaded Successfully,Click Ok To Continue")
          })
      }
    );
  };
  // upload apk
  const handelChange2 = (e) => {

    if (e.target.files[0]) {
      setapk(e.target.files[0]);

    }
  };
  const handelUpload2 = () => {
     
  
    const uplaodTask = storage.ref(`Apk/${apk.name}`).put(apk);
    uplaodTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setprogress2(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage.ref("Apk")
          .child(apk.name)
          .getDownloadURL()
          .then(url => {

            setUrl2(url)
            window.alert("Apk Uploaded Successfully,Click Ok To Continue")
          })
      }
    );
  };
  // free App upload
  const Submit =async()=>{
    try {
      await db.collection('DeveloperApps').add({
        name:name,desc:desc ,category:category , Apk: url2,
        logo: url,
        Image: url1,
        user:user.uid,
        status:"False",
        target:target,
        type:type,
        comunity:comunity,
        language:language,
        marketing:marketing,
        payment:"False",
        dname:user.displayName,
        version:version,
        versiontype:"old",
        time: serverTimestamp()
      })
      //   M.toast({html: 'Blog Created',classes:"green"}) 
      
      window.alert(`dear  app submitted to Abtaran`)
      window.location.reload(false);
      // window.location.reload(false);
    } catch (err) {

     window.alert('faild')
      // router.push("/Developers/Dashboard")
    }
  }
  // submit 2
  const Submit1 =async()=>{
    try {
      await db.collection('DeveloperApps').add({
        name:name,desc:desc ,category:category , Apk: url2,
        logo: url,
        Image: url1,
        price:price,
        user:user.uid,
        status:"False",
        target:target,
        type:type,
        comunity:comunity,
        language:language,
        marketing:marketing,
        payment:"False",
        dname:user.displayName,
        version:version,
        versiontype:"old",
        time: serverTimestamp()
      })
      //   M.toast({html: 'Blog Created',classes:"green"}) 
      
      window.alert(`dear  app submitted to Abtaran`)
      window.location.reload(false);
      // window.location.reload(false);
    } catch (err) {

     window.alert('faild')
      // router.push("/Developers/Dashboard")
    }
  }
  return (
    <div>
      <div className='container-fluid bg-white '>
      <div >
      <p className=" Apps-text text-center fs-4 mt-3" >Select Type Of App</p>
        <div className=' p-2 d-flex justify-content-center mt-lg-5 mt-md-5 mt-2'>
          
            {/* radio buttons */}
            <div className="form-check form-check-inline">
  <input  onChange={changeType} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
  <label   className="form-check-label fs-5 Apps-text" for="inlineRadio1">Free App</label>
</div>
<div className="form-check form-check-inline">
  <input onChange={changeType1} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
  <label  className="form-check-label fs-5 Apps-text" for="inlineRadio2">Paid App</label>
</div>
            {/* radio ends */}
        </div>
        {/* original form */}
     {type === "Paid App" ?<>
     <div className='container-fluid upload_container p-2'>
          
        <div className='d-flex flex-column justify-content-around'>
        <div className="col mx-1 main-container-upload mt-1 p-2">
        <progress value={progress} max="100"> </progress><br/>
  <label for="exampleFormControlInput1" className="form-label Apps-text fs-5" >Upload Logo</label>
  <input onChange={handelChange} type="file" className="form-control" />
  <Button className='mt-2' onClick={handelUpload} variant="danger">Upload Logo</Button>
 

</div>
{url ?<>
  <div className="col mx-1 main-container-upload mt-1 p-2">
  <progress value={progress1} max="100"> </progress><br/>
  <label for="exampleFormControlInput1" className="form-label Apps-text fs-5" >Upload Image</label>
  <input onChange={handelChange1} type="file" className="form-control" />
  <Button onClick={handelUpload1} className='mt-2' variant="danger">Upload Image</Button>
  

</div>
</>:<></>}


{/* upload apk */}
{url1 ?<>
  <div className="col mx-1 main-container-upload mt-1 p-2">
  <progress value={progress2} max="100"> </progress><br/>
  <label for="exampleFormControlInput1" className="form-label Apps-text fs-5" >Upload Apk</label>
  <input onChange={handelChange2} type="file" className="form-control" />
  <Button onClick={handelUpload2} className='mt-2' variant="danger">Upload Apk</Button>
  

</div>
</>:<></>}
{url2 ?<>
  <div className="col mx-1 main-container-upload mt-1 p-2">
 
  <div className='my-1'>
  <label for="exampleFormControlInput1" className="form-label Apps-text fs-5" >App Name</label>
  <input  type="text" value={name} onChange={(e) => setname(e.target.value)} className="form-control" placeholder='Add App Name' />
 
  </div>
  <div className='my-1'>
  <label for="exampleFormControlInput1" className="form-label Apps-text fs-5" >Version</label>
  <input  type="text" value={version} onChange={(e) =>setversion(e.target.value)} className="form-control" placeholder='Version' />
 
  </div>
  <div className='my-1'>
  <label for="exampleFormControlInput1" className="form-label Apps-text fs-5" >Price</label>
  <input  type="text" value={price} onChange={(e) =>setprice(e.target.value)} className="form-control" placeholder='Version' />
 
  </div>
  <div className='my-1'>
  <label for="exampleFormControlInput1" className="form-label Apps-text fs-5" >Description</label>
  <textarea rows='2' value={desc} onChange={(e) =>setdesc(e.target.value)}  type="text" className="form-control" placeholder='Description' />
 
  </div>
  <div className='my-1'>
  <label for="exampleFormControlInput1" className="form-label Apps-text fs-5" >Category</label>
  <select  value={category} onChange={(e) => setcategory(e.target.value)} className="form-select " required>
                      <option selected disabled value="">Category</option>
                      {
                        cat.map((i, index) => (

                          <option value={`${i.Category}`} key={index}>{i.Category}</option>
                        ))}
                    </select>
  </div>


  <div className='my-1'>
  <label for="exampleFormControlInput1" className="form-label Apps-text fs-5" >Type Of Content For Marketing</label>
                    <select  value={marketing} onChange={(e) => setmarketing(e.target.value)} className="form-select " required>
                      <option selected disabled value=""> Type Of Content For Marketing </option>
                    

                          <option >Blog</option>
                          <option >Posters</option>
                       
                          <option >Video</option>
                    </select>
                    
                  </div>
                 
                  <div className='my-1'>
  <label for="exampleFormControlInput1" className="form-label Apps-text fs-5" >Select Language For Marketing </label>
                    <select  value={language} onChange={(e) => setlanguage(e.target.value)} className="form-select " required>
                      <option selected disabled value=""> Select Language For Marketing </option>
                    

                          <option >English</option>
                          <option >Hindi</option>
                       
                         
                    </select>
                    
                  </div>
                  <div className='my-1'>
  <label for="exampleFormControlInput1" className="form-label Apps-text fs-5" >Select Type of Targeted Audience</label>
                    <select  value={comunity} onChange={(e) => setcomunity(e.target.value)} className="form-select " required>
                      <option selected disabled value="">Select Type of Targeted Audience </option>
                    

                          <option >Local</option>
                          <option >National</option>
                       
                          <option >International</option>
                    </select>
                    
                  </div>
                  <div className='my-1'>
  <label for="exampleFormControlInput1" className="form-label Apps-text fs-5" >Select Age Of Target Audience</label>
                    <select  value={target} onChange={(e) => settarget(e.target.value)} className="form-select" required>
                      <option selected disabled value=""> Select Age Of Target Audience</option>
                    

                          <option >Everyone</option>
                          <option >5+</option>
                          <option >15+</option>
                          <option >19+</option>
                         
                    </select>
                    
                  </div>

</div>

<Button onClick={Submit1} className='mx-1 mt-2 Apps-text fs-5 fw-normal text-white' variant="success">Upload Your App </Button>
</>:<></>}
{/* paid section ends */}
        </div>


          </div>

        
      {/* free app container ends here */}
     
     </>:<></>}
     {type === "Free App" ?<>
     
     {/* free App container */}
        <div className='container-fluid upload_container p-2'>
          
        <div className='d-flex flex-column justify-content-around'>
        <div className="col mx-1 main-container-upload mt-1 p-2">
        <progress value={progress} max="100"> </progress><br/>
  <label for="exampleFormControlInput1" className="form-label Apps-text fs-5" >Upload Logo</label>
  <input onChange={handelChange} type="file" className="form-control" />
  <Button className='mt-2' onClick={handelUpload} variant="danger">Upload Logo</Button>
 

</div>
{url ?<>
  <div className="col mx-1 main-container-upload mt-1 p-2">
  <progress value={progress1} max="100"> </progress><br/>
  <label for="exampleFormControlInput1" className="form-label Apps-text fs-5" >Upload Image</label>
  <input onChange={handelChange1} type="file" className="form-control" />
  <Button onClick={handelUpload1} className='mt-2' variant="danger">Upload Image</Button>
  

</div>
</>:<></>}


{/* upload apk */}
{url1 ?<>
  <div className="col mx-1 main-container-upload mt-1 p-2">
  <progress value={progress2} max="100"> </progress><br/>
  <label for="exampleFormControlInput1" className="form-label Apps-text fs-5" >Upload Apk</label>
  <input onChange={handelChange2} type="file" className="form-control" />
  <Button onClick={handelUpload2} className='mt-2' variant="danger">Upload Apk</Button>
  

</div>
</>:<></>}
{url2 ?<>
  <div className="col mx-1 main-container-upload mt-1 p-2">
 
  <div className='my-1'>
  <label for="exampleFormControlInput1" className="form-label Apps-text fs-5" >App Name</label>
  <input  type="text" value={name} onChange={(e) => setname(e.target.value)} className="form-control" placeholder='Add App Name' />
 
  </div>
  <div className='my-1'>
  <label for="exampleFormControlInput1" className="form-label Apps-text fs-5" >Version</label>
  <input  type="text" value={version} onChange={(e) =>setversion(e.target.value)} className="form-control" placeholder='Version' />
 
  </div>
  <div className='my-1'>
  <label for="exampleFormControlInput1" className="form-label Apps-text fs-5" >Description</label>
  <textarea rows='2' value={desc} onChange={(e) =>setdesc(e.target.value)}  type="text" className="form-control" placeholder='Description' />
 
  </div>
  <div className='my-1'>
  <label for="exampleFormControlInput1" className="form-label Apps-text fs-5" >Category</label>
  <select  value={category} onChange={(e) => setcategory(e.target.value)} className="form-select " required>
                      <option selected disabled value="">Category</option>
                      {
                        cat.map((i, index) => (

                          <option value={`${i.Category}`} key={index}>{i.Category}</option>
                        ))}
                    </select>
  </div>


  <div className='my-1'>
  <label for="exampleFormControlInput1" className="form-label Apps-text fs-5" >Type Of Content For Marketing</label>
                    <select  value={marketing} onChange={(e) => setmarketing(e.target.value)} className="form-select " required>
                      <option selected disabled value=""> Type Of Content For Marketing </option>
                    

                          <option >Blog</option>
                          <option >Posters</option>
                       
                          <option >Video</option>
                    </select>
                    
                  </div>
                 
                  <div className='my-1'>
  <label for="exampleFormControlInput1" className="form-label Apps-text fs-5" >Select Language For Marketing </label>
                    <select  value={language} onChange={(e) => setlanguage(e.target.value)} className="form-select " required>
                      <option selected disabled value=""> Select Language For Marketing </option>
                    

                          <option >English</option>
                          <option >Hindi</option>
                       
                         
                    </select>
                    
                  </div>
                  <div className='my-1'>
  <label for="exampleFormControlInput1" className="form-label Apps-text fs-5" >Select Type of Targeted Audience</label>
                    <select  value={comunity} onChange={(e) => setcomunity(e.target.value)} className="form-select " required>
                      <option selected disabled value="">Select Type of Targeted Audience </option>
                    

                          <option >Local</option>
                          <option >National</option>
                       
                          <option >International</option>
                    </select>
                    
                  </div>
                  <div className='my-1'>
  <label for="exampleFormControlInput1" className="form-label Apps-text fs-5" >Select Age Of Target Audience</label>
                    <select  value={target} onChange={(e) => settarget(e.target.value)} className="form-select" required>
                      <option selected disabled value=""> Select Age Of Target Audience</option>
                    

                          <option >Everyone</option>
                          <option >5+</option>
                          <option >15+</option>
                          <option >19+</option>
                         
                    </select>
                    
                  </div>

</div>

<Button onClick={Submit} className='mx-1 mt-2 Apps-text fs-5 fw-normal text-white' variant="success">Upload Your App </Button>
</>:<></>}
        </div>


          </div>

        
      {/* free app container ends here */}
     
     </>:<></>}
      </div>
      </div>
    </div>
  )
}
