import axios from "axios"
import React, { useEffect, useState } from "react"
import MutliSelect from "react-multiselect-checkboxes"
import ToggleButtons from "../Toggler"
import "./style.css"

export default function Filter({ setCities, setIntevalForRefresh, refreshNumber, setAge, selectedCities, selectedAge }) {
    const [initailStates, setStates] = useState([])
    const [isLoadingAPI, setLoader] = useState(true)
    useEffect(() => {
        isLoadingAPI && axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states')
            .then((res) => {
                const { data: { states } } = res
                let selectStates = []
                states.map((item) => {
                    selectStates.push({
                        label: item.state_name,
                        value: item.state_id
                    })
                })
                setStates(selectStates)
                setLoader(false)

            })
    }, [isLoadingAPI])
    return <div className="filter_wrapper">
        <div className="filter_state_select">
            <MutliSelect
                isLoading={isLoadingAPI}
                options={initailStates}
                value={selectedCities}
                isDisabled={refreshNumber}
                placeholderButtonLabel="Select Your States"
                onChange={(e) => {
                    selectedCities.length < e.length && setIntevalForRefresh(10)
                    setCities(e)
                }}
            />
        </div>
        <ToggleButtons
            handleRadioChange={(e) => {
                setAge(e.target.value)
                setCities([])
            }}
            selectedAge={selectedAge}
            isDisabled={refreshNumber}
        />
    </div>

}