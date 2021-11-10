interface ApiHeaders {
    temperature: Float32Array;
    max_tokens: number;
    top_p: Float32Array;
    frequecy: Float32Array;
}

export default class OpenAI{

    apiKey: string;
    base: string;

    constructor(apiKey){
        this.apiKey = apiKey;
        this.base = "https://api.openai.com/v1/";
        this.headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        };
        this.options = {
            "temperature": 0.3,
            "max_tokens": 200,
            "top_p": 1.0,
            "frequency_penalty": 0.0,
            "presence_penalty": 0.0,
        };
    }
}