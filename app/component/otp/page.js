"use client";

import React, { useState } from 'react';
import styles from './otp.module.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Otp() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/verify-otp`, { otp });
      router.push('/component/newpassword'); // Redirect to new password page
    } catch (error) {
      console.error("OTP verification failed", error);
      
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message); // নির্দিষ্ট বার্তা দেখান
      } 
       else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className={styles.otpform}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.h1}>OTP Verification</h1>
        {error && <p className={styles.error}>{error}</p>}
        <input
          className={styles.otp}
          type='text'
          placeholder='Enter OTP'
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button type='submit' className={styles.button}>Verify</button>
      </form>
    </div>
  );
}
