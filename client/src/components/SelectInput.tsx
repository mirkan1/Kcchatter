import { useState, useEffect } from "react";
import "./SelectInput.css";

export default function SelectInput(props: any) {
    const FORM_ID = props.FORM_ID;
    const rows = props.rows;
    const [selected, setSelected] = useState("");
    const [selectedRow, setSelectedRow] = useState(null);
    const handleSelect = (e: any) => {
        const index = e.target.value;
        setSelected(index);
        const row = rows[index]
        setSelectedRow(row);
    }
    const handleGoForm = () => {
        //@ts-ignore
        const rep = selectedRow[2];
        //@ts-ignore
        const store = selectedRow[5];
        //@ts-ignore
        const guid = selectedRow[9];
        const url = `https://form.jotform.com/${FORM_ID}?REP=${rep}&STORE=${store}&GUID=${guid}`;
        window.open(url, "_blank");        
    }
    console.log(selectedRow)
    return (
        <div className="select-input">
            <select onChange={handleSelect}>
                <option value="">Select</option>
                {rows.map((row: any, index: number) => <option key={row[10]} value={index}>{row[5]}</option>)}
            </select>
            <div className="selected-row">
                {selectedRow ? <h1>{selectedRow[5]}</h1> : null}
                {selectedRow ? <button onClick={handleGoForm}>go to form</button> : null}
            </div>
        </div>
    );
}