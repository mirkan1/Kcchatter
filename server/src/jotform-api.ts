import jotform from "jotform";
// require("dotenv").config();

type JotformResponseType = {
    content: string | [];
    responseCode: number;
    duration: number;
    message: string;
}

class Jotform {
    jotform: any;
    lastSubmissionId: number | string;
    lastFormId: number | string;
    constructor() {
        jotform.options({
            debug: true,
            apiKey: process.env.JOTFORM_API_KEY
        });
        this.jotform = jotform
    }

    getJotform() {
        return this.jotform;
    }

    async getSubmission(submissionId: string) {
        const submission = this.jotform.getSubmission(submissionId);
        this.lastSubmissionId = submissionId;
        return submission;
    }

    async getForm(formId: string | number) {
        const form = await this.jotform.getForm(formId);
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

    async editSubmission(submissionId: string, data: any) {
        try {
            await this.jotform.editSubmission(submissionId, data);
            return true;
        } catch {
            return false;
        }
    }
}

export default Jotform;

// def activate_trigger(submissionID, fieldID, state):
//     query = f'submission[{fieldID}]={state}'
//     url = f"https://api.jotform.com/submission/{submissionID}
//              ?apiKey={random.choice(JOTFORM_API_PURSE)}&{query}"
//     response = requests.request("POST", url)