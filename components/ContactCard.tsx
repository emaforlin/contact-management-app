import { Contact } from "@/types/contact";
import { DeleteBtn } from "./DeleteBtn";

export const ContactCard = ({contact}: {contact: Contact}) => {
    return (
        <div className="max-w-sm bg-white hover:shadow-lg rounded-2xl p-6 border border-gray-200 hover:bg-slate-50">
            <h2 className="text-xl font-semibold text-gray-800">
                {contact.Firstname} {contact.Lastname}
            </h2>
            <p className="text-gray-600">{contact.Role || "No role specified"}</p>

            <div className="mt-4">
                <p className="text-sm text-gray-500">
                    📧 <a href={`mailto:${contact.Email}`} className="text-blue-500 hover:underline">
                        {contact.Email}
                    </a>
                </p>
                <p className="text-sm text-gray-500">📞 {contact.Phone}</p>
                {contact.Company && <p className="text-sm text-gray-500">🏢 {contact.Company || "No company provided"}</p>}
            </div>

            <div className="mt-4 p-3 min-h-30 bg-gray-100 rounded-md">
                <p className="text-sm text-gray-700">{contact.Notes}</p>
            </div>

            <div className="mt-auto flex justify-end">
                <DeleteBtn className="text-black" data={contact}/>
            </div>
        </div>
    )
}

export default ContactCard;