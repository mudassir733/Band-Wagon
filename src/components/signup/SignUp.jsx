"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import google from "../../../public/images/google.svg"
import facebook from "../../../public/images/facebook.svg"
import apple from "../../../public/images/apple.svg"
import user from "../../../public/images/person.svg"
import mail from "../../../public/images/mail.svg"
import lock from "../../../public/images/lock.svg"
import styles from "./styles.module.css"
import FilledButton from "../../components/buttons/FilledButton"
import backArrow from "../../../public/images/arrow_back.svg"
import Link from 'next/link';

const SignUp = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const handleSignUp = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      if (response.status === 201) {
        setSuccess("User created successfully!");
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.row}>
        <div className={styles.left_col}>
          <Link href="/login" className={styles.box}>
            <h1>Welcome back</h1>
            <p>It is a long established fact that a reader will be distracted by the readable.</p>
            <FilledButton label="Sign Up" />
          </Link>
        </div>
        <div className={styles.right_col}>
          <title>Create an account</title>
          <div className={styles.arrow}>
            <Link href="/onboarding">
              <Image src={backArrow} alt='Arrow icon' />
            </Link>
          </div>

          <main className={styles.main}>
            <h1 className={styles.title}>Create an account</h1>
            <form className={styles.form} onSubmit={handleSignUp}>
              <div className={styles.inputField}>
                <Image src={user} alt='User' />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.inputField}>
                <Image src={mail} alt='Mail' />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.inputField}>
                <Image src={lock} alt='Lock' />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>
              <button className={styles.signUpButton} type="submit">Sign Up</button>
            </form>

            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}

            <div className={styles.orContainer}>
              <div className={styles.line1}></div>
              <div className={styles.text}>or</div>
              <div className={styles.line2}></div>
            </div>

            <div className={styles.loginButtons}>
              <button className={`${styles.button} ${styles.googleButton}`}>
                <Image src={google} /> Sign up with Google
              </button>
              <button className={`${styles.button} ${styles.facebookButton}`}>
                <Image src={facebook} /> Sign up with Facebook
              </button>
              <button className={`${styles.button} ${styles.appleButton}`}>
                <Image src={apple} />Sign up with Apple
              </button>
            </div>
          </main>
        </div>
      </div>
    </section>
  )
}

export default SignUp;
