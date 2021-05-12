import React, { useEffect, useState } from "react"
import axios from "axios"
// import card from "../card"

let delhiPinCodes = {
    "districts": [
        {
            "district_id": 141,
            "district_name": "Central Delhi"
        },
        {
            "district_id": 145,
            "district_name": "East Delhi"
        },
        {
            "district_id": 140,
            "district_name": "New Delhi"
        },
        {
            "district_id": 146,
            "district_name": "North Delhi"
        },
        {
            "district_id": 147,
            "district_name": "North East Delhi"
        },
        {
            "district_id": 143,
            "district_name": "North West Delhi"
        },
        {
            "district_id": 148,
            "district_name": "Shahdara"
        },
        {
            "district_id": 149,
            "district_name": "South Delhi"
        },
        {
            "district_id": 144,
            "district_name": "South East Delhi"
        },
        {
            "district_id": 150,
            "district_name": "South West Delhi"
        },
        {
            "district_id": 142,
            "district_name": "West Delhi"
        }
    ],
    "ttl": 24
}

export default function Container() {
    const [intialState, setInitialState] = useState(0)
    let [cardInfo, setCards] = useState({})
    useEffect((() => {
        setInterval(() => {
            let allData = {}
            delhiPinCodes.districts.map((c) => {
                axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict?district_id=${c.district_id}&date=11-05-2021`)
                    .then((res) => {
                        let { data: { centers } } = res
                        centers.map(item => {
                            let totalAvailableSlot = 0
                            item.sessions.map((s) => {
                                totalAvailableSlot += s.min_age_limit < 45 ? s.available_capacity : 0
                            })
                            if (totalAvailableSlot) {
                                allData = {
                                    ...allData,
                                    [item.pincode]: allData[item.pincode] ? allData[item.pincode] + totalAvailableSlot : totalAvailableSlot
                                }
                            }
                        })
                        // allData.push(res.data.centers)
                        console.log(allData)
                        setCards(allData)
                        // setCards(res.data)
                    })
            })
        }, 5000)
    }), [])
    console.log(cardInfo)
    return (
        <div>{Object.keys(cardInfo).map((keys) => {
            return <span style={{
                display: "inlineBlock",
                marginTop: "20px"
            }}><span style={{ color: "Red", background: "yellow", padding: "5px 10px" }} >{keys}: </span><span style={{ color: "green", background: "yellow", padding: "5px 10px" }}>{cardInfo[keys]}</span>{" "}</span>
        })}</div>
    )
}