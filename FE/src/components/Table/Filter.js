import React from "react";
import "./Filter.css";
import SearchIcon from "@mui/icons-material/Search";

export const Filter = ({ filter, setFilter, placeholder }) => {
  return (
    <label>
      <span className="search-icon">
        <SearchIcon />
      </span>

      <input
        value={filter || ""}
        placeholder={placeholder}
        className="search-input"
        onChange={(e) => setFilter(e.target.value)}
      />
    </label>
  );
};
