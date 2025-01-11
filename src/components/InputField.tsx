import { useState } from "react";

type InputFieldProps = {
  onSubmit: (name: string) => void;
};

const InputField: React.FC<InputFieldProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    name && onSubmit(name);
  };

  return (
    <form onSubmit={handleSubmit} className="text-center my-4">
      <input
        type="text"
        role="form"
        placeholder="Entrez le nom du Pokemon"
        value={name}
        onChange={handleInputChange}
      />
    </form>
  );
};

export default InputField;
