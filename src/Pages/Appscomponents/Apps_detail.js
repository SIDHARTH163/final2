import React, { useState, useEffect } from 'react'
import './app.css'
import { Modal, Button } from 'react-bootstrap';
import { db, serverTimestamp } from '../../Firebase'
export default function Apps_detail(props) {
  const [Allreviews, setAllreviews] = useState([])

  const [app, setapp] = useState('')
  const [datetime, sett] = useState('')
  const [email, setemail] = useState('')
  const [comments, setcomments] = useState('')
  const [show, setShow] = useState(false);
  const [rating, setrating] = useState(0)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const changeRating = (e) => {
    setrating(e.target.value)
  }
  // review 
  const loadcoments = async () => {
    const comments = await db.collection('Uploads').doc(props.match.params.id).collection('Reviews').orderBy('time', 'desc').get()
    setAllreviews(comments.docs.map(docSnap => docSnap.data()));

  };
  // reviews
  useEffect(() => {
    loadcoments();
    loadapps();

  })
  const loadapps = async () => {
    try {
      const docRef = db.collection("Uploads").doc(props.match.params.id);
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
  // reviews Logic here
  const Addreviews = async () => {
    // console.log(`REviews From params ${props.match.params.id} , ${rating}`)
    try {
       db.collection('Uploads').doc(`${props.match.params.id}`).collection('Reviews').add({
        email: email,
        comment: comments,
        rating: rating,
        time: serverTimestamp()

      })
      window.alert('Dear User Thanks For Your Review')
     
    } catch (error) {
      window.alert('Failed')
    }

 
  }

  return (
    <div className='container-fluid bg-light'>
      <div className='container bg-light  py-lg-5 px-lg-3 p-1'>

        <div className="d-flex flex-row rounded bg-white  mb-1">
          <div className="p-2 ">
            <img className='app-img ' width="80" height="80" alt="logo" src={app.logo}></img></div>
          <div className="p-2 ">
            <h5 className=' fs-3 fw-bolder Apps-texts text-justify mx-1 mt-1'>
              {app.name}
            </h5>
            <p className='small_texts  mx-1'>{app.developer}</p>
          </div>

        </div>
        {/* download button */}
        <div className='container my-1  p-1 d-grid gap-2'>
          <a href={app.apk} type="button" className="btn btn-success">Download</a>
        </div>
        {/* ends */}
        {/* reviews and comments section */}
        <div className="d-flex flex-row my-1 justify-content-between">
          <div className="px-2 py-1 bg-white col-sm-6 d-flex justify-content-center">
           
            <a href="#target"><Button variant="success" >

              {Allreviews.length} Reviews <span class="material-icons text-danger rev">
                reviews
              </span>
            </Button></a>
          </div>
          <div className="px-2 py-1 bg-white col-sm-6 d-flex justify-content-center">
            <Button variant="primary" onClick={handleShow}>

              Add Review <span class="material-icons text-warning rev">
                reviews
              </span>
            </Button>

            {/* modal */}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Review</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* form  */}
                <form>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" value={email} onChange={(e) => setemail(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Add Review</label>
                    <textarea type="text" value={comments} onChange={(e) => setcomments(e.target.value)} rows="3" class="form-control" id="exampleInputPassword1" placeholder="Add Comment / Review" />
                  </div>

                  <div className="form-group">
                    <label className="control-label col-sm-2" for="rating">Rate us: </label>
                    <div className="star__rating">
                      <label>
                        <input type="radio" name="stars" value="1" onChange={changeRating} />
                        <span className="icon">★</span>
                      </label>
                      <label>
                        <input type="radio" name="stars" value="2" onChange={changeRating} />
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                      </label>
                      <label>
                        <input type="radio" name="stars" value="3" onChange={changeRating} />
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                      </label>
                      <label>
                        <input type="radio" name="stars" value="4" onChange={changeRating} />
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                      </label>
                      <label>
                        <input type="radio" name="stars" value="5" onChange={changeRating} />
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                      </label>
                    </div>
                  </div>


                </form>
                {/* form Closes */}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={Addreviews}>
                  {/* Send Review <span className='material-icon'>rate_review</span> */}
                  Rate Now <span class="material-icons text-warning rev">
                    rate_review
                  </span>
                </Button>
              </Modal.Footer>
            </Modal>
            {/* modal */}
          </div>

        </div>
        {/* rand c ends */}
       
        {/* images */}
        <div className="d-flex flex-row justify-content-between  mb-3">
          <div className="p-2 ">
            <img className='app-img ' width="100%" height="100%" alt="logo" src={app.img}></img></div>

          <div className="p-2 ">
            <img className='app-img ' width="100%" height="100%" alt="logo" src={app.img1}></img></div>

          <div className="p-2 ">
            <img className='app-img ' width="100%" height="100%" alt="logo" src={app.img2}></img></div>

          <div className="p-2 ">
            <img className='app-img ' width="100%" height="100%" alt="logo" src={app.img3}></img></div>


        </div>
        {/* images  */}
        {/* desc */}
        <div className='container rounded bg-white my-1 description bg-white mb-3 p-1'>
          <h4 className=' Apps-texts fw-bold fs-5 text-center mx-1 mt-1'>
            Description
          </h4>
          <p className='small_texts  text-justify'>{app.desc}</p>
        </div>
        {/* desc */}
        {/* aditional setting */}
        <div className='container rounded bg-white description bg-white mb-2'>

          <h4 className=' Apps-texts fw-bold fs-5  mx-1 mt-1'>
            Additional App Information
          </h4>
          <div className="d-flex flex-column">
            <div className="col ">
              <p className='small_texts fs-6  mx-1'>verison: {app.version}</p>

            </div>
            <div className="col ">
              <p className='small_texts fs-6  mx-1'>Category: {app.category}</p>
            </div>
            <div className="col ">
              <p className='small_texts fs-6  mx-1'>Publish Date: {datetime}</p>
            </div>
            <div className="col ">
              <p className='small_texts fs-6  mx-1'>Available on: Playstore</p>
            </div>
            <div className="col ">
              <p className='small_texts fs-6  mx-1'>Requirements:Android 6+</p>
            </div>
            <div className="col ">
              <p className='small_texts fs-6  mx-1'>Develper/Company:Android 6+</p>
            </div>
          </div>
        </div>
        {/* sdditional info ends */}
        {/*comments setcion */}
        <div className='container rounded bg-white description bg-white'>
          <h4 id="target" className=' Apps-texts fw-bold fs-3 text-center mx-1 mt-1'>
            Comments And Reviews <span class="material-icons fs-3 text-primary">
              reviews
            </span>
          </h4>
          {/* <p className='small_texts  text-justify'>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
 */}

          {Allreviews.map((item, index) => (
            <div key={index} className="d-flex flex-row rounded bg-white justify-content-around  mb-1">
              <div className="p-2 ">
                <img className='app-img rounded-circle ' width="50" height="50" alt="logo" src={app.logo}></img></div>
              <div className="pt-4 ">
              <p className='small_texts  text-center '>
                  {item.rating === "5" ?<>
                  
                    <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                  </>:<>
                  {item.rating === "4"?<>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                  </>:<>
                  {item.rating === "3"?<>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                      
                  </>:<>
                  {item.rating === "2"?<>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                      
                  </>:<>
                  {item.rating === "1"?<>
                        <span className="icon">★</span>
                        
                  </>:<></>}
                  </>}
                  </>}
                  
                  </>}
                  
                  </>}
                </p>

              </div>
              <div className="pt-4 ">
                <p className='small_texts  text-justify '>{item.comment}</p>
              </div>

            </div>

          ))}

        </div>
        {/* section ends */}
      </div>
    </div>
  )
}
