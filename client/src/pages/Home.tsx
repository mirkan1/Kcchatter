import { useState, useEffect} from "react";
import FormHandler from "../handlers/FormHandler";
import Navbar from '../components/Navbar';
//@ts-ignore
import "./Home.css";
import Select from 'react-select';
import SimpleImageSlider from 'react-simple-image-slider';


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

    var submissionsCount = {active: 0, inactive: 0};
    return (
        <>
        <Navbar user={user} setUser={setUser} submissionsCount={submissionsCount}/>
        <div className='bg-crossmaskblue flex-col justify-center mx-auto'>
            <div className='container mx-auto p-6'>
                <Select onChange={(selectedOption: any) => {handleSelection(selectedOption)}} options={user.rows} getOptionValue={option=>option} getOptionLabel={option=>option[14]}/>
            </div>
                        
            {selectedStore.length ? 
            <div className='container mx-auto flex justify-left items-center rounded pl-6 '>
                <div className="bg-green-300 rounded">
                    <button className='font-bold text-green-800 p-4'>OPEN</button>
                </div>
            </div>: <div className="h-screen bg-crossmaskblue"/>}
            {submissions.map((item, idx) => {
            const answers = Object.values(item.answers);
            const store = answers.find((answer: any) => answer.name?.toLowerCase().startsWith("store")); //handle better since index 3 at answers -> answers[3].answer
            if (store.answer.toUpperCase() != selectedStore[14]?.toUpperCase()){
                return null;
            }
            if (item.status == "ACTIVE")
                submissionsCount.active += 1;
            else
                submissionsCount.inactive += 1;
            //console.log('answers', answers)
            return(
            <div className="container mx-auto p-6 font-mono">
                <div className="bg-white border-b border-gray-300 text-center items-center rounded-t p-2">
                    <p className='font-medium'>ID:&emsp;{item.id}</p>
                </div>

                <div className="flex flex-col gap-6 bg-white border-1 border-gray-300 rounded-b p-8">
                    <div className='flex gap-4'>
                            <div className="border-2 border-gray-500 w-8/12 rounded p-4">
                                <p className="text-xs lg:text-lg"><b>CMK REP:&emsp;</b>{answers[5].answer}</p>
                                <p className="text-xs lg:text-lg"><b>CATEGORY:&emsp;</b>{answers[8].answer}</p>
                                <p className="text-xs lg:text-lg"><b>TOPICS:&emsp;</b>{answers[17].answer}</p>
                                <p className="text-xs lg:text-lg"><b>COMMENTS:&emsp;</b>{answers[9].answer}</p>
                            </div>
                            <div className="justify-end w-4/12 border-2 border-gray-500 rounded p-4">
                                {(item.status == "ACTIVE") ?
                                <p className="text-xs lg:text-lg"><b>STATUS:&emsp;</b><b className="text-green-500">{item.status}</b></p>:
                                <p className="text-xs lg:text-lg"><b>STATUS:&emsp;</b><b className="text-red-500">{item.status}</b></p>
                                }
                                <p className="text-xs lg:text-lg"><b>OPEN DATA:&emsp;</b>{item.created_at}</p>
                                <p className="text-xs lg:text-lg"><b>FOLLOW-UP:&emsp;</b>NaN</p>
                            </div>
                    </div> {answers[10].answer.length==1 ?
                    <div className="flex justify-center border-2 border-gray-500 p-4 rounded">
                        <SimpleImageSlider width={size} height={size} images={answers[10].answer} showBullets={false} showNavs={false}/>
                    </div>:
                    <div className="flex justify-center border-2 border-gray-500 p-4 rounded">
                        <SimpleImageSlider width={size} height={size} images={answers[10].answer} showBullets={true} showNavs={true}/>
                    </div>
                    }
                    
                    <div className='flex gap-2'>
                            <div className="border-2 border-gray-500 w-8/12 rounded p-4">
                                <p className="text-xs lg:text-lg"><b>CLIENT RESPONSE:&emsp;</b>NaN</p>
                                <p className="text-xs lg:text-lg"><b>CMK REP RESPONSE:&emsp;</b>NaN </p>
                            </div>
                            <div className="flex justify-end w-4/12 gap-3">
                                <button className="w-24 lg:w-32 text-center border-2 border-gray-400 bg-crossmaskblue rounded lg:p-4 transition hover:bg-indigo-800">
                                    <p className="text-xs lg:text-lg text-lightblue">CLIENT REPLY</p>
                                </button>
                                <button className="w-24 lg:w-32 text-center border-2 border-gray-400 bg-crossmaskblue rounded lg:p-4 transition hover:bg-indigo-800">
                                    <p className="text-xs lg:text-lg text-lightblue">REP REPLY</p>
                                </button>
                            </div>
                    </div>
                </div>
            </div>)
            })}
        </div>
        </>
    );
}

export default Home;
// https://www.jotform.com/edit/5443385842114401565
