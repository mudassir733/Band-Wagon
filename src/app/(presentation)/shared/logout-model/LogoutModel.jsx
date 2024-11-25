// LogoutModel.js
"use client";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import styles from "./logout.module.css";
import { useState } from "react";
import modelImg from "../../../../../public/modelImage.jpg"
import Image from "next/image";
import { signOut } from "next-auth/react"
import { resetState } from "../../../../config/store/features/ProfileSlice/profileScreen"
import { useDispatch } from "react-redux"
import { userService } from "../../../(application)/services/user.service.js"
import { toast } from "react-toastify"
import { useSession } from "next-auth/react";


const LogoutModel = ({ isOpen, onClose, userId }) => {
    const { data: session } = useSession()
    const dispatch = useDispatch()
    const handleLogoutWithRoleReset = async () => {
        try {
            const response = await userService.updateRole(session?.user?.id, "user");
            console.log("Role update response:", response);

            dispatch(resetState());
            signOut({ callbackUrl: "/onboarding" });
            onClose();
        } catch (error) {
            console.error("Role update failed:", error.response || error);
            toast.error("Failed to reset role. Please try again.");
        }
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
                            <Button color="primary" onClick={handleLogoutWithRoleReset}>
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
