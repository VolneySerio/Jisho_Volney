import { React, useState } from "react";
import Axios from "axios";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";

function App() {
  const [data, setData] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [searchedWords, setSearchedWord] = useState([]);

  function getMeaning() {
    Axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`
    ).then((response) => {
      setData(response.data[0]);

      if (searchWord.trim() && !searchedWords.includes(searchWord.trim())) {
        setSearchedWord([...searchedWords, searchWord.trim()]);
      }
    });
  }

  function playAudio() {
    if (data.phonetics && data.phonetics[0] && data.phonetics[0].audio) {
      let audio = new Audio(data.phonetics[0].audio);
      audio.play();
    } else {
      alert("Audio does not exist for this word");
    }
  }

  function exportWords() {
    const fileContent = searchedWords.join("\n");
    const blob = new Blob([fileContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "searched_words.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="App">
      <h1>Dictionary</h1>
      <div className="searchBox">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
        />
        <button
          onClick={() => {
            getMeaning();
          }}
        >
          <FaSearch size="20px" />
        </button>
      </div>
      {data && (
        <div className="showResults">
          <h2>
            {data.word}{" "}
            <button
              onClick={() => {
                playAudio();
              }}
            >
              <FcSpeaker size="26px" />
            </button>
          </h2>
          <h4>Parts of speech:</h4>
          <p className="som">{data.meanings[0].partOfSpeech}</p>
          <h4>Definition:</h4>
          <p className="defi">{data.meanings[0].definitions[0].definition}</p>
          <h4>Example:</h4>
          <p className="exemplo">{data.meanings[0].definitions[0].example}</p>
        </div>
      )}
      {searchedWords.length > 0 && (
        <div className="exportSection">
          <h3>Searched Words:</h3>
          <ul>
            {searchedWords.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
          <button onClick={exportWords} className="exportb">
            Export Searched Words
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
