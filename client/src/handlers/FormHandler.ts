import axios from 'axios';

export default class FormHandler {
    archived: string | undefined;
    count: string | undefined;
    created_at: string | undefined;
    favorite: string | undefined;
    height: string | undefined;
    id: string | undefined;
    last_submission: string | undefined;
    new: string | undefined;
    status: string | undefined;
    title: string | undefined;
    type: string | undefined;
    updated_at: string | undefined;
    url: string | undefined;
    username: string | undefined;

    constructor(formId: string | number) {
        this.getForm(formId);
    }

    async getForm(formId: string | number) {
        const response = await axios.get('http://localhost:5555/api/getForm?formId=' + formId);
        this.archived = response.data.archived;
        this.count = response.data.count;
        this.created_at = response.data.created_at;
        this.favorite = response.data.favorite;
        this.height = response.data.height;
        this.id = response.data.id;
        this.last_submission = response.data.last_submission;
        this.new = response.data.new;
        this.status = response.data.status;
        this.title = response.data.title;
        this.type = response.data.type;
        this.updated_at = response.data.updated_at;
        this.url = response.data.url;
        this.username = response.data.username;
    }

    async getTotalSubmissions(formId: string | number) {
        const response = await axios.get('http://localhost:5555/api/getForm?formId=' + formId);
        return response.data.count;
    }
}