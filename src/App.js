import logo from './logo.svg';
import React, { useEffect, useState } from "react"
import Button from '@material-ui/core/Button';
import './App.css';
import CityList from "./components/CityList"
import FilterList from "./components/filter"
import SimpleCard from './components/Card';

function App() {
  const [selectedCities, setCities] = useState([])
  let [selectedAge, setAge] = useState("18")
  let initialRefresh = !(localStorage.getItem("have")) ? JSON.parse(localStorage.getItem("refreshNumber")) || localStorage.setItem("refreshNumber", 0) : 0
  const [refreshNumber, setRefresh] = useState(initialRefresh || 0)
  let setIntevalForRefresh = (number) => {
    (number) && setTimeout(() => {
      localStorage.setItem("refreshNumber", number - 1)
      // setIntevalForRefresh(number - 1)
      setRefresh(number - 1)
    }, 1000)
  }
  refreshNumber && setIntevalForRefresh(refreshNumber)
  return (
    <div className="App">
      <header className="App-header">
        <SimpleCard />
        {refreshNumber ? <div className="header_button">
          <Button className="header_button" variant="contained" color="secondary">
            {`Wait till ${refreshNumber} secs for next refresh`}
          </Button></div> : null}
        <FilterList
          setCities={setCities}
          setIntevalForRefresh={setIntevalForRefresh}
          refreshNumber={refreshNumber}
          setAge={setAge}
          selectedCities={selectedCities}
          selectedAge={selectedAge}
        />
        {selectedCities.map((item) => {
          return <CityList
            key={item.value}
            refreshNumber={refreshNumber}
            selectedCity={item}
            selectedAge={selectedAge}
            setIntevalForRefresh={setIntevalForRefresh}
          />
        })}
      </header>
    </div >
  );
}

export default App;
