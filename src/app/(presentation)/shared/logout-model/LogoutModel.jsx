// LogoutModel.js
"use client";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import styles from "./logout.module.css";
import { useState } from "react";
import modelImg from "../../../../../public/modelImage.jpg"
import Image from "next/image";
import { signOut } from "next-auth/react"

const LogoutModel = ({ isOpen, onClose }) => {
    const handleLogout = () => {
        signOut({ callbackUrl: "/onboarding" });
        onClose();
    };


    return (
        <div>
            <Modal isOpen={isOpen} placement="top-center" onClose={onClose}>
                <ModalContent>
                    <>
                        <ModalBody className="text-center flex justify-center">
                            <ModalHeader className="text-[28px] text-center">Are you sure?</ModalHeader>

                            <div className="w-full flex justify-center">
                                <Image src={modelImg} alt="model image" width={150} height={150} />
                            </div>

                        </ModalBody>
                        <ModalFooter className="flex items-center justify-center">
                            <Button color="primary" onClick={handleLogout}>
                                Logout
                            </Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default LogoutModel;
