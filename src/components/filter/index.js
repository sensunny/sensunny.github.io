import axios from "axios"
import React, { useEffect, useState } from "react"
import MutliSelect from "react-multiselect-checkboxes"
import "./style.css"

export default function Filter({ setCities, setIntevalForRefresh, refreshNumber }) {
    const [intialState, setInitialState] = useState(0)
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
                isDisabled={refreshNumber}
                placeholderButtonLabel="Select Your City"
                onChange={(e) => {
                    setCities(e)
                    setIntevalForRefresh(60)
                }}
            />
        </div>
    </div>

}