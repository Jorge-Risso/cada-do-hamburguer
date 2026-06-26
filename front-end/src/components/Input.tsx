const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className={`w-full text-xsm px-3 py-2 bg-white text-[#32343E] rounded-md outline-none placeholder-[#32343E] focus:ring-2 focus:ring-[#C92A0E] ${props.className}`}
    />
  );
};

export default Input;
