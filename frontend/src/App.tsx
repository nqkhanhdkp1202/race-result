import { useEffect, useState } from 'react'
import './App.css'
import ResultList from './components/ResultList';
import FilterOption from './components/FilterOption';
import { raceAPI } from './api/raceAPI';
import SpinLoading from './components/SpinLoading';
import Graph from './components/LineChart';

function App() {
  const [raceResults, setRaceResults] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [currentOption, setCurrentOption] = useState(
    {
      year: 2023,
      category: 'races',
    }
  )
  const [isLoading, setIsLoading] = useState(false);

  const title = (currentOption.year + " " + currentOption.category).toUpperCase() + " RESULT";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const params = {};
        const result = await raceAPI.getRaceList(currentOption.year, currentOption.category, params);
        if (result) {
          setRaceResults(result)
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [currentOption.year, currentOption.category])


  useEffect(() => {
    const fetchFilter = async () => {
      setIsLoading(true);
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
      setIsLoading(false);
    }
    fetchFilter();
  }, [])

  useEffect(() => {
    document.title = title; // Thay đổi giá trị title tại đây
  }, [currentOption.year, currentOption.category]);
  

  return (
    <>
      {
      isLoading ? <SpinLoading size={50} color='#e10600'/>:
        <div className="content">
          <div className="filter-container">
          <FilterOption data={yearList} />
          <FilterOption data={categoryList} />
          </div>
          <div className="result">
            <h1>{title}</h1>
            <ResultList data={raceResults}/>
          </div>
          <div className="chart">
            <Graph/>
          </div>
        </div>
      }
    </>
  )
}

export default App
