"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useAuth } from "@/context/auth";


export default function ContinueWithGoogleBtn() {
    const auth = useAuth();
    const router = useRouter();
    return (
        <Button onClick={async () => {
            await auth?.loginWithGoogle();
            router.refresh();
        }} 
        className="w-full">
            Countinue with Google
        </Button>
    );
}