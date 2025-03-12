import { Contact } from "@/types/contact";

const ContactCard = (data: Contact) => {
    return (
        <div>
            <h3>{`${data.Firstname} ${data.Lastname}`}</h3>
            <p></p>
        </div>
    )
}