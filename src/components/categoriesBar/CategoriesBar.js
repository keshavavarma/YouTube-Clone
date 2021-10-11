import React, { useState } from "react";
import "./_categoriesBar.scss";
const keywords = [
  "All",
  "React js",
  "Redux",
  "Firebase",
  "Drums",
  "Cricket",
  "Football",
];

const CategoriesBar = () => {
  const [activeElement, setActiveElement] = useState("All");

  const handleClick = (value) => {
    setActiveElement(value);
  };

  return (
    <div className="categoriesBar">
      {keywords.map((value, i) => (
        <span
          onClick={() => handleClick(value)}
          key={i}
          className={activeElement === value ? "active" : ""}
        >
          {value}
        </span>
      ))}
    </div>
  );
};

export default CategoriesBar;
