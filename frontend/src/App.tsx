import { useEffect, useState } from 'react'
import './App.css'
import ResultList from './components/ResultList';
import FilterOption from './components/FilterOption';

function App() {
  const [raceResults, setRaceResults] = useState<string>('');
  const [jsonData, setJsonData] = useState(null);

  
  

  return (
    <>
    <h1>Crawling Data</h1>
    <div className="content">
      <FilterOption/>
      <ResultList/>
    </div>
    </>
  )
}

export default App
