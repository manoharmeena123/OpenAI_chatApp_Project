const express = require('express');
const cors = require("cors")
const dotenv = require("dotenv");
dotenv.config()
const app = express();
app.use(cors({
    origin:"*"
}))
app.use(express.json());
const {Configuration, OpenAIApi} =  require('openai')


//Confige===================================================================>
const configuration = new Configuration({
    apiKey:process.env.OPENAI_API_KEY,

})
// console.log(process.env.OPENAI_API_KEY)   

const openai =  new OpenAIApi(configuration);


//get===================================================================>
app.get("/",async(req,res)=>{
    res.status(200).send("Hello world")
})



//Post===================================================================>
app.post("/",async(req,res)=>{
     
    try {
       const prompt = req.body.prompt
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
           
          });
          res.status(200).send({
            bot:response.data.choices[0].text
          })
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
        console.log("error in config")
    }
})



//server==============================================================>
app.listen(8000,()=>{
    console.log("Server on 8000 http://localhost:8000")
})