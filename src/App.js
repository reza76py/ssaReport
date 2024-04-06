import './App.css'
import React, {useState, useEffect} from 'react'
import * as XLSL from 'xlsx'

function App() {
    const [data, setData] = useState([])
    const [selectDay, setSelectDay] = useState("Monday")
    useEffect(()=>{
        fetch('ssaReport.xlsx')
            .then((res)=>res.arrayBuffer())
            .then((buffer)=>{
                const workbook = XLSL.read(buffer, {type: "buffer"});

                const worksheet = workbook.Sheets[selectDay];
                const jsonData = XLSL.utils.sheet_to_json(worksheet);
                setData(jsonData);

            })
    }, [selectDay])

    const hadleDayCheng = (event) => {
        setSelectDay(event.target.value);
        setData([])
    }

    return (
        <div className="App">
            <h1>Excel Data</h1>
            <select value={selectDay} onChange={hadleDayCheng}>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>

            </select>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}
export default App;