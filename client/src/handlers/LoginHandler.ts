import axios from 'axios';

export default class LoginHandler {
    config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        timeput: 1000
    }
    async login(email: string) {
        const response = await axios.get(
            'http://localhost:5555/api/user?email=' + email,
            this.config
        );
        console.log(response)
        return response.data;
    }

    async getTotalSubmissions(formId: string | number) {
        const response = await axios.get(
            'http://localhost:5555/api/getForm?formId=' + formId,
            this.config
        );
        console.log(response)
        return response.data.count;
    }
}