import { useState } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { BsCheckCircleFill, BsCheckLg } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { TbEye } from "react-icons/tb";

export const InputWithIcon = ({
  type,
  placeholder,
  icon,
  width,
  pass,
  name,
  touched,
  errors,
  onChange,
  onBlur,
  value,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [inputtype, setInputtype] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="flex flex-col space-y-1">
      <div
        className="flex relative"
        style={{ width: `${width === "w-full" ? "250px" : "400px"}` }}
      >
        <input
          name={name}
          type={inputtype ? "text" : type}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          className={` rounded-full p-2 w-full text-sm outline-none ${
            inputValue ? "bg-chatBg" : "bg-inputBg"
          } `}
        />
        {icon && (touched || value.length > 0) && errors ? (
          <span className="">
            <FaTimes
              className={`absolute right-0 top-0 ${
                pass ? "mr-10" : "mr-2"
              } mt-2 text-xl text-red-primary`}
            />
          </span>
        ) : icon && (touched || value.length > 0) && !errors ? (
          <span className="">
            <BsCheckLg
              className={`absolute right-0 top-0 ${
                pass ? "mr-10" : "mr-2"
              } mt-2 text-xl text-seaGreen`}
            />
          </span>
        ) : (
          <></>
        )}
        {icon && inputValue && (
          <span className="">
            <BsCheckLg
              className={`absolute right-0 top-0 ${
                pass ? "mr-10" : "mr-2"
              } mt-2 text-xl text-seaGreen`}
            />
          </span>
        )}

        { pass && inputtype ? (
          <span>
            <TbEye
              onClick={() => setInputtype(!inputtype)}
              className="absolute text-textgray right-0 top-0 mr-2 mt-2 text-xl cursor-pointer"
            />
          </span>
        ) : (

          pass &&
          !inputtype && (
            <span>
              <AiOutlineEyeInvisible
                onClick={() => setInputtype(!inputtype)}
                className="absolute text-textgray right-0 top-0 mr-2 mt-2 text-xl cursor-pointer"
              />
            </span>
          )
        )}
      </div>
      {icon && touched && errors && (
        <div className="flex items-center text-xs text-red-primary text-left space-x-1">
          <FaTimes className={`text-red-primary`} />
          <div>{errors}</div>
        </div>
      )}
    </div>
  );
};

export const InputWithCheckbox = ({
  text,
  SignUpDefault,
  label,
  validate,
  touched,
  name,
  required,
  checked,
}) => {
  return (
    <>
      {!SignUpDefault && (
        <div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" className="rounded-full" name={name} required={required} checked={checked}/>
            <label className="text-textgray text-sm">{text}</label>
          </div>
        </div>
      )}
      {SignUpDefault && (
        <div>
          <input type="checkbox" className="hidden"  />
          <label
            className={`${
              touched
                ? !validate
                  ? "text-seaGreen"
                  : "text-red-primary"
                : "text-textgray"
            } flex gap-2 items-center`}
          >
            {touched ? (
              !validate ? (
                <BsCheckCircleFill className="" />
              ) : (
                <FaTimes className="" />
              )
            ) : (
              <BsCheckCircleFill className="" />
            )}
            {label}
          </label>
        </div>
      )}
    </>
  );
};

export const InputWithEmoji = ({ image, placeholder, bgcolor, width,type, name,value,onChange}) => {
  return (
    <div className="flex gap-3 w-full">
      <div
        style={{ backgroundColor: bgcolor }}
        className={`${bgcolor} rounded-full flex justify-center items-center`}
      >
        <img
          src={image}
          className={`${width === "w-full" ? "h-10 w-10" : "w-12 h-12"}`}
        />
      </div>
      <input
        name = {name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ width: `${width === "w-full" ? "80%" : "390px"}` }}
        className={`bg-inputBg rounded-full p-2 text-sm outline-none`}

      />
    </div>
  );
};

export const SimpleInput = ({ width, type, placeholder, text }) => {
  return (
    <div>
      <label>{text}</label>
      <input
        type={type}
        placeholder={placeholder}
        style={{
          width,
        }}
        className={`w-${width} bg-inputBg p-2 rounded-lg text-sm`}
      />
    </div>
  );
};
