import { StringValidation } from "zod";

type InputFieldProps = {
    register: any;
    errors: any;
    name: string;
    type: string;
    placeholder: string;
}

const InputField = ({ register, errors, name, type, placeholder }: InputFieldProps) => (
    <div className="flex flex-col">
        <input {...register(name)}
            name={name}
            type={type}
            placeholder={placeholder}
            className="border rounded-sm p-2"
        />
        {errors[name] && (
            <p className="text-red-500 text-sm">{errors[name].message}</p>
        )}
    </div>
)

export default InputField;