import { useState } from "react";

const InputField: React.FC<{ onSearch: (name: string) => void }> = ({
  onSearch,
}) => {
  const [name, setName] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    name && onSearch(name);
  };

  return (
    <form onSubmit={onSubmit} className="text-center my-4">
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
