import React from "react";

const Notes = ({
  notebgColor,
  text,
  color,
  image,
  bgColor,
  imagenote,
  icon,
}) => {
  return (
    <>
      <div
        style={{ backgroundColor: bgColor }}
        className={`bg-${bgColor} h-screen`}
      >
        <div className="flex flex-col space-y-10 text-center items-center justify-center">
          <img src={image} className="h-full mt-10" />
          <div
            style={{ backgroundColor: notebgColor, color }}
            className={` bg-${notebgColor} w-1/2 flex justify-center items-center py-5 px-10 rounded-2xl`}
          >
            <p className={`rounded-xl font-bold `}>
              {text}
              {icon && (
                <img
                  src={imagenote}
                  className="w-5 h-5 flex justify-center items-center"
                />
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notes;
