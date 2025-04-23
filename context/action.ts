"use server"

import { auth } from "@/firebase/sever";
import { cookies } from "next/headers";

export const removeToken = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("firebaseAuthToken");
    cookieStore.delete("firebaseRefreshToken");

}

export const setToken = async ({
    token,
    refreshToken
}
: {
    token: string;
    refreshToken: string;
}) => {
    try{
        const verifiedToken = await auth.verifyIdToken(token);
        if(!verifiedToken) {
           return
        }
        //在這裡讓firebase知道這裡要加上管理員的權限
        const userRecord = await auth.getUser(verifiedToken.uid);
        if(process.env.ADMIN_EMAIL === userRecord.email && !userRecord.customClaims?.admin){
            auth.setCustomUserClaims(verifiedToken.uid,{
                admin:true
            });
        }

        const cookieStore = await cookies();
        cookieStore.set("firebaseAuthToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });
        cookieStore.set("firebaseRefreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });

    } catch (error) {
        console.log(error)
    }
}