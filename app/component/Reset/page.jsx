"use client"

import React, { useState } from 'react';
import styles from './reset.module.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Reset() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const[error,setError]=useState("")

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/send-otp`, { email });
      localStorage.setItem('resetEmail', email);
      router.push('/component/otp'); // Redirect to OTP page
    } catch (error) {
      console.error("Error sending OTP", error);
      if (error.response && error.response.status === 404) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.reset}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.h1}>Password Reset</h1>
        {error && <p>{error}</p>}
        <input
          className={styles.email}
          type='email'
          name='email'
          placeholder='Enter email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type='submit' className={styles.button}>Send</button>
      </form>
    </div>
  );
}
