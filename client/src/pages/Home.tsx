import { useState, useEffect, useRef } from "react";
import FormHandler from "../handlers/FormHandler";
import SelectInput from "../components/SelectInput";
import SubmissionDiv from "../components/SubmissionDiv";
//@ts-ignore
import JotformEmbed from './react-jotform-embed.js';
import "./Home.css";
// const toggleInput = document.querySelector("#input_39").value = "CLIENT"
// const toggleInput = document.querySelector("#input_39").value = "REPS"
function Home(props: any) {
    const formId = props.FORM_ID;
    const setTotalSubmissions = props.setTotalSubmissions;
    const totalSubmissions = props.totalSubmissions;
    const setSubmissionsCount = props.setSubmissionsCount;
    const submissionsCount = props.submissionsCount;
    const formHandler = new FormHandler(formId);
    const user = props.user;
    const [display, setDisplay] = useState("none");
    const [height, setHeight] = useState("100vh");
    const [url, setUrl] = useState("");
    const [submissions, setSubmissions] = useState([]);    
    const [index, setSelectedIndex] = useState({});
    const [selectedRow, setSelectedRow] = useState(null);
    const [submissionStatus, setSubmissionStatus] = useState("");
    // for refreshing purposes
    const [realTotalSubmissions, setRealTotalSubmissions] = useState("");
    const bodyRef = useRef(null);
    const iframeRef = useRef(null);
    useEffect(() => {
        const forSetter = async () => {
            await formHandler.getForm(formId);
            setRealTotalSubmissions(formHandler.count || "0");
            const submissions = await formHandler.getSubmissionsByEmail(user.email);
            if (submissions.status == 200) {
                setSubmissions(Object.values(submissions.content));
                setTotalSubmissions(submissions.count);
            } else {
                setSubmissions([]);
                setTotalSubmissions(0);
                alert("There was an error getting your submissions. Please try again later.");
            }
        }
        forSetter()
           .catch((err: any) => console.log(err));
    }, []);
    useEffect(() => {
        const iframe = iframeRef.current;
        const smallerBody = bodyRef.current;
        if (iframe) {
            //@ts-ignore
            iframe.style.display = display;
            //@ts-ignore
            iframe.style.height = height;
            //@ts-ignore
            smallerBody.style.height = height;
        }
    }, [display, height]);
    useEffect(() => {
        var images = document.querySelectorAll("#pic");
        var imgObserver = new IntersectionObserver((entries, imgObserver) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const img = entry.target;
            const dataLazy = img.getAttribute("data-lazy");
            if (dataLazy) {
                img.setAttribute("src", dataLazy);
            }
            imgObserver.unobserve(entry.target);
          });
        });
    
        images.forEach((img) => {
          imgObserver.observe(img);
        });

    }, [selectedRow, submissions]);

    return (
        <>
            <div ref={bodyRef} className="selection-body">
                {/* <h2>{totalSubmissions}</h2> */}
                {/* <button onClick={getSubmsissionsCount}>Get Submissions Count</button> */}
                <SelectInput 
                    rows={user.rows} 
                    FORM_ID={formId} 
                    setDisplay={setDisplay} 
                    setHeight={setHeight} 
                    setUrl={setUrl} 
                    setSelectedRow={setSelectedRow} 
                    setSelectedIndex={setSelectedIndex}
                    selectedRow={selectedRow}
                    submissionStatus={submissionStatus}
                    setSubmissionStatus={setSubmissionStatus}
                />
            </div>
            <SubmissionDiv
                submissions={submissions} 
                selectedRow={selectedRow}
                submissionStatus={submissionStatus}
                setSubmissionsCount={setSubmissionsCount}
                submissionsCount={submissionsCount}
            />

            {url ? <JotformEmbed src={url} className="iframe" scrolling={true} re={iframeRef} /> : null}
        </>
    );
}

export default Home;
// https://www.jotform.com/edit/5443385842114401565