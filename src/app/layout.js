"use client"
import "./globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from "next-auth/react";




export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="en">
        <body
          className={`antialiased`}
        >
          {children}
          <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover={false} draggable theme="colored" />
        </body>
      </html>
    </SessionProvider>

  );
}
