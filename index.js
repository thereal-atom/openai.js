"use strict";
const axios = require('axios');
const base = "https://api.openai.com";
const version = "v1";
module.exports = class OpenAI {
    constructor(apiKey){
        this.apiKey = apiKey;
        this.url = `${base}/${version}/engines/`;
        this.headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
        };
        this.options = {
            "temperature": 0.3,
            "max_tokens": 200,
            "top_p": 1.0,
            "frequency_penalty": 0.0,
            "presence_penalty": 0.0,
        };
    }
    async complete(prompt, stop, endpoint = "davinci/completions"){
        process.stdout.write("Calculating...");
        const { data } = await axios.post(this.url+endpoint, {
            prompt, ...this.options, stop
        },{headers: this.headers});
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        return data.choices[0].text.replace(" ", "");
    }
    async search(documents, query, endpoint = "davinci/search"){
        process.stdout.write("Searching...");
        const { data } = await axios.post(this.url+endpoint, {
            documents, query
        },{headers: this.headers});
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        const index = data.data.sort((a, b) => b.score - a.score)[0].document;
        return documents[index];
    }
    async intruct(instruction, endpoint = "davinci-instruct-beta/completions" ){
        process.stdout.write("Intructing...");
        const { data } = await axios.post(this.url+endpoint, {
            prompt: instruction, ...this.options.temperature = 0.7
        },{headers: this.headers});
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        return data.choices[0].text;
    }
    //Translate
    Translate(languageFrom, languageTo, text){
       return this.complete(`Text in ${languageFrom}: ${text}.\nTranslation to ${languageTo}:`, ['\n']);
    }  
    TranslateCode(languageFrom, languageTo, code) {
        return this.complete(`##### Translate this function from the programming language ${languageFrom} into the programming language ${languageTo}\n### ${languageFrom}\n ${code}\n### ${languageTo}\n`, ["###"]);
    } 
    //Analyse
    Sentiment(text){
        return this.complete(`This is a tweet sentiment classified\n\n\nTweet: \"I loved the new Batman movie!\"\nSentiment: Positive\n###\nTweet: \"I hate it when my phone battery dies.\"\nSentiment: Negative\n###\nTweet: \"My day has been 👍\"\nSentiment: Positive\n###\nTweet: \"This is the link to the article\"\nSentiment: Neutral\n###\nTweet: \"${text}\"\nSentiment:`, ["###"]);
    }
    //Converse
    Ask(question){
        return this.complete(`Q: Who is Batman?\nA: Batman is a fictional comic book character.\n###\nQ: What is torsalplexity?\nA: ?\n###\nQ: What is Devz9?\nA: ?\n###\nQ: Who is George Lucas?\nA: George Lucas is American film director and producer famous for creating Star Wars.\n###\nQ: What is the capital of California?\nA: The capital of California is Sacramento.\n###\nQ: What orbits the Earth?\nA: The Moon orbits the Earth.\n###\nQ: Who is Fred Rickerson?\nA: ?\n###\nQ: What is an atom?\nA: An atom is a tiny particle that makes up everything.\n###\nQ: Who is Alvan Muntz?\nA: ?\n###\nQ: What is Kozar-09?\nA: ?\n###\nQ: How many moons does Mars have?\nA: Mars has Two moons, Phobos and Deimos.\n###\nQ: ${question}\nA:`, ["###"]);
    }
    Chat(text){
        return this.complete(`Human says: ${text}\nAI replies:`, ["\n", " Humans says:", " AI replies:"]);
    }
    Tutor(subject, question){
        return this.complete(`${subject} tutor\n\n\nnYou: What is a language model?\nML Tutor: A language model is a statistical model that describes the probability of a word given the previous words.\nYou: ${question}\n${subject} tutor:`, ["You:"]);
    }
    AutoComplete(text){
        return this.complete(`${text}`, [".", "\""]);
    }
    Search(documents, query){
        return this.search(documents, query);
    }
};
