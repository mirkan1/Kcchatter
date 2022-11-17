import { useState, useEffect } from "react";
import FormHandler from "../handlers/FormHandler";
import "./Home.css";

function Home(props: any) {
    const formHandler = new FormHandler(props.FORM_ID);
    const user = props.user;
    const [count, setCount] = useState("");
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

    return (
        <div className="smaller-body">
            <h1>Welcome To Home Page</h1>
            <h2>Submissions Count: {count}</h2>
            <button onClick={getSubmsissionsCount}>Get Submissions Count</button>
        </div>
    );
}

export default Home;