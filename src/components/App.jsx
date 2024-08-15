
import React, { useState } from "react";
import emojipedia from "../emojipedia";
import Entry from "./Entry";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }

  function handleTypeChange(event) {
    setSelectedType(event.target.value);
  }

  const filteredEmojis = emojipedia.filter((emoji) => {
    return (emoji.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            emoji.meaning.toLowerCase().includes(searchTerm.toLowerCase())) &&
           (selectedType === "all" || emoji.type === selectedType);
  });

  function createEntry(emojiTerm) {
    return (
      <div className={`term ${emojiTerm.type}`} key={emojiTerm.id}>
        <Entry
          emoji={emojiTerm.emoji}
          name={emojiTerm.name}
          description={emojiTerm.meaning}
        />
      </div>
    );
  }

  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>
      
      <input 
        type="text" 
        placeholder="Search..." 
        value={searchTerm} 
        onChange={handleSearch}
        style={{ display: "block", margin: "2rem auto", padding: "0.5rem", width: "80%" }}
      />
      
      <select onChange={handleTypeChange} style={{ display: "block", margin: "1rem auto" }}>
        <option value="all">All Types</option>
        <option value="vegetable">Vegetables</option>
        <option value="vehicle">Vehicles</option>
        <option value="symbol">Symbols</option>
        <option value="activity">Activities</option>
      </select>

      <dl className="dictionary">
        {filteredEmojis.map(createEntry)}
      </dl>
    </div>
  );
}

export default App;

