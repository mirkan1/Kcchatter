import { useState, useEffect} from "react";
import FormHandler from "../handlers/FormHandler";
import Navbar from '../components/Navbar';
//@ts-ignore
import "./Home.css";
import Select from 'react-select';
import SimpleImageSlider from 'react-simple-image-slider';

type answerType = {
    name: string;
    order: string;
    text: string;
    type: string;
    answer: string;
}

type photoAnswerType = {
    name: string;
    order: string;
    text: string;
    type: string;
    answer: [];
}


function Home(props: any) {
    const formId = props.FORM_ID;
    const formHandler = new FormHandler(formId);

    const user = props.user;
    const setUser = props.setUser
    const [submissions, setSubmissions] = useState([]);
    const [selectedStore, setSelectedStore] = useState([]);
    const [size, setSize] = useState(0); // Img sizes

    const handleSelection = (selectedOption: any) => {
        setSelectedStore(Object.values(selectedOption))
    }

    useEffect(() => {
        const fetchData = async () => {
           await formHandler.getForm(formId);
           const submissions = await formHandler.getSubmissionsByEmail(user.email);
           if (submissions.status == 200) {
               setSubmissions(Object.values(submissions.content));
           } else {
               alert("There was an error getting your submissions. Please try again later.");
           }
       }
       const result=fetchData()
          .catch((err: any) => console.log(err));

        function handleResize(){
            if (window.innerWidth < 740)
                setSize(window.innerWidth/3)
            else
                setSize(400)
        }
        handleResize() // Initial value
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const firstSubmissionHandler = () => {
        const url = ""
    }

    var submissionsCount = {active: 0, inactive: 0};
    return (
        <>
        {console.log(submissionsCount)}
        <Navbar user={user} setUser={setUser} submissionsCount={submissionsCount}/>
        <div className='bg-crossmaskblue flex-col justify-center mx-auto'>
            <div className='container mx-auto p-6'>
                <Select onChange={(selectedOption: any) => {handleSelection(selectedOption)}} options={user.rows} getOptionValue={option=>option} getOptionLabel={option=>option[14]}/>
            </div>
                        
            {selectedStore.length ? <div className='container mx-auto flex justify-left items-center rounded pl-6 '>
               <button className='bg-green-300 transtion hover:bg-green-200 transition rounded font-bold text-green-900 p-2 lg:p-4' onClick={firstSubmissionHandler}>OPEN</button>
            </div>: null}
            {submissions.map((item: any, idx) => {
            const answers = Object.values(item.answers);
            const store = answers.find((answer: any) => answer.name?.toLowerCase().startsWith("store")) as answerType;            
            const rep = answers.find((answer: any) => answer.name?.toLowerCase().startsWith("rep")) as answerType;
            const comments = answers.find((answer: any) => answer.name?.toLowerCase().startsWith("comments")) as answerType;
            const photos = answers.find((answer: any) => answer.name?.toLowerCase().startsWith("photos")) as photoAnswerType;
            const toggle = answers.find((answer: any) => answer.name?.toLowerCase().startsWith("toggle")) as answerType;
            const category = answers.find((answer: any) => answer.name?.toLowerCase().startsWith("category")) as answerType;
            const clientMessage = answers.find((answer: any) => answer.name?.toLowerCase().startsWith("clientmessage")) as answerType;
            const clientName = answers.find((answer: any) => answer.name?.toLowerCase().startsWith("clientname")) as answerType;
            const clientEmail = answers.find((answer: any) => answer.name?.toLowerCase().startsWith("clientemail")) as answerType;
            const topics = answers.find((answer: any) => answer.name?.toLowerCase().startsWith("topics")) as answerType;
            const repResponse = answers.find((answer: any) => answer.name?.toLowerCase().startsWith("represponse")) as answerType;
            const repMessage = answers.find((answer: any) => answer.name?.toLowerCase().startsWith("repmessage")) as answerType;
            const repEmail = answers.find((answer: any) => answer.name?.toLowerCase().startsWith("rremail")) as answerType;
            const followUpNeeded = answers.find((answer: any) => answer.name?.toLowerCase().startsWith("followupneeded")) as answerType;
            if (store.answer.toUpperCase() != selectedStore[14]?.toUpperCase()) {
                return null;
            }
            if (item.status == "ACTIVE")
                submissionsCount.active += 1;
            else
                submissionsCount.inactive += 1;
            //console.log('answers', answers)
            return(
            <div className="container mx-auto p-6 font-mono" key={idx}>
                <div className="bg-white border-b border-gray-300 text-center rounded-t p-2">
                    <p>{store.answer}</p>
                </div>

                <div className="flex flex-col gap-2 lg:gap-6 bg-white border-1 border-gray-300 rounded-b p-4 lg:p-8">
                    <div className='lg:flex gap-4'>
                        <div className="border-2 border-gray-500 lg:w-8/12 rounded p-4">
                            <p className="text-xs lg:text-lg"><b>CMK REP:&emsp;</b>{rep.answer}</p>
                            <p className="text-xs lg:text-lg"><b>CATEGORY:&emsp;</b>{category.answer}</p>
                            <p className="text-xs lg:text-lg"><b>TOPICS:&emsp;</b>{topics.answer}</p>
                            <p className="text-xs lg:text-lg"><b>COMMENTS:&emsp;</b>{comments.answer}</p>
                        </div>
                        <div className="justify-end lg:w-4/12 border-2 border-gray-500 rounded p-4 mt-2 lg:m-0">
                            {(item.status == "ACTIVE") ?
                            <p className="text-xs lg:text-lg"><b>STATUS:&emsp;</b><b className="text-green-500">{item.status}</b></p>:
                            <p className="text-xs lg:text-lg"><b>STATUS:&emsp;</b><b className="text-red-500">{item.status}</b></p>
                            }
                            <p className="text-xs lg:text-lg"><b>OPEN DATA:&emsp;</b>{item.created_at}</p>
                            <p className="text-xs lg:text-lg"><b>FOLLOW-UP:&emsp;</b>{followUpNeeded.answer}</p>
                        </div>
                    </div> {photos ?
                    <div className="flex justify-center border-2 border-gray-500 p-4 rounded">
                        <SimpleImageSlider width={size} height={size} images={photos.answer} showBullets={false} showNavs={false}/>
                    </div>:
                    <div className="flex justify-center border-2 border-gray-500 p-4 rounded">
                        <SimpleImageSlider width={size} height={size} images={[]} showBullets={true} showNavs={true}/>
                    </div>
                    }
                    
                    <div className='lg:flex lg:items-end'>
                        <div className="border-2 border-gray-500 w-full rounded p-4">
                            <p className="text-xs lg:text-lg"><b>CLIENT RESPONSE:&emsp;</b>{clientMessage.answer}</p>
                            <p className="text-xs lg:text-lg"><b>CMK REP RESPONSE:&emsp;</b>{repMessage.answer}</p>
                        </div>
                        <div className="flex lg:justify-end lg:w-4/12 mt-2 lg:m-0">
                            <a className="text-white text-xs lg:text-base border-2 border-gray-400 bg-crossmaskblue rounded transition hover:bg-indigo-800 p-2 mr-2" 
                            href={'https://www.jotform.com/edit/'+item.id}>
                                EDIT
                            </a>
                            <button className="text-white text-xs lg:text-base border-2 border-gray-400 bg-crossmaskblue rounded transition hover:bg-indigo-800 p-2">
                                REP REPLY
                            </button>
                        </div>
                    </div>
                </div>
            </div>)
            })}
            {!(submissionsCount.active) ? <div className="h-screen bg-crossmaskblue"/>: null}
        </div>
        </>
    );
}

export default Home;
// https://www.jotform.com/edit/5443385842114401565
