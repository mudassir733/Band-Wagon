"use client";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { NextUIProvider } from '@nextui-org/react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../config/store/store';
import ParentLayout from "./(presentation)/shared/Layout/ParentLayout"


const AuthChecker = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/onboarding");
    }
  }, [session, router, status]);

  return <>{children}</>;
};

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={`antialiased`}>
          <AuthChecker>
            <ReduxProvider store={store}>
              <NextUIProvider>
                <ParentLayout>

                  {children}
                </ParentLayout>
              </NextUIProvider>
            </ReduxProvider>
          </AuthChecker>
          <ToastContainer
            position="top-center"
            autoClose={2000}
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
