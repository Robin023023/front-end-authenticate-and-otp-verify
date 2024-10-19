"use client";

import React from 'react';
import styles from './yesno.module.css';
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleYes = () => {
    localStorage.removeItem("token"); // টোকেন সরানো
    router.push("/component/login"); // লগআউটের পর লগিন পেজে পাঠানো
  };

  const handleNo = () => {
    router.push("/component/Home"); // যদি না চান তাহলে হোম পেজে নিয়ে যাওয়া
  };

  return (
    <div className={styles.yesno}>
      <div className={styles.box}>
      <button onClick={handleYes} className={styles.button1}>Yes</button>
      <button onClick={handleNo} className={styles.button2}>No</button>
      </div>
    </div>
  );
}
