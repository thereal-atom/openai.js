# openai.js
Simplified openAI API wrapper for JavaScript

# Installation
```js
npm install openai.js
yarn add openai.js
```
# Usage
### Initialize
```js
const OpenAI = require("openai.js");
const ai = new OpenAI("API_KEY");
```
### Chat
Open ended conversation with the AI.
```js
//Will respond to "Hi how are you"
const response = await ai.Chat("Hi how are you?");
//returns I am fine. How are you?
```
### Sentiment Analysis
Categorize text based on sentiment.
```js
//Categorizes the text "I hate you" into Positive, Negative, Neutral or Mixed sentiment.
const sentiment = await ai.Sentiment("I hate you.");
//returns Negative
```
### Ask
Answers the question you ask.
```js
//Answers the question "Who was the 45th president of the united states?"
const answer = await ai.Ask("Who was the 45th president of the united states?");
//returns Donald Trump was the 45th president of the united states.
```
### Translate
Translates text from one language to another
```js
//Translates the text "I dont speak french" from english to french.
const translation = await ai.Translate("English", "French", "I dont speak french.");
//returns Je ne parle pas français.
```
### Translate Code
Translates code from one programming language to another
```js
//Translates the code "print("Hello World!")" from python to JavaScript
const code = await ai.TranslateCode("python", "javascript", "print("Hello World!")")
//return console.log("Hello World!")
```
### Tutor
Answers questions on the subject given
```js
//Answers "How do i calculate the are of a circle?" based on the subject "Math"
const answer = await ai.Tutor("Math", "How do i calculate the are of a circle?");
returns You can use the formula: A = pi * r^2
```
### AutoComplete
Finishes a sentence
```js
//Finished the sentence "An apple a day"
const complete = await ai.AutoComplete("An apple a day");
//return keeps the doctor away
```
### Semantic Search
Scores array of documents based on relevance to query
```js
//Find the most relevant document in the array ["White House", "hospital", "school"] based on the query "teacher"
const searchResult = await ai.Search(["White House", "hospital", "school"], "teacher"));
//return school
```
