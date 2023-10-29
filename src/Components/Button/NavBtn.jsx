const NavBtn = ({
  text,
  bgcolor,
  color,
  icon,
  bordercolor,
  width,
  onFunctionCalled,
  disabled,
  type
}) => {

  return (
    <div>
      <button
        onClick={onFunctionCalled}
        type={type
        }
        disabled={disabled}
        style={{
          backgroundColor: bgcolor,
          color,
          width,
          borderColor: bordercolor
        }}
        className={`bg-${bgcolor} whitespace-nowrap border-2 border-${bordercolor} w-${width} rounded-xl font-bold py-1.5 px-3 flex gap-2 justify-center text-sm`}
      >
        {text}
        {icon}
      </button>
    </div>
  );
};

export default NavBtn;
