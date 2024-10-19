"use client";

import React, { useEffect } from 'react';
import styles from './profile.module.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Page() {
  const router=useRouter()
  useEffect(()=>{
    const token=localStorage.getItem("token");
    axios.get("http://localhost:4000/api/profile",{
      headers:{
        Authorization:token
      }
    })
    .then((res)=>console.log(res))
    .catch((err)=>{
      router.push("/component/login")
    })
  },[])

  return (
    <div className={styles.profile}>
      <h1>My Profile.....</h1>
    </div>
  );
}

