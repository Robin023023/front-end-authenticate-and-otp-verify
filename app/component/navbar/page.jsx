// components/Navbar.js
"use client"

import React, { useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();

  const handleyesno = () => {
    router.push("/component/yesno");
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        MyLogo
      </Link>
      <ul className={`${styles.navLinks} ${isOpen ? styles.active : ""}`}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/component/About">About</Link>
        </li>

        <li>
          <Link href="/component/Profile">Profile</Link>
        </li>

        <li onClick={handleyesno}>
          <Link href="/component/yesno">Logout</Link>
        </li>
      </ul>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
