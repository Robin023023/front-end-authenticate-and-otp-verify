"use client"

import React, { useState,useEffect } from 'react';
import styles from './password.module.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function NewPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch email from localStorage
    const storedEmail = localStorage.getItem('resetEmail');
    if (storedEmail) {
        setEmail(storedEmail);
    } else {
        // Redirect to forget password if no email is found
        router.push('/component/Reset');
    }
}, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await axios.post('http://localhost:4000/api/reset-password', { email, newPassword: password });
      localStorage.removeItem('resetEmail')
      router.push('/component/login'); // Redirect to login page
    } catch (error) {
      console.error("Password reset failed", error);
    }
  };

  return (
    <div className={styles.newpassword}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.h1}>Set New Password</h1>
        {error && <p>{error}</p>}
        <input
          className={styles.password}
          type='password'
          placeholder='Enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className={styles.password}
          type='password'
          placeholder='Confirm password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className={styles.button}>Submit</button>
      </form>
    </div>
  );
}
