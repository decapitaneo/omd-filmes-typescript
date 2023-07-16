import React from "react";
import './input.css';

interface Props {
    handleSearch: (title: string) => void
}

const Input = ({ handleSearch }: Props) => {
  
    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
      const newTitle = event.currentTarget.value;
      handleSearch(newTitle);
    }

    return (
      <div className="input-wrapper">
        <input
          className="search"
          placeholder="Search..."
          onChange={handleInputChange}
        />
      </div>
    );
  };
  
  export default Input;