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
    form_id: string; // FormType
    ip: string;
    created_at: string; // "YYYY-MM-DD HH:MM:SS"
    status: string;
    new: string;
    flag: string;
    notes: string;
    updated_at: string; // "YYYY-MM-DD HH:MM:SS"
    answers: object;
}

class Jotform {
    private jotform: any;
    private submissions: SubmissionType[] = [];
    private submissionCount: number = 0;
    private formId: number | string;
    private limit: number = 1000;
    private offset: number = 0;
    private isReady: boolean = false;
    constructor(debug: boolean = false, formId: string | number = null, limit: number = 1000) {
        jotform.options({
            debug: debug,
            apiKey: process.env.JOTFORM_API_KEY
        });
        this.jotform = jotform
        this.setFormId(formId);
    }

    async getUsage() {
        const usage = await jotform.getUsage();
        return usage;
    }

    safeToRead() {
        if (!this.isReady) throw("Submissions not ready");
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

    sortSubmissionsByDate(submissions: SubmissionType[]) {
        this.submissionCount = submissions.length;
        return submissions.sort((a:SubmissionType, b:SubmissionType) => {
            const aDate = new Date(a.created_at);
            const bDate = new Date(b.created_at);
            return aDate.getTime() - bDate.getTime();
        });        
    }

    async setSubmissions() {
        this.isReady = false;
        const submissions:SubmissionType[] = await this.getSubmissionsFromFormId(this.formId);
        submissions.forEach(element => {
            this.setSubmissionIntoSubmissions(element);
        });
        if (this.submissionCount == this.submissions.length) {
            return true;
        }
        this.submissions = this.sortSubmissionsByDate(submissions);
        this.submissionCount = this.submissions.length;
        this.isReady = true;
    }

    getSubmissions() {
        return this.submissions;
    }

    setFormId(formId: string | number) {
        this.formId = formId;
    }

    async getSubmission(submissionId: string) {
        const submission:SubmissionType = this.getSubmissionIfExists(submissionId) || await this.jotform.getSubmission(submissionId); 
        this.setSubmissionIntoSubmissions(submission);
        return submission;
    }

    async getForm(formId: string | number) {
        const form:FormType = await this.jotform.getForm(formId);
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

    async getSubmissionsFromFormId(formId: string | number) {
        const query = {
            limit: this.limit,
            offset: this.offset,
            orderby: "created_at",
            fullText: "true",
        }
        const submissions:SubmissionType[] = await this.jotform.getFormSubmissions(formId.toString(), query);
        if (submissions.length < this.limit) {
            this.offset = 0;
            return submissions;
        } else {
            this.offset+=this.limit;
            return submissions.concat(await this.getSubmissionsFromFormId(formId));
        }
    }

    getContentByEmail(email: string) {
        const submission = Object.values(this.submissions).find((submission: SubmissionType) => {
            // rep email
            const rep = Object.values(submission.answers).find((answer: any) => answer.name?.toLowerCase().startsWith("rremail")) as answerType;
            // clientemail write also one for client email
            return rep.answer == email;
        });
        if (submission) {
            return submission;
        }
        return null;
    }

    getSubmissionsByEmail(email: string) {
        const submissions = Object.values(this.submissions).filter((submission: SubmissionType) => {
            // rep email
            const rep = Object.values(submission.answers).find((answer: any) => answer.name?.toLowerCase().startsWith("rremail")) as answerType;
            // clientemail write also one for client email
            return rep.answer == email;
        });
        if (submissions) {
            return submissions;
        }
        return null;
    }
}

export default Jotform;