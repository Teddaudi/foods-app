"use client";
import { useSession } from "next-auth/react"
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "../../components/layout/UserTabs"
import EditableImage from "../../components/layout/EditableImage"

export default function ProfilePage() {
    const session = useSession()
    const [userName, setUserName] = useState(session.data?.user?.name || "")
    const { status } = session;
    const [image, setImage] = useState('')
    const [phone, setPhone] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [admin, setAdmin] = useState(false);
    const [profileFetched,setProfileFetched] = useState(false)
    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data?.user?.name)
            setImage(session.data?.user.image)
            fetch('/api/profile')
                .then(response => {
                    response.json().then(data => {
                        setPhone(data.phone)
                        setPostalCode(data.postalCode)
                        setStreetAddress(data.streetAddress)
                        setCity(data.city)
                        setCountry(data.country)
                        setAdmin(data.admin)
                        setProfileFetched(true)
                    })
                })
        }
    }, [session, status])

    async function handleSubmit(ev) {
        ev.preventDefault();
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: userName,
                    image,
                    phone,
                    streetAddress,
                    postalCode,
                    city,
                    country
                })
            })
            if (response.ok)
                resolve()
            else
                reject()
        })
        await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: 'Profile saved!',
            error: 'Failed to save profile!'
        })

    }

    if (status === "loading" || !profileFetched) {
        return 'Loading...'
    }
    if (status === 'unauthenticated') {
        return redirect('/login')
    }
    return (
        <section className="mt-8">
            <UserTabs admin={admin}/>
            <h1 className="text-center text-primary text-4xl mb-4"
            ></h1>
            <div className="max-w-md mx-auto mt-8 ">
                <div className="flex gap-4 ">
                    <div>
                        <div className=" p-4 rounded-lg relative max-w-[120px]">
                            <EditableImage link={image} setLink={setImage}/>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="grow">
                        <label>First and last name</label>
                        <input type="text" placeholder="First and last name"
                            value={userName} onChange={e => setUserName(e.target.value)} />
                        <label>Email</label>
                        <input type="email" disabled={true} value={session.data.user.email} />
                        <label>Phone Number</label>
                        <input type="tel" placeholder="Phone Number"
                            value={phone} onChange={e => setPhone(e.target.value)} />
                        <label>Street Address</label>
                        <input type="text" placeholder="Street Address"
                            value={streetAddress} onChange={e => setStreetAddress(e.target.value)} />
                        <div className="flex gap-2 ">
                            <div>
                                <label>Postal Code</label>
                                <input type="text" placeholder="Postal Code"
                                    value={postalCode} onChange={e => setPostalCode(e.target.value)} />
                            </div>
                            <div>
                                <label>City</label>
                                <input type="text" placeholder="City"
                                    value={city} onChange={e => setCity(e.target.value)} />
                            </div>
                        </div>
                        <label>Country</label>
                        <input type="text" placeholder="Country"
                            value={country} onChange={e => setCountry(e.target.value)} />
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </section>
    )
}