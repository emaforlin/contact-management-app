"use client";

import { ContactCard } from "@/components/ContactCard";
import { useContactContext } from "@/contexts/contactsCtx";
import { Contact } from "@/types/contact";
import { useEffect, useState } from "react"



export default function Contacts() {
    const { loading, contacts } = useContactContext();

    return (
         <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Contact List
            </h1>
            {loading? 
                <div className="flex min-h-screen justify-center items-center">
                    <p className="text-black items-center text-center text-3xl font-bold">Loading...</p>
                </div>
                    :
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {contacts.map((contact, index) => (
                        <ContactCard key={index}  contact={contact} />
                    ))}
                </div>
            }
        </div>
    )
}
