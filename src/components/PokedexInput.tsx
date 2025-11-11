import { useState } from "react";

interface PokedexInputProps {
  onSubmit: (value: string) => void;
  placeholder: string;
  icon?: string;
  buttonText: string;
}

const PokedexInput: React.FC<PokedexInputProps> = ({
  onSubmit,
  placeholder,
  icon = "🔍",
  buttonText,
}) => {
  const [value, setValue] = useState("");

  // Determine button style based on button text
  const isCreateButton = buttonText.toLowerCase().includes("créer");
  const buttonClass = isCreateButton ? "pokedex-btn-green" : "pokedex-btn-red";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value.trim());
      setValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim()) {
      e.preventDefault();
      onSubmit(value.trim());
      setValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pokedex-input-form">
      <div className="pokedex-input-container">
        <div className="pokedex-input-icon">{icon}</div>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="pokedex-input"
        />
        <button type="submit" className={buttonClass}>
          <span>{buttonText}</span>
        </button>
      </div>
    </form>
  );
};

export default PokedexInput;
