import jotform from "jotform";
import { Date } from "mongoose";
// require("dotenv").config();

type FormType = {
    content: string | object | [];
    responseCode: number;
    duration: number;
    message: answerType;
}

type answerType = {
    name: string;
    order: string;
    text: string;
    type: string;
    answer: string | object
}

type SubmissionType = {
    id: string;
    form_id: string;
    ip: string;
    created_at: string;
    status: string;
    new: string;
    flag: string;
    notes: string;
    updated_at: string; // "YYYY-MM-DD HH:MM:SS"
    answers: object;
}

class Jotform {
    private jotform: any;
    submissions: object = {};
    lastFormId: number | string;
    constructor(debug: boolean = false) {
        jotform.options({
            debug: debug,
            apiKey: process.env.JOTFORM_API_KEY
        });
        this.jotform = jotform
    }

    getJotform() {
        return this.jotform;
    }

    getSubmissionIfExists(submissionId: string) {
        return this.submissions[submissionId];
    }

    setSubmissionIntoSubmissions(submission: SubmissionType) {
        this.submissions[submission.id] = submission;
    }

    async getSubmission(submissionId: string) {
        const submission:SubmissionType = this.getSubmissionIfExists(submissionId) || await this.jotform.getSubmission(submissionId); 
        this.setSubmissionIntoSubmissions(submission);
        return submission;
    }

    async getForm(formId: string | number) {
        const form:FormType = await this.jotform.getForm(formId);
        this.lastFormId = formId;
        return form;
    }

    async deleteSubmission(submissionId: string) {
        try {
            await this.jotform.deleteSubmission(submissionId);
            return true;
        } catch {
            return false;
        }
    }

    async editSubmission(submissionId: string, data: object) {
        try {
            await this.jotform.editSubmission(submissionId, data);
            return true;
        } catch {
            return false;
        }
    }

    async editSubmissionField(submissionId: string, fieldId: string, value: string) {
        const data = {
            [`submission[${fieldId}]`]: value
        }
        return await this.editSubmission(submissionId, data);
    }
}

export default Jotform;