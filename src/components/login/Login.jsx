"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import google from "../../../public/images/google.svg";
import facebook from "../../../public/images/facebook.svg";
import apple from "../../../public/images/apple.svg";
import mail from "../../../public/images/mail.svg";
import lock from "../../../public/images/lock.svg";
import styles from "./styles.module.css";
import FilledButton from "../buttons/FilledButton";
import backArrow from "../../../public/images/arrow_back.svg";
import Link from 'next/link';
import { toast } from 'react-toastify';

const Login = () => {
    const { data: session, status } = useSession()
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!email || !password) {
            toast.error("Please provide both email and password.");
            setIsSubmitting(false);
            return;
        }

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result.error) {
                toast.error(result.error || 'Login failed. Please try again.');
            } else {
                toast.success("Logged in successfully!");
                router.push('/');
            }
        } catch (error) {
            console.error("Error during login:", error.message);
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleLogin = () => {
        signIn('google', { callbackUrl: '/' });
    };


    useEffect(() => {
        if (session) {
            router.push("/")
        }
    }, [session, router])
    if (status === "loading") {
        return <p>Loading...</p>

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
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.inputField}>
                                <Image src={mail} alt='Mail' />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className={styles.input}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.inputField}>
                                <Image src={lock} alt='Lock' />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className={styles.input}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                className={styles.signUpButton}
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Signing In...' : 'Sign In'}
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
