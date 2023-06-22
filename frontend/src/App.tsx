import { useEffect, useState } from 'react'
import './App.css'
import ResultList from './components/ResultList';
import { raceAPI } from './api/raceAPI';
import SpinLoading from './components/SpinLoading';
import YearFilter from './components/YearFilter';
import CategoryFilter from './components/CategoryFilter';

interface Option{
  year : number,
  category: string
}

function App() {
  const [raceResults, setRaceResults] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [currentOption, setCurrentOption] = useState<Option>(
    {
      year: 2023,
      category: 'races',
    }
  )
  const [isLoading, setIsLoading] = useState(false);

  const title = (currentOption.year + " " + currentOption.category).toUpperCase() + " RESULTS";

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
    document.title = title; 
  }, [currentOption.year, currentOption.category]);

  const handleYearClick = (content: string) => {
    setCurrentOption((prevState) => ({
      ...prevState,
      year: parseInt(content),
    }));
  }

  const handleCategoryClick = (content: string) => {
    setCurrentOption((prevState) => ({
      ...prevState,
      category: content,
    }));
  }



  return (
    <>
      {
      isLoading ? <SpinLoading size={50} color='#e10600'/>:
        <div className="content">
          <div className="filter-container">
          <YearFilter onClickFilter={handleYearClick} data={yearList} />
          <CategoryFilter onClickFilter={handleCategoryClick} data={categoryList} />
          </div>
          <div className="result">
            <h1>{title}</h1>
            <ResultList data={raceResults}/>
          </div>
          <div className="chart">
          </div>
        </div>
      }
    </>
  )
}

export default App;
