import { useEffect, useState } from 'react'
import './App.css'
import ResultList from './components/ResultList';
import { raceAPI } from './api/raceAPI';
import SpinLoading from './components/SpinLoading';
import YearFilter from './components/YearFilter';
import CategoryFilter from './components/CategoryFilter';
import DriverList from './components/DriverList';
import TeamList from './components/TeamList';
import BarChart from './components/LineCharts';
import MoreFilter from './components/MoreFilter';

interface Option {
  year: number,
  category: string,
}

interface TeamData {
  team_name: string;
}

interface DriverData {
  driver_name: string;
}

interface RaceData {
  race_place: string;
}

function App() {
  const [raceResults, setRaceResults] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [moreList, setMoreList] = useState([]);
  const [currentOption, setCurrentOption] = useState<Option>(
    {
      year: 2023,
      category: 'drivers',
    }
  )
  const [isLoading, setIsLoading] = useState(false);
  const title = (currentOption.year + " " + currentOption.category).toUpperCase() + " RESULTS";
  const categoryList = [{ category: "RACES" }, { category: "DRIVERS" }, { category: "TEAMS" }];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const list : any = [];
      try {
        const params = {};
        const yearResult = await raceAPI.getYearsList(params);
        if (yearResult.data) {
          setYearList(yearResult.data)
        }
        if (currentOption.category === 'races') {
          const result = await raceAPI.getRaceList(params);
          if (result.data) {
            setRaceResults(result.data);
            result.data.map((item: RaceData) =>list.push(item.race_place));
          }
        }
        if (currentOption.category === 'drivers') {
          const result = await raceAPI.getDriverList(params);
          if (result.data) {
            setRaceResults(result.data);
            result.data.map((item: DriverData) => list.push(item.driver_name));
          }
        }
        if (currentOption.category === 'teams') {
          const result = await raceAPI.getTeamList(params);
          if (result.data) {
            setRaceResults(result.data)
            result.data.map((item: TeamData) => list.push(item.team_name));
          }
        }
      } catch (error) {
        console.log(error);
      }
      setMoreList(list);
      setIsLoading(false);
    }
    fetchData();
  }, [currentOption.category])

  useEffect(() => {
    document.title = title;
  }, [currentOption.category]);

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
        isLoading ? <SpinLoading size={50} color='#e10600' /> :
          <div className="content">
            <div className="filter-container">
              <YearFilter onClickFilter={handleYearClick} data={yearList} />
              <CategoryFilter onClickFilter={handleCategoryClick} data={categoryList} />
              <MoreFilter data={moreList} />
            </div>
            <div className="result">
              <h2>{title}</h2>
              {
                currentOption.category === "races" ? (
                  <ResultList data={raceResults} />
                ) : currentOption.category === "drivers" ? (
                  <DriverList data={raceResults} />
                ) : <TeamList data={raceResults} />
              }
            </div>
          </div>
      }
    </>
  )
}

export default App;
