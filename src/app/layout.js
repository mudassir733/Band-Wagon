"use client";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthChecker = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
    }
  }, [session, router, status]);

  return <>{children}</>;
};

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={`antialiased`}>
          <AuthChecker>{children}</AuthChecker>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover={false}
            draggable
            theme="colored"
          />
        </body>
      </html>
    </SessionProvider>
  );
}
