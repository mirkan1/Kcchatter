import axios from 'axios';

export default class LoginHandler {
    static async login(email: string) {
        const response = await axios.get('http://localhost:5555/api/user?email=' + email);
        console.log(response)
        return response.data;
    }

    static async getTotalSubmissions(formId: string | number) {
        const response = await axios.get('http://localhost:5555/api/getForm?formId=' + formId);
        console.log(response)
        return response.data.count;
    }
}