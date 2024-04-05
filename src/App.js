import './App.css'
import React, {useState, useEffect} from 'react'
import * as XLSL from 'xlsx'

function App() {
    const [data, setData] = useState([])
    useEffect(()=>{
        fetch('ssaReport.xlsx')
            .then((res)=>res.arrayBuffer())
            .then((buffer)=>{
                const workbook = XLSL.read(buffer, {type: "buffer"});
                const worksheetName = workbook.SheetNames[4];
                const worksheet = workbook.Sheets[worksheetName];
                const jsonData = XLSL.utils.sheet_to_json(worksheet);
                setData(jsonData);

            })
    }, [])

    return (
        <div className="App">
            <h1>Excel Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}
export default App;