import { useState, useEffect } from 'react';
import Header from './components/Header/Header.jsx';
import TextInput from './components/TextInput/TextInput.jsx';
import NumberInput from './components/NumberInput/NumberInput.jsx';
import StepButton from './components/StepButton/StepButton.jsx';
import CardDisplay from './components/CardDisplay/CardDisplay.jsx';
import GenerateButton from './components/GenerateButton/GenerateButton.jsx';
import DownloadButton from './components/DownloadButton/DownloadButton.jsx';
import './App.css';

function App() {
  const [baseWord, setBaseWord] = useState("Word");
  const [minSetStrength, setMinSetStrength] = useState(0.0);
  const [maxSetStrength, setMaxSetStrength] = useState(1.0);
  const [minObscurity, setMinObscurity] = useState(0.0);
  const [maxObscurity, setMaxObscurity] = useState(1.0);
  const [index, setIndex] = useState(0);
  const [quantity, setQuantity] = useState(10);
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [currentCardSet, setCurrentCardSet] = useState({"len": 1, "rels": [{"target": "Choose a base word", "targetDefinition": "then click 'Generate'"}]});

  useEffect(() => {
    if (currentCardSet["len"] > 0) {
      setWord(currentCardSet["rels"][index]["target"]);
      setDefinition(currentCardSet["rels"][index]["targetDefinition"]);
    } else {
      setWord("No Results Found...");
      setDefinition("Try again with a different word or different settings!");
    }
  }, [index, currentCardSet])

  function generateFlashcardSet() {
    const params = {nst: minSetStrength, xst: maxSetStrength, nfr: minObscurity, xfr: maxObscurity, qty: quantity};
    setWord("Loading...");
    setDefinition("Loading...");
    setIndex(0);
    fetch(`http://localhost:5000/api/rels/${baseWord}?qty=${encodeURIComponent(params.qty)}&nst=${encodeURIComponent(params.nst)}&xst=${encodeURIComponent(params.xst)}&nfr=${encodeURIComponent(params.nfr)}&xfr=${encodeURIComponent(params.xfr)}`, {
      method: "GET",
    })
    .then((response) => response.json())
    .then((data) => {
      setCurrentCardSet(data)
    })
  };

  async function createFlashcardSet() {
    const params = {nst: minSetStrength, xst: maxSetStrength, nfr: minObscurity, xfr: maxObscurity, qty: quantity, base:baseWord.toLowerCase()};
    const response = await fetch(`http://localhost:5000/api/decks/generate?type=ANKI&ext=txt&base=${encodeURIComponent(params.base)}&qty=${encodeURIComponent(params.qty)}&nst=${encodeURIComponent(params.nst)}&xst=${encodeURIComponent(params.xst)}&nfr=${encodeURIComponent(params.nfr)}&xfr=${encodeURIComponent(params.xfr)}`, {
      method: "POST",
    })
    const responseJson = await response.json();
    return responseJson["id"];
  }

  async function downloadFlashcardSet() {
    let id = 0;
    createFlashcardSet()
      .then((deckId) => {
        id = deckId;
        console.log("Created deck: " + id);
      })
  }

  return (
    <>
      <Header />
      <div id="content">
        <div id="deck-settings">
          <TextInput label="Base Word" locked={false} active={false} onChange={(x, value) => setBaseWord(value)} id="baseWord" />
          <div className="deck-settings-section" id="deck-strength-settings">
            <NumberInput label="Minimum Deck Strength Score" id="minDeckStrength" onChange={setMinSetStrength} />
            <NumberInput label="Maximum Deck Strength Score" placeholder={1.0} id="maxDeckStrength" onChange={setMaxSetStrength} />
          </div>
          <div className="deck-settings-section" id="obscurity-settings">
            <NumberInput label="Minimum Obscurity Score" id="minObscurity" onChange={setMinObscurity} />
            <NumberInput label="Maximum Obscurity Score" placeholder={1.0} id="maxObscurity" onChange={setMaxObscurity} />
          </div>
          <div className="deck-settings-section">
            <NumberInput label="Deck Size" placeholder={10} step={1} min={1} max={15000} id="quantity" onChange={setQuantity} />
            <GenerateButton id="generateButton" onClick={generateFlashcardSet} />
          </div>
        </div>
        <div id="deck-preview">
          <CardDisplay id="cardDisplay" word={word} definition={definition} />
          <StepButton label="Previous" id="previousButton" step={-1} onClick={setIndex} />
          <StepButton label="Next" id="nextButton" step={1} onClick={setIndex} />
        </div>
        <DownloadButton id="downloadButton" onClick={downloadFlashcardSet} />
      </div>
    </>
  );
};

export default App
