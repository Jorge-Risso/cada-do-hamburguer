type ButtonProps = {
  title: string;
  variant: string;
  type?: "button" | "submit" | "reset";
};

const Button = ({ title, variant, type }: ButtonProps) => {
  //const default = cursor-pointer w-full bg-linear-to-r from-[#C92A0E] to-[#FF5E2B] hover:from-[#a81e05] hover:to-[#e03a1a] py-3 rounded-md font-bold text-white text-sm transition-all duration-200 transform hover:scale-105 active:scale-95"

  return (
    <button type={type} className={variant}>
      {title}
    </button>
  );
};

export default Button;
