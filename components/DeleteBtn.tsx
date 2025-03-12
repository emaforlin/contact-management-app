import { useContactContext } from "@/contexts/contactsCtx";
import { Contact } from "@/types/contact";

export const DeleteBtn = ({className, data}: { className?: string, data: Contact }) => {
    const { deleteContact, errors } = useContactContext();
    
    const handleClick = async () => {
        try {
            await deleteContact(data);
        } catch (error: unknown) {
            console.log(errors, error);
            alert(errors);
        }
    }
    return (
        <button className={"hover:underline " + className}
            onClick={handleClick}
        >
            Delete
        </button>
    )
}