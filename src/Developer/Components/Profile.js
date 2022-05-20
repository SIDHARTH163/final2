import React , {useState , useEffect} from 'react'
import { db } from '../../Firebase'
import './Profile.css'
export default function Profile({user}) {
    const [data,setdata]=useState('')
    useEffect(()=>{
        if(user){
            const docRef =db.collection('Profiles').doc(user.uid)
            docRef.onSnapshot(docSnap=>{
                if(docSnap.exists){
                    
                    setdata(docSnap.data())
                    // console.log(data,'user data')
                   
                }else{
                    console.log("no docs")
                }
            })
    
        }else{
            console.log("login first")
        }
    },)
    
  return (
    <div>
      <div class="page-content page-container" id="page-content">
    <div class="p-1 mt-5 mb-5">
        <div class="row container d-flex justify-content-center">
<div class="col-xl-6 col-md-12">
                                                <div class="card user-card-full">
                                                    <div class="row m-l-0 m-r-0">
                                                        <div class="col-sm-4 bg-c-lite-green user-profile">
                                                            <div class="card-block text-center text-white">
                                                                <div class="m-b-25">
                                                                    <img src="https://img.icons8.com/bubbles/100/000000/user.png" class="img-radius" alt="User-Profile-Image"/>
                                                                </div>
                                                                <h6 class="f-w-600">{data.name}</h6>
                                                                <p>Designer</p>
                                                                <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-8">
                                                            <div class="card-block">
                                                                <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                                                <div class="row">
                                                                    <div class="col-sm-6">
                                                                        <p class="m-b-10 f-w-600">Email</p>
                                                                        <h6 class="text-muted f-w-400">{data.email}</h6>
                                                                    </div>
                                                                    <div class="col-sm-6">
                                                                        <p class="m-b-10 f-w-600">Phone</p>
                                                                        <h6 class="text-muted f-w-400">{data.phone}</h6>
                                                                    </div>
                                                                </div>
                                                                <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Address</h6>
                                                                <div class="row">
                                                                    <div class="col-sm-6">
                                                                        <p class="m-b-10 f-w-600">Country</p>
                                                                        <h6 class="text-muted f-w-400">{data.country}</h6>
                                                                    </div>
                                                                    <div class="col-sm-6">
                                                                        <p class="m-b-10 f-w-600">State</p>
                                                                        <h6 class="text-muted f-w-400">{data.state}</h6>
                                                                    </div>
                                                                </div>
                                                              
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                             </div>
                                                </div>
                                            </div>
    </div>
  )
}
