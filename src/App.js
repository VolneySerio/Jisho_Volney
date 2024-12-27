import React, { useState } from "react";
import Axios from "axios";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";
import { DownloadPdfButton } from "./doc";

function App() {
  const [data, setData] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [searchedWords, setSearchedWords] = useState([]);

  function getMeaning() {
    Axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`
    ).then((response) => {
      setData(response.data[0]);

      if (searchWord.trim() && !searchedWords.includes(searchWord.trim())) {
        setSearchedWords([...searchedWords, searchWord.trim()]);
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

  function exportToTxt() {
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
      <h1>日本語</h1>
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
      <div className="batata">
      {data && (
        <section className="showResults">
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
          <p className="som">- {data.meanings[0].partOfSpeech}</p>
          <h4>Definition:</h4>
          <p className="defi">- {data.meanings[0].definitions[0].definition}</p>
          <h4>Example:</h4>
          <p className="exemplo">- {data.meanings[0].definitions[0].example}</p>
        </section>
      )}
      {searchedWords.length > 0 && (
        <div className="exportSection">
          <h3>Searched Words:</h3>
          <ul>
            {searchedWords.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
          <div className="exportButtons">
            <button onClick={exportToTxt} className="exportTxt">
              TXT
            </button>
            <DownloadPdfButton className="exportPDF"
              title="Searched Words"
              words={searchedWords}
            />
          </div>
        </div>
      )}
      </div>
      <footer>
        
      </footer>
    </main>
  );
}

export default App;