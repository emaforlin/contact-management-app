import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormType } from "./NewContactForm";

type InputFieldProps = {
    register: UseFormRegister<FormType>;
    errors: FieldErrors<FormType>;
    name: keyof FormType;
    type: string;
    placeholder: string;
}

const InputField = ({ register, errors, name, type, placeholder }: InputFieldProps) => (
    <div className="flex flex-col">
        <input {...register(name)}
            name={name}
            type={type}
            placeholder={placeholder}
            className="border border-gray-200 rounded-sm p-2 bg-slate-50"
        />
        {errors[name] && (
            <p className="text-red-500 text-sm">{errors[name].message}</p>
        )}
    </div>
)

export default InputField;