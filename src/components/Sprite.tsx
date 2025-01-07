import React, { useState } from "react";
import { Button } from "react-bootstrap";

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
      <Button variant="primary" onClick={handleClick} role="button">
        {toggleSprite ? "Shiny" : "Normal"}
      </Button>
    </>
  );
};

export default Sprite;
