import { useEffect, useState } from 'react'
import './App.css'
import ResultList from './components/ResultList';
import FilterOption from './components/FilterOption';
import { raceAPI } from './api/raceAPI';

function App() {
  const [raceResults, setRaceResults] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [currentOption, setCurrentOption] = useState(
    {
      year: 2022,
      category: 'races',
    }
  )

  const title = (currentOption.year + " " + currentOption.category).toUpperCase() + " RESULT";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {};
        const result = await raceAPI.getRaceList(currentOption.year, currentOption.category, params);
        if (result) {
          setRaceResults(result)
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [currentOption.year, currentOption.category])


  useEffect(() => {
    const fetchFilter = async () => {
      try {
        const params = {};
        const result = await raceAPI.getFilterList(params);
        if (result) {
          console.log(result);
          setYearList(result.yearOptionList);
          setCategoryList(result.categoryOptionList);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchFilter();
  }, [])
  


  return (
    <>
      <div className="content">
        <div className="filter-container">
        <FilterOption data={yearList}/>
        <FilterOption data={categoryList}/>
        </div>
        <h1>{title}</h1>
        <ResultList data={raceResults} />
      </div>
    </>
  )
}

export default App
