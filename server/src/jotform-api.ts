import jotform from "jotform";
// require("dotenv").config();

class Jotform extends jotform.Jotform {
    jotform: jotform.Jotform;
    constructor() {
        super();
        jotform.options({
            debug: true,
            apiKey: process.env.JOTFORM_API_KEY
        });
        this.jotform = jotform
    }

    getJotform() {
        return this.jotform;
    }
}

export default Jotform;