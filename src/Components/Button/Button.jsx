const ButtonComponent = ({ 
  title, buttonName, as,
  className, type,
  clickFunction, btnDisable,
  children
}) => {


  return (
    <button
      as={as}
      type={type}
      className={`btn ${className}`}
      onClick={clickFunction}
      title={title}
      disabled={btnDisable}
    >
      {children || buttonName}
    </button>
  );
};

export default ButtonComponent;
