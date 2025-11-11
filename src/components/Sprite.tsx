import React, { useState } from "react";

interface SpriteProps {
  regularSrc?: string;
  shinySrc?: string;
  src?: string;
  alt: string;
  width?: number;
  showToggle?: boolean;
  className?: string;
}

const Sprite: React.FC<SpriteProps> = ({
  regularSrc,
  shinySrc,
  src,
  alt,
  width,
  showToggle = false,
  className = "",
}) => {
  const [isShiny, setIsShiny] = useState(false);

  const toggleShiny = () => {
    setIsShiny(!isShiny);
  };

  // If showToggle is true and both sprites are provided, show toggle functionality
  if (showToggle && regularSrc && shinySrc) {
    return (
      <div className="sprite-container">
        <img
          src={isShiny ? shinySrc : regularSrc}
          width={width}
          alt={alt}
          className={className}
        />
        <button
          className="sprite-toggle-btn"
          onClick={toggleShiny}
          type="button"
          aria-label={isShiny ? "Show regular sprite" : "Show shiny sprite"}
        >
          {isShiny ? "✨ Shiny" : "⭐ Regular"}
        </button>
      </div>
    );
  }

  // Otherwise, just display the provided src
  const imgProps = {
    src: src || regularSrc,
    alt,
    className,
    ...(width && { width }),
  };

  return <img {...imgProps} />;
};

export default Sprite;
