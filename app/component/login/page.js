"use client";

import React, { useState } from "react";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        email,
        password, 
      });

      localStorage.setItem("token", response.data.token);
      console.log(response)
      router.push("/component/Profile");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError(error.response.data.message);
      } else if (error.response && error.response.status === 402) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your Email"
          className={styles.inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className={styles.inputField}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit" className={styles.submitButton}>
          Login
        </button>
        <a className={styles.a} onClick={()=>router.push("/component/Reset")}>
          Forgotten password?
        </a>
        <hr className={styles.hr} />
        <button
          onClick={() => router.push("/component/register")}
          className={styles.button}
        >
          Create new account
        </button>
      </form>
    </div>
  );
}
