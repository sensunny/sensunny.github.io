import axios from "axios"
import React, { useEffect, useState } from "react"
import ListContainer from "./../cowinContainer"
import "./style.css"
import Button from '@material-ui/core/Button';

export default function CityList({ selectedCity, refreshNumber, setIntevalForRefresh }) {
    let [forToggle, setToggle] = useState(false)
    let [districtArray, setDistrictArray] = useState([])
    useEffect(() => {
        !refreshNumber && axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${selectedCity.value}`)
            .then(res => {
                const { data: { districts } } = res
                setDistrictArray(districts)
                setIntevalForRefresh(60)
            }).catch(() => {
                setIntevalForRefresh(60)
            })
    }, [selectedCity.value, forToggle])
    let handleRefresh = () => {
        console.log("setToggle", setToggle)
        setIntevalForRefresh(60)
        setToggle(!forToggle)
    }
    console.log("selectedCity", refreshNumber);
    return <div className="city_wrapper">
        <Button variant="contained">{selectedCity.label}{"  "}</Button>
        {!refreshNumber ? <Button variant="contained" style={{ background: "orange", marginLeft: "10px" }} onClick={() => handleRefresh()}>
            Refresh
        </Button> : null}
        <div className="city_list_content">
            <ListContainer
                districtArray={districtArray || []}
            />
        </div>
    </div>
}