"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import google from "../../../public/images/google.svg";
import facebook from "../../../public/images/facebook.svg";
import apple from "../../../public/images/apple.svg";
import user from "../../../public/images/person.svg";
import mail from "../../../public/images/mail.svg";
import lock from "../../../public/images/lock.svg";
import styles from "./styles.module.css";
import FilledButton from "../../components/buttons/FilledButton";
import backArrow from "../../../public/images/arrow_back.svg";
import Link from 'next/link';
import { useFormik } from "formik";
import { schema } from "../../schema/schema";
import { toast } from 'react-toastify';
import { GoEye, GoEyeClosed } from "react-icons/go";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";

const SignUp = () => {
  const { data: session, status } = useSession();
  console.log(session?.user);

  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: { username: '', email: '', password: '', name: "Andy warhool", location: "" },
    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting }) => {
      setError('');
      setSuccess('');
      setSubmitting(true);

      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.status === 201) {
          setSuccess("User created successfully!");
          toast.success("User created successfully!");
          router.push("/login");
        } else {
          const errorMessage = await response.text();

          if (errorMessage.includes("The email already exists")) {
            toast.error("User with this email already exists!");
          } else {
            toast.error(errorMessage);
          }
        }
      } catch (error) {
        setError('An unexpected error occurred. Please try again.');
        toast.error('An unexpected error occurred. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const isValid = await formik.validateForm();

    if (Object.keys(isValid).length === 0) {
      formik.handleSubmit();
    } else {
      formik.setTouched({
        username: true,
        email: true,
        password: true,
        location: true,
        name: true,
      });
    }
  };

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return null;
  }

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
            <form className={styles.form} onSubmit={handleFormSubmit}>
              <div className={styles.inputField}>
                <Image src={user} alt='User' />
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={styles.input}
                  required
                  autoComplete='off'
                />
                {formik.errors.username && formik.touched.username && (
                  <p className={styles.error}>{formik.errors.username}</p>
                )}
              </div>
              <div className={styles.inputField}>
                <Image src={mail} alt='Mail' />
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={styles.input}
                  required
                  autoComplete='off'
                />

                {formik.errors.email && formik.touched.email && (
                  <p className={styles.error}>{formik.errors.email}</p>
                )}
              </div>
              <div className={styles.inputField}>
                <Image src={lock} alt='Lock' />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={styles.input}
                  required
                  autoComplete='off'
                />
                {showPassword ? (
                  <GoEye onClick={handleShowPassword} size={24} color='#737373' />
                ) : (
                  <GoEyeClosed onClick={handleShowPassword} size={24} color='#737373' />
                )}
                {formik.errors.password && formik.touched.password && (
                  <p className={styles.error}>{formik.errors.password}</p>
                )}
              </div>
              <button className={styles.signUpButton} type="submit" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? "Signing In..." : "Sign Up"}
              </button>
            </form>

            <div className={styles.orContainer}>
              <div className={styles.line1}></div>
              <div className={styles.text}>or</div>
              <div className={styles.line2}></div>
            </div>

            <div className={styles.loginButtons}>
              <button className={`${styles.button} ${styles.googleButton}`} onClick={() => signIn('google', { callbackUrl: '/' })}>
                <Image src={google} alt="Google logo" /> Sign up with Google
              </button>
              <button className={`${styles.button} ${styles.facebookButton}`}>
                <Image src={facebook} alt="Facebook logo" /> Sign up with Facebook
              </button>
              <button className={`${styles.button} ${styles.appleButton}`}>
                <Image src={apple} alt="Apple logo" /> Sign up with Apple
              </button>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
