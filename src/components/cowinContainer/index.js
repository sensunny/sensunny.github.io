import React, { useEffect, useState } from "react"
import axios from "axios"
// import card from "../card"
import "./style.css"
import Button from '@material-ui/core/Button';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import moment from "moment"

export default function Container({ districtArray, selectedAge }) {
    const [intialState, setInitialState] = useState(0)
    let [cardInfo, setCards] = useState({})
    let [totalAvailableCount, setTotalCount] = useState(0)
    let initialbaseUrl = JSON.parse(localStorage.getItem("baseUrlIndex")) || localStorage.setItem("baseUrlIndex", false)
    let [baseUrlIndex, setBaseUrl] = useState(initialbaseUrl || false)
    useEffect((() => {
        let allData = {}
        let count = 0
        districtArray.map((c) => {
            axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/${baseUrlIndex ? 'public/' : ''}calendarByDistrict?district_id=${c.district_id}&date=${moment().format("DD-MM-YYYY")}`)
                .then((res) => {
                    let { data: { centers } } = res
                    centers.map(item => {
                        let totalAvailableSlot = 0
                        item.sessions.map((s) => {
                            totalAvailableSlot += s.min_age_limit === parseInt(selectedAge) ? s.available_capacity : 0
                        })
                        if (totalAvailableSlot) {
                            allData = {
                                ...allData,
                                [item.pincode]: allData[item.pincode] ? allData[item.pincode] + totalAvailableSlot : totalAvailableSlot
                            }
                        }
                        count += totalAvailableSlot
                    })
                    setTotalCount(count)
                    // allData.push(res.data.centers)
                    // allData.sor((a, b) => allData[a] > allData[b])
                    // console.log("allData", allData)
                    setCards(allData)
                    // setCards(res.data)
                }).catch(() => {
                    setCards({})
                    setTotalCount(0)
                    localStorage.setItem("baseUrlIndex", !baseUrlIndex)
                    setBaseUrl(!baseUrlIndex)
                })
        })
    }), [districtArray])
    return (
        <div className="slots_info">
            {totalAvailableCount > 0 ? Object.keys(cardInfo).map((keys) => {
                return <div key={keys} className="slots_inline" style={{
                    display: "inlineBlock",
                    marginTop: "20px"
                }}>
                    <Button onClick={() => { navigator.clipboard.writeText(keys) }} variant="contained" color="primary">{keys}{" "} <FileCopyIcon /> </Button><Button variant="contained" color="secondary">{cardInfo[keys]}</Button>{" "}</div>
            }) : <Button style={{ marginTop: "20px" }} variant="contained" color="secondary">NO SLOT AVAILABLE, Try Refresh!</Button>}</div>
    )
}