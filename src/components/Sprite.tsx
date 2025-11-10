import React from "react";

interface SpriteProps {
  src: string;
  alt: string;
  width: number;
}

const Sprite: React.FC<SpriteProps> = ({ src, alt, width }) => {
  return <img src={src} width={width} alt={alt} />;
};

export default Sprite;
