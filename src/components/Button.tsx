const Button: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      Search
    </button>
  );
};

export default Button;
