import React, { useState } from "react";
import Button from "./Button";

interface SpriteProps {
  regularSrc: string;
  shinySrc: string;
  alt: string;
  width: number;
}

const Sprite: React.FC<SpriteProps> = ({
  regularSrc,
  shinySrc,
  alt,
  width,
}) => {
  const [toggleSprite, setToggleSprite] = useState(true);

  const handleClick = () => {
    setToggleSprite(!toggleSprite);
  };

  return (
    <>
      <img src={toggleSprite ? regularSrc : shinySrc} width={width} alt={alt} />
      <Button onClick={handleClick} role="button">
        {toggleSprite ? "Normal" : "Shiny"}
      </Button>
    </>
  );
};

export default Sprite;
