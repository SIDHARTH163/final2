import React, { useState, useEffect } from 'react'
import { db , serverTimestamp , storage } from '../Firebase';
import './Admin.css'


export default function Free_upload() {
  const [loading, setLoading] = useState(true);
  const [cat, setcat] = useState([])
  const [version , setversion]=useState('')
  const [dname , setdname]=useState('')
  const [name , setname]=useState('')
  const [desc , setdesc]=useState('')
  const [category , setcategory]=useState('')
  const [img , setimg]=useState('')
  const [img1 , setimg1]=useState('')
  const [img2 , setimg2]=useState('')
  const [img3 , setimg3]=useState('')
  const [logo , setlogo]=useState('')
 // varialbles for app upload
 const [image, setImage] = useState(null);
 const [url, setUrl] = useState('');
 
 const [progress, setprogress] = useState(0);
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
    return <></>
      ;
  }

  // upload
  const handelChange = (e) => {

    if (e.target.files[0]) {
      setImage(e.target.files[0]);

    }
  };
  const handelUpload = () => {
   

    const uplaodTask = storage.ref(`Free Apps/${image.name}`).put(image);
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
        storage.ref("Free Apps")
          .child(image.name)
          .getDownloadURL()
          .then(url => {

            setUrl(url)
            window.alert("Apk  Uploaded Successfully,Click Ok To Continue")
          })
      }
    );
  };
  // ends

  const Submit = async (e) => {
    e.preventDefault();
    try {
      await db.collection('Uploads').add({
        name,desc ,category , img , img1 , img2 , img3 , logo , apk:url , dname:dname, version ,

        time: serverTimestamp()
      })
      //   M.toast({html: 'Blog Created',classes:"green"}) 
      console.log("app uploaded")
      window.alert(`dear  app submitted to Abtaran`)
     
    } catch (err) {

     window.alert('falid')
      // router.push("/Developers/Dashboard")
    }

  }
  return (
    <div className='bg-light main-container'>
      <div className="form-body body">
        <div className="row">
          <div className="form-holder">
            <div className="form-content">
              <div className="form-items">
                <h3>Upload Free Apps</h3>
                <p>Fill in the data below.</p>
               

                  <div className="col-md-12">
                    <input  value={name} onChange={(e) => setname(e.target.value)} className="form-control" type="text" name="name" placeholder="Full Name Of App" required />
                    <div className="valid-feedback">Appname field is valid!</div>
                    <div className="invalid-feedback">Appname field cannot be blank!</div>
                  </div>

                  <div className="col-md-12 my-1">
                    <textarea  value={desc} onChange={(e) => setdesc(e.target.value)} rows="1" className="form-control" type="text" name="desc" placeholder="Desc" required />
                    <div className="valid-feedback">Description Of App</div>
                    <div className="invalid-feedback">Desc field cannot be blank!</div>
                  </div>
                  <div className="col-md-12">
                    <input  value={version} onChange={(e) => setversion(e.target.value)} className="form-control" type="text" name="name" placeholder="version" required />
                    <div className="valid-feedback">Appname field is valid!</div>
                    <div className="invalid-feedback">Appname field cannot be blank!</div>
                  </div>
                  <div className="col-md-12">
                    <select  value={category} onChange={(e) => setcategory(e.target.value)} className="form-select mt-3" required>
                      <option selected disabled value="">Category</option>
                      {
                        cat.map((i, index) => (

                          <option value={`${i.Category}`} key={index}>{i.Category}</option>
                        ))}
                    </select>
                    <div className="valid-feedback">You selected a position!</div>
                    <div className="invalid-feedback">Please select a position!</div>
                  </div>


                  <div className="col-md-12">
                    <label for="exampleInputPassword1" class="form-label">Image1</label>
                    <input  value={img} onChange={(e) => setimg(e.target.value)} className="form-control my-3" type="text" name="img" placeholder="Image" required />
                    <div className="valid-feedback">Image feild!</div>
                    <div className="invalid-feedback">Image field cannot be blank!</div>
                  </div>

                  <div className="col-md-12">
                    <label for="exampleInputPassword1" class="form-label">Image2</label>
                    <input  value={img1} onChange={(e) => setimg1(e.target.value)} className="form-control my-3" type="text" name="img" placeholder="Image" required />
                    <div className="valid-feedback">Image feild!</div>
                    <div className="invalid-feedback">Image field cannot be blank!</div>
                  </div>

                  <div className="col-md-12">
                    <label for="exampleInputPassword1" class="form-label">Image3</label>
                    <input  value={img2} onChange={(e) => setimg2(e.target.value)} className="form-control my-3" type="text" name="img" placeholder="Image" required />
                    <div className="valid-feedback">Image feild!</div>
                    <div className="invalid-feedback">Image field cannot be blank!</div>
                  </div>

                  <div className="col-md-12">
                    <label for="exampleInputPassword1" class="form-label">Image4</label>
                    <input  value={img3} onChange={(e) => setimg3(e.target.value)} className="form-control my-3" type="text" name="img" placeholder="Image" required />
                    <div className="valid-feedback">Image feild!</div>
                    <div className="invalid-feedback">Image field cannot be blank!</div>
                  </div>
                  <div className="col-md-12">
                    <label for="exampleInputPassword1" class="form-label">logo</label>
                    <input  value={logo} onChange={(e) => setlogo(e.target.value)} className="form-control my-3" type="text" name="img" placeholder="Image" required />
                    <div className="valid-feedback">Logo feild!</div>
                    <div className="invalid-feedback">Image field cannot be blank!</div>
                  </div>

                  <div className="col-md-12">
                    <label for="exampleInputPassword1" class="form-label"> Developer Name</label>
                    <input  value={dname} onChange={(e) => setdname(e.target.value)} className="form-control my-3" type="text" name="img" placeholder="Image" required />
                    
                  </div>
                  <div className="col-md-12">
                  <progress value={progress} max="100"> </progress><br/>
                    <label for="exampleInputPassword1" ClassName="form-label mt-1">Apk File</label>
                    <input  onChange={handelChange} className="form-control my-1" type="file" name="img" placeholder="Apk" required />
                    <div className=""><button className='btn-primary' onClick={handelUpload} >Upload Apk</button></div>
                    
                  </div>



                  {url?<>
                  
                    <div className="form-button mt-3">
                    <button onClick={Submit}  className="btn btn-primary">Register</button>
                  </div>
                  </>:<></>}


                 
                </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
