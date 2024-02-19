"use client"
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";

export default function Categories(){
    const [admin,setAdmin]= useState(false)
    useEffect(()=>{
        fetch('/api/profile').then(response=>{
            response.json().then(data=>{
                setAdmin(data.admin)
            })
        })
    })
    if(!admin){
        return 'Not an Admin!';
    }
    return(
        <section className="mt-8 max-w-lg mx-auto">
            <UserTabs admin={true}/>

        </section>
    )
}