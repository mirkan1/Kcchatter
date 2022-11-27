import { useState, useEffect, useRef } from "react";
import FormHandler from "../handlers/FormHandler";
import SelectInput from "../components/SelectInput";
import SubmissionDiv from "../components/SubmissionDiv";
//@ts-ignore
import JotformEmbed from './react-jotform-embed.js';
import "./Home.css";
import Select from 'react-select';
import SimpleImageSlider from 'react-simple-image-slider';

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

    const dummyImg0 = new URL('../imgs/image0.jpg', import.meta.url).href;
    const dummyImg1 = new URL('../imgs/image1.png', import.meta.url).href;
    const [count, setCount] = useState(0);
    const [store, setStore] = useState({
                                value: [
                                {name: 'init0', pics: [{url: dummyImg1},{url: dummyImg0},{url: dummyImg0},{url: dummyImg0}]}, 
                                {name: 'init0', pics: [{url: dummyImg0},{url: dummyImg0},{url: dummyImg0},{url: dummyImg0}]}
                                ]});
    const options = [
        {value: [
            {name: 'blues', pics: [dummyImg0,dummyImg0,dummyImg0,dummyImg0]},
            {name: 'rock', pics: [dummyImg0,dummyImg0,dummyImg0,dummyImg0]}
        ], label: 'Cool'},
        {value: [
            {name: 'jazz', pics: [dummyImg0,dummyImg0,dummyImg0,dummyImg1]},
            {name: 'orchestra', pics: [dummyImg1,dummyImg0,dummyImg0,dummyImg0,dummyImg1,dummyImg0,dummyImg1,dummyImg1]}
        ], label: 'Artistic'}];

    //function handleImgs(task) { // this does not work. idk why
    //    console.log('task curPics', task.curPics)
    //    task.curPics[0] += 4;
    //    task.curPics[1] += 4;
    //    if (task.curPics[0] > task.pics.length) {
    //        task.curPics = [0,4];
    //    }
    //    console.log('next curPics', task.curPics)
    //    console.log('store', store.value[1].curPics)
    //    opt = options[1]
    //    opt.values.curPics = task.curPics
    //    setStore({value: [opt], label:'yavak'})
    //};

    //function handleImgsV2(task) { // this does not work. idk why
    //    //store.value.map(cur_task =>
    //    //    //if (cur_task.name == task.name){
    //    //        //task.curPics[0] += 4;
    //    //        //task.curPics[1] += 4;
    //    //        //if (task.curPics[0] > task.pics.length) {
    //    //        //    task.curPics = [0,4];
    //    //        //}
    //    //    //    cur_task.curPics = task.curPics;
    //    //    //}
    //    //)
    //    store.value[1].curPics = [2,5];
    //    setStore(store)  
    //    console.log(store.value[1].curPics)
    //    //setCount(count+1)
    //}

    //useEffect(() => {
    //   const forSetter = async () => {
    //       await formHandler.getForm(formId);
    //       setRealTotalSubmissions(formHandler.count || "0");
    //       const submissions = await formHandler.getSubmissionsByEmail(user.email);
    //       if (submissions.status == 200) {
    //           setSubmissions(Object.values(submissions.content));
    //           setTotalSubmissions(submissions.count);
    //       } else {
    //           setSubmissions([]);
    //           setTotalSubmissions(0);
    //           alert("There was an error getting your submissions. Please try again later.");
    //       }
    //   }
    //   forSetter()
    //      .catch((err: any) => console.log(err));
    //}, []);
    //useEffect(() => {
    //    const iframe = iframeRef.current;
    //    const smallerBody = bodyRef.current;
    //    if (iframe) {
    //        //@ts-ignore
    //        iframe.style.display = display;
    //        //@ts-ignore
    //        iframe.style.height = height;
    //        //@ts-ignore
    //        smallerBody.style.height = height;
    //    }
    //}, [display, height]);
    //useEffect(() => {
    //   var images = document.querySelectorAll("#pic");
    //   var imgObserver = new IntersectionObserver((entries, imgObserver) => {
    //     entries.forEach((entry) => {
    //       if (!entry.isIntersecting) return;
    //       const img = entry.target;
    //       const dataLazy = img.getAttribute("data-lazy");
    //       if (dataLazy) {
    //           img.setAttribute("src", dataLazy);
    //       }
    //       imgObserver.unobserve(entry.target);
    //     });
    //   });
    
    //   images.forEach((img) => {
    //     imgObserver.observe(img);
    //   });

    //}, [selectedRow, submissions]);

//<select className='text-center bg-lightblue border-2 rounded-md h-10 w-full' name="stores" id="stores">
//                <option value="store1">STORE1</option>
//                <option value="store2">Store2</option>
//                <option value="store3">Store3</option>
//            </select>
    return (
        <div className='container mx-auto'>
            <div className='p-6 '>
                <Select onChange={(selectedOption: any) => {setStore(selectedOption)}} options={options}/>
            </div>
            <div className='flex justify-left items-center rounded-md pl-6'>
                <div className="bg-green-300 rounded-md">
                <b className='text-green-800 p-4'>OPEN</b>
                </div>
            </div>            
            {store.value.map(task => 
            <div className="p-6">
                <div className="bg-dark text-center items-center w-full rounded-t-md p-2">
                    <h1 className='text-lightblue'>{task.name}</h1>
                </div>

                <div className="container flex flex-col gap-6 bg-midblue rounded-b-md p-8">
                    <div className='flex gap-4 w-11/12'>
                            <div className="bg-lightblue w-8/12 rounded-md p-4">
                                <h1 className="text-xs lg:text-lg"><b>CMK REP:&emsp;</b>{'SCOTT SERFASS'}</h1>
                                <h1 className="text-xs lg:text-lg"><b>CATEGORY:&emsp;</b>FAMILY</h1>
                                <h1 className="text-xs lg:text-lg"><b>CMK REP:&emsp;</b>COMPETITIVE INTEL, DISPLAYS, SUCCESSES, DAMAGED ..</h1>
                                <h1 className="text-xs lg:text-lg"><b>COMMENTS:&emsp;</b>THIS IS AN EXAMPLE OF A COMMEND</h1>
                            </div>
                            <div className="justify-end w-4/12 bg-lightblue rounded-md p-4">
                                <h1 className="text-xs lg:text-lg"><b>STATUS:&emsp;</b><b className="text-green-500">OPEN</b></h1>
                                <h1 className="text-xs lg:text-lg"><b>OPEN DATA:&emsp;</b>11.20.2022</h1>
                                <h1 className="text-xs lg:text-lg"><b>FOLLOW-UP:&emsp;</b>YES</h1>
                            </div>
                    </div>
                    <div className="flex justify-center bg-lightblue p-4 w-11/12 rounded-md">
                        <SimpleImageSlider width={280} height={200} images={task.pics} showBullets={true} showNavs={true}/>
                    </div>
                    
                    <div className='flex gap-32'>
                            <div className="bg-lightblue w-8/12 rounded-md p-4">
                                <h1 className="text-xs lg:text-lg"><b>CLIENT RESPONSE:&emsp;</b>Example</h1>
                                <h1 className="text-xs lg:text-lg"><b>CMK REP RESPONSE:&emsp;</b>Example </h1>
                            </div>
                            <div className="flex justify-end w-4/12 gap-3 p-4">
                                <button className="text-center bg-dark  rounded-md p-4">
                                    <h1 className="text-xs lg:text-lg text-lightblue">CLIENT REPLY</h1>
                                </button>
                                <button className="text-center bg-dark rounded-md p-4">
                                    <h1 className="text-xs lg:text-lg text-lightblue">REP REPLY</h1>
                                </button>
                            </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}

export default Home;
// https://www.jotform.com/edit/5443385842114401565