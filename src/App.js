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











// import React, { useState, useEffect } from 'react';
// import * as XLSX from 'xlsx';
// import './App.css';

// function App() {
//     const [data, setData] = useState({});
//     const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

//     useEffect(() => {
//         const fetchData = async () => {
//             const response = await fetch('/ssaReport.xlsx');
//             const buffer = await response.arrayBuffer();
//             const workbook = XLSX.read(buffer, {type: 'buffer'});
//             let newData = {};

//             daysOfWeek.forEach(day => {
//                 const worksheet = workbook.Sheets[day];
//                 if (worksheet) {
//                     const jsonData = XLSX.utils.sheet_to_json(worksheet, {header:1});
//                     let checkedBySSACount = 0;
//                     let nonSSASupplierCount = 0;

//                     jsonData.forEach(row => {
//                         if (row[5] === "Checked by SSA") {
//                             checkedBySSACount++;
//                         }

//                         if (row[0] && typeof row[0] === 'string' && /^[TJC]/.test(row[0])) {
//                             nonSSASupplierCount++;
//                         }

//                         if (row[1] && typeof row[1] === 'string') {
//                             const secondColumnValue = row[1].toUpperCase();
//                             if (["JAMES", "TIMBER", "NURSERY", "NURSERIES", "NAMES"].some(subString => secondColumnValue.includes(subString))) {
//                                 nonSSASupplierCount++;
//                             }
//                         }
//                     });

//                     const totalPOsRecEGR = jsonData.length;
//                     const posReleased = totalPOsRecEGR - checkedBySSACount - nonSSASupplierCount;

//                     newData[day] = {
//                         rows: jsonData,
//                         rowCount: totalPOsRecEGR,
//                         checkedBySSA: checkedBySSACount,
//                         nonSSASupplier: nonSSASupplierCount,
//                         posReleased: posReleased // Add the calculation for "PO's RELEASED"
//                     };
//                 } else {
//                     newData[day] = {
//                         rows: [],
//                         rowCount: 0,
//                         checkedBySSA: 0,
//                         nonSSASupplier: 0,
//                         posReleased: 0 // Ensure structure consistency
//                     };
//                 }
//             });

//             setData(newData);
//         };

//         fetchData();
//     }, []);

//     return (
//         <div className="App">
//             <h1>Weekly Schedule</h1>
//             <table>
//                 <thead>
//                     <tr>
//                         <th></th>
//                         <th>TM's</th>
//                         <th>Total PO's Rec (EGR)</th>
//                         <th>Checked by SSA</th>
//                         <th>PO's RELEASED</th>
//                         <th>Manual PO Entry</th>
//                         <th>IRNA</th>
//                         <th>Not known to SSA</th>
//                         <th>Non SSA supplier</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {daysOfWeek.map(day => (
//                         <tr key={day}>
//                             <td>{day}</td>
//                             <td></td>
//                             <td>{data[day] ? data[day].rowCount : 'Loading...'}</td>
//                             <td>{data[day] ? data[day].checkedBySSA : 'Loading...'}</td>
//                             <td>{data[day] ? data[day].posReleased : 'Loading...'}</td>
//                             <td></td>
//                             <td></td>
//                             <td></td>
//                             <td>{data[day] ? data[day].nonSSASupplier : 'Loading...'}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default App;

