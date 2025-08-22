import React from "react";

const Spinner = ({ size = 40, color = "#FF6C95",}) => {
  return (
    <div className="spinner-wrapper">
      <div
        className="spinner"
        style={{
          width: size,
          height: size,
          borderTopColor: color,
        }}
      />
    </div>
  );
};

export default Spinner;
