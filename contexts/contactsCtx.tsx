"use client";

import { fetchContacts, removeContact, saveContact } from "@/services/contactService";
import { Contact } from "@/types/contact"
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type ContactCtxType = {
    contacts: Contact[];
    loading: boolean;
    errors: string;
    resetErrors: () => void
    createNewContact: (contact: Contact) => Promise<void>;
    retrieveContacts: () => Promise<void>;
    deleteContact: (contactData: Contact) => Promise<void>;
}

const ContactContext = createContext<ContactCtxType | undefined>(undefined);

export const ContactsProvider = ({children}: {children: ReactNode}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [errors, setErrors] = useState<string>("");

    const createNewContact = async (contactData: Contact) => {
        setLoading(true);
        try {
            await saveContact(contactData);
            await retrieveContacts();
            alert("Contact information saved!");
        } catch (error) {
            setErrors("Couldn't save information. Try again Later.")
        } finally {
            setLoading(false);
        }
    }

    const retrieveContacts = async () => {
        setLoading(true);
        try {
            const res = await fetchContacts();
            setContacts(res);
        } catch (error) {
            setErrors("Couldn't fetch contacts");
        } finally {
            setLoading(false);
        }
    }

    const deleteContact = async (contactData: Contact) => {
        try {
            await removeContact(contactData);
            await retrieveContacts();
        } catch {
            setErrors("Failed to delete contact");
        }
    }

    const resetErrors = () => setErrors("");

    useEffect(() => {
        retrieveContacts();
    }, [])

    return (
        <ContactContext.Provider value={{contacts, loading, errors, createNewContact, retrieveContacts, deleteContact, resetErrors}}>
            {children}
        </ContactContext.Provider>
    )
}


export const useContactContext = () => {
    const context = useContext(ContactContext);
    if (!context) {
        throw new Error("useContactContext must be used within a ContactsProvider");
    }
    return context;
};