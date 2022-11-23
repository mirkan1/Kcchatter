import { useState, useEffect } from "react";
import "./SelectInput.css";
//@ts-ignore
import ToggleButton from 'react-toggle-button'

const borderRadiusStyle = {
    borderRadius: 0,
    border: "1px solid #ccc",
    padding: "10px",
    width: "100%",
    height: "100%",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333",
    backgroundColor: "#fff",
    textAlign: "center",
    cursor: "pointer",
    outline: "none",
    boxShadow: "none",
    transition: "all 0.2s ease-in-out",
    WebkitAppearance: "none",
    MozAppearance: "none",
    appearance: "none",
    WebkitBoxShadow: "none",
    MozBoxShadow: "none",
}
export default function SelectInput(props: any) {
    const fullAddressIndex = 14;
    const setDisplay = props.setDisplay;
    const setHeight = props.setHeight;
    const setSelectedIndex = props.setSelectedIndex;
    const setUrl = props.setUrl;
    const FORM_ID = props.FORM_ID;
    const rows = props.rows;
    const setSelectedRow = props.setSelectedRow;
    const selectedRow = props.selectedRow;
    const statusState = props.statusState;
    const submissionStatus = props.submissionStatus;
    const setSubmissionStatus = props.setSubmissionStatus;    
    const [toggleButtonValue, setToggleButtonValue] = useState(false);
    
    const handleSelect = (e: any) => {
        const index = e.target.value;
        setSelectedIndex(index);
        const row = rows[index];
        setSelectedRow(row);
    }

    const handleGoForm = () => {
        //@ts-ignore
        const rep = selectedRow[2];
        //@ts-ignore
        const fullAddress = selectedRow[fullAddressIndex];
        //@ts-ignore
        const guid = selectedRow[9];
        const url = `https://form.jotform.com/${FORM_ID}?REP=${rep}&STORE=${fullAddress}&GUID=${guid}`;//&clientName=${clientName}$clientEmail=${clientEmail}`;
        window.open(url, "_blank");        
    }

    const handleSeeForm = () => {
        //@ts-ignore
        const rep = selectedRow[2];
        //@ts-ignore
        const fullAddress = selectedRow[fullAddressIndex];
        //@ts-ignore
        const guid = selectedRow[9];
        const url = `https://form.jotform.com/${FORM_ID}?REP=${rep}&STORE=${fullAddress}&GUID=${guid}`;//&clientName=${clientName}$clientEmail=${clientEmail}`;
        setUrl(url);
        setDisplay("block");
        setHeight("100%");
    }

    const handleHideForm = () => {
        setDisplay("none");
        setHeight("100vh");
    }

    return (
        <div className="select-input">            
            <div className="above-selection-class">
                <h6>Show Only Open Tasks</h6>
                <ToggleButton
                    inactiveLabel={'Open'}
                    activeLabel={'Closed'}
                    value={ toggleButtonValue || false }
                    thumbStyle={borderRadiusStyle}
                    trackStyle={borderRadiusStyle}
                    onToggle={(value:any) => {
                        setToggleButtonValue(!value);
                        setSubmissionStatus(value ? "ACTIVE" : "CLOSED");
                    }} />
            </div>
            <select className="select" onChange={handleSelect}>
                <option value="" className="option">CHOOSE</option>
                {rows.map((row: any, index: number) => <option className="option" key={row[fullAddressIndex]} value={index}>{row[fullAddressIndex]}</option>)}
            </select>
            <div className="selected-row">
                {/* {selectedRow ? <h1>{selectedRow[fullAddressIndex]}</h1> : null} */}
                {selectedRow ? <button onClick={handleGoForm}>go to form</button> : null}
                {selectedRow ? <button onClick={handleSeeForm}>see the form</button> : null}
                {selectedRow ? <button onClick={handleHideForm}>hide the form</button> : null}
            </div>
        </div>
    );
}