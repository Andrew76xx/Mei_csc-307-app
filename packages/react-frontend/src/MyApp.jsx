// src/MyApp.jsx
import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {

  // state is like a shopping cart. You can add or remove items from it
  const [characters, setCharacters] = useState([]);

  // filter function -- makes a new array where it does not have the one you wanted to remove
  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }

  return (
    <div className="container">
      <Table 
        characterData={characters} 
        removeCharacter={removeOneCharacter}
      />
    </div>
  );
}

export default MyApp;
