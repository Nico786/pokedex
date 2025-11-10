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
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-container">
        <div className="search-icon">🔍</div>
        <input
          type="text"
          role="form"
          placeholder="Rechercher un Pokémon..."
          value={name}
          onChange={handleInputChange}
          className="pokedex-search"
        />
        <button type="submit" className="search-btn">
          <span>GO</span>
        </button>
      </div>
    </form>
  );
};

export default InputField;
