import { useState, useEffect } from "react";
import FormHandler from "../handlers/FormHandler";
import SelectInput from "../components/SelectInput";
//@ts-ignore
import JotformEmbed from './react-jotform-embed.js';
import "./Home.css";

function Home(props: any) {
    const FORM_ID = props.FORM_ID;
    const formHandler = new FormHandler(FORM_ID);
    const user = props.user;
    const [count, setCount] = useState("");
    const [display, setDisplay] = useState("none");
    const formId = props.FORM_ID;
    const getSubmsissionsCount = async () => {
        const count = await formHandler.getTotalSubmissions(formId);
        console.log("count", count);
        setCount(count);
    }
    useEffect(() => {
        const forSetter = async () => {
            const form = await formHandler.getForm(formId);
            setCount(formHandler.count || "");
            console.log("formHandler", formHandler);
        }
        forSetter()
           .catch((err: any) => console.log(err));
    }, []);
    useEffect(() => {
        const iframe = document.querySelector(".iframe");
        console.log("iframe", iframe)
        if (iframe) {
            //@ts-ignore
            iframe.style.display = display;
        }
    }, [display]);

    return (
        <div className="smaller-body">
            <h1>Welcome To Home Page</h1>
            <h2>Submissions Count: {count}</h2>
            {/* <button onClick={getSubmsissionsCount}>Get Submissions Count</button> */}
            <SelectInput rows={user.rows} FORM_ID={FORM_ID} setDisplay={setDisplay}/>
            <JotformEmbed src="https://form.jotform.com/222004147160036" className="iframe" />
        </div>
    );
}

export default Home;