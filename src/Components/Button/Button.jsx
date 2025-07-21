import React from "react";


const ButtonComponent = ({ 
  componentFrom,
  title,
  buttonName,
  as,
  className,
  type,
  clickFunction,
  btnDisable,
  style,
}) => {


  return (
    <button
      as={as}
      type={type}
      className={`btn ${className}`}
      onClick={clickFunction}
      title={title}
      disabled={btnDisable}
      style={style}
     
      
    >
      {buttonName}
      
    </button>
  );
};

export default ButtonComponent;
