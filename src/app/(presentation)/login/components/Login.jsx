"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import google from "../../../../../public/images/google.svg";
import facebook from "../../../../../public/images/facebook.svg";
import apple from "../../../../../public/images/apple.svg";
import mail from "../../../../../public/images/mail.svg";
import lock from "../../../../../public/images/lock.svg";
import styles from "./login.module.css";
import FilledButton from "../../shared/buttons/FilledButton";
import backArrow from "../../../../../public/images/arrow_back.svg";
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as Yup from 'yup';


const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
});

const Login = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            const { email, password } = values;

            try {
                const result = await signIn('credentials', {
                    redirect: false, // Do not redirect automatically, handle manually
                    email,
                    password,
                });

                if (result?.error) {
                    toast.error(result.error || 'Login failed. Please try again.');
                } else {
                    toast.success("Logged in successfully!");
                    router.push('/');
                }
            } catch (error) {
                console.error("Error during login:", error.message);
                toast.error("An error occurred. Please try again.");
            } finally {
                setSubmitting(false);
            }
        }
    });

    const handleGoogleLogin = () => {
        signIn('google', { callbackUrl: '/' });
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
                    <div className={styles.box}>
                        <h1>Hello, Friend</h1>
                        <p>It is a long established fact that a reader will be distracted by the readable.</p>
                        <FilledButton label="Sign In" />
                    </div>
                </div>
                <div className={styles.right_col}>
                    <title>Sign In to BandWagon</title>
                    <div className={styles.arrow}>
                        <Link href="/">
                            <Image src={backArrow} alt='Arrow icon' />
                        </Link>
                    </div>

                    <main className={styles.main}>
                        <h1 className={styles.title}>Sign In to BandWagon</h1>
                        <form className={styles.form} onSubmit={formik.handleSubmit}>
                            <div className={styles.inputField}>
                                <Image src={mail} alt='Mail' />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className={styles.input}
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <p className={styles.error}>{formik.errors.email}</p>
                                ) : null}
                            </div>
                            <div className={styles.inputField}>
                                <Image src={lock} alt='Lock' />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className={styles.input}
                                    {...formik.getFieldProps('password')}
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <p className={styles.error}>{formik.errors.password}</p>
                                ) : null}
                            </div>
                            <button
                                className={styles.signUpButton}
                                type="submit"
                                disabled={formik.isSubmitting}
                            >
                                {formik.isSubmitting ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>
                        <div className={styles.orContainer}>
                            <div className={styles.line1}></div>
                            <div className={styles.text}>or</div>
                            <div className={styles.line2}></div>
                        </div>
                        <div className={styles.loginButtons}>
                            <button
                                className={`${styles.button} ${styles.googleButton}`}
                                onClick={handleGoogleLogin}
                            >
                                <Image src={google} alt="Google logo" /> Sign in with Google
                            </button>
                            <button className={`${styles.button} ${styles.facebookButton}`}>
                                <Image src={facebook} alt="Facebook logo" /> Sign in with Facebook
                            </button>
                            <button className={`${styles.button} ${styles.appleButton}`}>
                                <Image src={apple} alt="Apple logo" /> Sign in with Apple
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </section>
    );
};

export default Login;
