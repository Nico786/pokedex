import { useState } from "react";
import Button from "./Button";

const InputField: React.FC<{ onSearch: (name: string) => void }> = ({
  onSearch,
}) => {
  const [name, setName] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleButtonClick = () => {
    onSearch(name);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Enter Pokemon name"
        value={name}
        onChange={handleInputChange}
      />
      <Button onClick={handleButtonClick} />
    </form>
  );
};

export default InputField;
