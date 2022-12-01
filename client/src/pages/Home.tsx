import { useState, useEffect} from "react";
import FormHandler from "../handlers/FormHandler";
import Navbar from '../components/Navbar';
import Select from 'react-select';
import SimpleImageSlider from 'react-simple-image-slider';

type answerType = {
    name: string;
    order: string;
    text: string;
    type: string;
    answer: string;
}

function Home(props: any) {
    const formId = props.FORM_ID;
    const formHandler = new FormHandler(formId);
    const user = props.user;
    const setUser = props.setUser
    const [submissions, setSubmissions] = useState([]);
    const [selectedStore, setSelectedStore] = useState(Array<any>);
    const [all, setAll] = useState(false);
    const [size, setSize] = useState(0); // Img sizes

    function dataHandler(answers: any){
        function keyFinder(answers: any, key: string){
            return answers.find((answer: any) => answer.name?.toLowerCase().startsWith(key)) as answerType;            
        }
        let outAnswers: any = {};
        const keys: Array<string> = ['store', 'rep', 'comments', 'photos', 'toggle', 'category', 'clientmessage', 'clientname', 'clientemail', 'topics', 'represponse', 'repmessage', 'rremail', 'followupneeded', '🥔'];
        keys.forEach((key) => {
            outAnswers[key] = keyFinder(answers, key);
        })
        return outAnswers
    }
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
        const baseUrl = "https://jotform.com/" + formId + "?";
        const params = "&REP=1&STORE=2&3=3&";
        const url = baseUrl+params;
        return window.location.href = url;
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
                        
            <div className='container mx-auto flex justify-left items-center rounded pl-6 '>
               {selectedStore.length ? <button className='bg-white-300 transtion bg-white hover:bg-gray-300 border-2 border-gray-400 transition rounded font-bold text-green-900 p-2 lg:p-3 mr-2' onClick={firstSubmissionHandler}>OPEN FORM</button>: null}
               <button className='bg-white-300 transtion bg-white hover:bg-gray-300 border-2 border-gray-400 transition rounded font-bold text-green-900 p-2 lg:p-3' onClick={() => {setAll(!all)}}>{all ? 'SHOW LESS': 'SHOW ALL'}</button>
            </div>
            {submissions.map((item: any, idx) => {
            
            const answers = dataHandler(Object.values(item.answers)) as any;
            
            if (all || (answers.store.answer.toUpperCase() == selectedStore[14]?.toUpperCase())) {
            if (item.status == "ACTIVE")
                submissionsCount.active += 1;
            else
                submissionsCount.inactive += 1;
            return(
            <div className="container mx-auto p-6 font-mono" key={idx}>
                {(item.status == "ACTIVE") ?
                <div className="font-bold text-green-900 text-xs lg:text-lg bg-green-300 border-b border-gray-300 text-center rounded-t p-2">{all ? answers.store.answer +' [' + item.status +']': item.status}
                </div>:
                <div className="font-bold text-xs lg:text-lg bg-red-400 border-b border-gray-300 text-center rounded-t p-2">{'CLOSED'}
                </div>}

                <div className="flex flex-col gap-2 lg:gap-6 bg-white border-1 border-gray-300 rounded-b p-4 lg:p-8">
                    <div className='lg:flex gap-4'>
                        <div className="border-2 border-gray-500 lg:w-8/12 rounded p-4">
                            <p className="text-xs lg:text-lg"><b>CMK REP:&emsp;</b>{answers.rep.answer}</p>
                            <p className="text-xs lg:text-lg"><b>CATEGORY:&emsp;</b>{answers.category.answer}</p>
                            <p className="text-xs lg:text-lg"><b>TOPICS:&emsp;</b>{answers.topics.answer}</p>
                            <p className="text-xs lg:text-lg"><b>COMMENTS:&emsp;</b>{answers.comments.answer}</p>
                        </div>
                        <div className="justify-end lg:w-4/12 border-2 border-gray-500 rounded p-4 mt-2 lg:m-0">
                            
                            <p className="text-xs lg:text-lg"><b>OPEN DATA:&emsp;</b>{item.created_at}</p>
                            <p className="text-xs lg:text-lg"><b>FOLLOW-UP:&emsp;</b>{answers.followupneeded.answer}</p>
                        </div>
                    </div> {answers.photos ?
                    <div className="flex justify-center border-2 border-gray-500 p-4 rounded">
                        <SimpleImageSlider width={size} height={size} images={answers.photos.answer} showBullets={false} showNavs={false}/>
                    </div>:
                    <div className="flex justify-center border-2 border-gray-500 p-4 rounded">
                        <SimpleImageSlider width={size} height={size} images={[]} showBullets={true} showNavs={true}/>
                    </div>
                    }
                    
                    <div className='lg:flex lg:items-end'>
                        <div className="border-2 border-gray-500 w-full rounded p-4">
                            <p className="text-xs lg:text-lg"><b>CLIENT RESPONSE:&emsp;</b>{answers.clientmessage.answer}</p>
                            <p className="text-xs lg:text-lg"><b>CMK REP RESPONSE:&emsp;</b>{answers.repmessage.answer}</p>
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

            }
            else if (answers.store.answer.toUpperCase() != selectedStore[14]?.toUpperCase()) {
                return null;
            }
            })}
        </div>
        </>
    );
}

export default Home;
// https://www.jotform.com/edit/5443385842114401565
