type ButtonProps = {
  title: string;
  variant: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const Button = ({ title, variant, type, disabled = false }: ButtonProps) => {
  return (
    <button type={type} className={variant} disabled={disabled}>
      {title}
    </button>
  );
};

export default Button;
