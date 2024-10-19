"use client";


import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./register.module.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // পাসওয়ার্ডের জন্য যাচাইকরণ
    const isPasswordValid = validatePassword(password);
    if (!isPasswordValid) {
      setError("Password must be exactly 6 digits and cannot be all the same digit or sequential digits.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        email,
        password,
      });
      console.log(response);
      router.push("/component/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  // পাসওয়ার্ড যাচাইকরণ ফাংশন
  const validatePassword = (password) => {
    // পাসওয়ার্ডের দৈর্ঘ্য 6 হওয়া উচিত
    if (password.length !== 6) return false;

    // পাসওয়ার্ডে শুধুমাত্র সিরিয়াল ডিজিট থাকতে পারবে না (যেমন: 111111 বা 123456)
    const isAllSameDigit = /^(\d)\1*$/.test(password);
    if (isAllSameDigit) return false;

    // সিরিয়াল ডিজিট যাচাইকরণ (যেমন: 123456, 234567 ইত্যাদি)
    const isSequential = /^[0-9]{6}$/.test(password) && password.split('').every((digit, index, arr) => {
      return index === 0 || (parseInt(digit) === parseInt(arr[index - 1]) + 1);
    });
    if (isSequential) return false;

    return true;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        If this is your first visit to my site, please register first.
      </h2>
      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
          className={styles.inputField}
        />
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
          className={styles.inputField}
        />
        <br />
        <button type="submit" className={styles.submitButton}>
          Register
        </button>
      </form>
    </div>
  );
}
