import { useState } from "react";

interface PokedexInputProps {
  onSubmit: (value: string) => void;
  placeholder: string;
  icon?: string;
  buttonText: string;
  buttonClassName?: string;
  containerClassName?: string;
}

const PokedexInput: React.FC<PokedexInputProps> = ({
  onSubmit,
  placeholder,
  icon = "🔍",
  buttonText,
  buttonClassName = "search-btn",
  containerClassName = "search-container",
}) => {
  const [value, setValue] = useState("");

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
    <form onSubmit={handleSubmit} className="search-form">
      <div className={containerClassName}>
        <div className="search-icon">{icon}</div>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="pokedex-search"
        />
        <button type="submit" className={buttonClassName}>
          <span>{buttonText}</span>
        </button>
      </div>
    </form>
  );
};

export default PokedexInput;
