import { useState, useEffect } from "react";
import "./SubmissionDiv.css";

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

export default function SubmissionDiv(props: any) {
    const sumbissions = props.submissions;
    if (!sumbissions.length) return null;
    const selectedRow = props.selectedRow;
    const submissionStatus = props.submissionStatus;
    const submissionsCount = props.submissionsCount;
    const setSubmissionsCount = props.setSubmissionsCount;
    return (
        <div className="submissions-holder">
        {sumbissions ? sumbissions.map((item: any, index: number) => {
            const { id, created_at, updated_at, status } = item;
            if (submissionStatus) {
                // TODO
                console.log(status, status === "ACTIVE");
                // setSubmissionsCount({
                //     open: status === "ACTIVE" ? submissionsCount.open + 1 : submissionsCount.open,
                //     closed: status === "CLOSED" ? submissionsCount.closed + 1 : submissionsCount.closed,
                // });
                if (submissionStatus !== status) return null;
            }
            const answers = Object.values(item.answers);
            const store = answers.find((answer: any) => answer.name?.toLowerCase().startsWith("store")) as answerType;
            if (selectedRow) {
                const selectedStore = selectedRow[14];
                if (store.answer.toUpperCase() != selectedStore?.toUpperCase()) {
                    return null;
                }
            }
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
            // make a div with 4 columns and 7 rows using grid css
            return (
                <div className="single-submission" key={id}>
                    <div><p>{store.answer}</p></div>
                    <div className="single-submission-row">
                        <div className="single-submission-column">
                            <div className="single-submission-cell">
                                <h6>Rep</h6>
                                <p>{rep.answer}</p>
                            </div>
                            <div className="single-submission-cell">
                                <h6>Category</h6>
                                <p>{category.answer}</p>
                            </div>
                            <div className="single-submission-cell">
                                <h6>Topics</h6>
                                <p>{topics.answer}</p>
                            </div>
                            <div className="single-submission-cell">
                                <h6>Comments</h6>
                                <p>{comments.answer}</p>
                            </div>
                            <div className="single-submission-cell">
                                <h6>Client Message</h6>
                                <p>{clientMessage.answer}</p>
                            </div>
                            <div className="single-submission-cell">
                                <h6>Rep Response</h6>
                                <p>{repResponse.answer}</p>
                            </div>
                        </div>
                        <div className="single-submission-column-right-with-photo">
                            <div className="single-submission-cell">
                                <h6>Status</h6>
                                <p>{status}</p>
                            </div>
                            <div className="single-submission-cell">
                                <h6>Created At</h6>
                                <p>{created_at}</p>
                            </div>
                            <div className="single-submission-cell">
                                <h6>Follow Up Needed</h6>
                                <p>{followUpNeeded.answer}</p>
                            </div>
                            <div className="single-submission-cell photos-cell">
                                {photos.answer.map((photo: string, index: number) => {
                                    return <img id="pic" data-lazy={photo} alt={index.toString()} key={index} className="submission-img"/>
                                })}                                
                            </div>
                        </div>
                    </div>
                </div>
            )
        }) : null}
        </div>                
    )
}
