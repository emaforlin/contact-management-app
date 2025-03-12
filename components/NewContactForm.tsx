"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./InputField";
import { saveContact } from "@/services/contactService";
import { useState } from "react";
import clsx from "clsx";
import { useContactContext } from "@/contexts/contactsCtx";


const formSchema = z.object({
    firstname: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 50 characters")
        .regex(/^[A-Za-z]+$/, "Only letters are allowed"),
    
    lastname: z
        .string()
        .min(2, "Lastname must be at least 2 characters")
        .max(50, "Lastname must be at most 50 characters")
        .regex(/^[A-Za-z]+$/, "Only letters are allowed"),
    
    email: z
        .string()
        .email("Enter a valid email")
        .trim(),
    phone: z
        .string()
        .min(10, "Phone number is too short")
        .max(14, "Phone number is too long"),
    company: z
        .string()
        .max(100, "Company name too long"),
    role: z
        .string()
        .max(60, "Role/Position name must be shorter"),
    notes: z
        .string()
        .max(500, "Notes content is too long")
}).partial({
    company: true,
    role: true
});

type FormData = z.infer<typeof formSchema>;

export function NewContactForm() {
    const {
        handleSubmit,
        register, 
        formState: {errors},
        clearErrors,
        reset
    } = useForm<FormData>({
        resolver: zodResolver(formSchema)
    })
    const {loading, createNewContact, errors: ctxErrors, resetErrors: resetCtxErrors} = useContactContext();

    const onSubmit = async (data: FormData) => {
        try {
            resetCtxErrors();
            await createNewContact({
                Email: data.email,
                Firstname: data.firstname,
                Lastname: data.lastname,
                Phone: data.phone,
                Company: data.company,
                Notes: data.notes,
                Role: data.role
            })
            alert("Contact information saved!");
            reset();
        } catch (error) {
            console.log(ctxErrors, error);
        }
    }


    return (
    <>
        <form
            onSubmit={handleSubmit(onSubmit)} 
            onReset={() => clearErrors()}
            className="py-6 px-8 bg-gray-900 rounded-2xl">
                <h1 className="mb-4 text-2xl text-center font-bold">Add Contact</h1>
                <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-4">
                        <InputField register={register} errors={errors} name="firstname" placeholder="Firstname" type="text"/>
                        <InputField register={register} errors={errors} name="email" placeholder="Email" type="text"/>
                        <InputField register={register} errors={errors} name="company" placeholder="Company (optional)" type="text"/>
                    </div>
                    <div className="flex flex-col gap-4">
                        <InputField register={register} errors={errors} name="lastname" placeholder="Lastname" type="text"/>
                        <InputField register={register} errors={errors} name="phone" placeholder="Phone number" type="tel"/>
                        <InputField register={register} errors={errors} name="role" placeholder="Role/Position (optional)" type="text"/>
                    </div>
                </div>
                <div className="mt-4 flex flex-col gap-4">
                    <textarea {...register("notes")}
                        name="notes"
                        placeholder="Your notes... (optional)"
                        className="w-full p-2 h-auto border rounded-sm min-h-[150px] max-h-[150px]"
                    >
                    </textarea>
                    {errors.notes && (
                        <p className="text-red-500 text-sm mt-2">{errors.notes.message}</p>
                    )}
                    <div>
                        <button
                            disabled={loading}
                            type="submit"
                            className={clsx("w-3/4 py-2 bg-blue-600 text-xl font-bold", !loading?"hover:bg-blue-700":"")} 
                        >
                            {loading?"Creating...":"Submit"}
                        </button>
                        <button 
                            type="reset"
                            className="w-1/4 py-2 hover:font-bold"
                        >
                            Clear form
                        </button>
                    </div>
                    <p className="text-red-500 text-sm">{!loading && ctxErrors}</p>
                </div>
        </form>
    </>
    )
}