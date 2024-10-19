"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./register.module.css";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4000/api/register`, {
        email,
        password,
      });
      console.log(response)
      router.push("/component/login");
    } catch (error) {
      if(error.response && error.response.status === 400){
        setError(error.response.data);
        console.log(error)
      }
      else{
        setError("An unexpected error occured.Please try again")
      }
      
    }
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


