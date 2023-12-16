
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors")
const nodemailer = require('nodemailer')
const Mailgen = require('mailgen');
const dotenv = require('dotenv')
dotenv.config();


// Parse JSON data in the request body
app.use(cors());
app.use(bodyParser.json());



app.get("/get_api_key", (req, res) => {
    console.log("call banne");
   const secret_key = process.env.secret_key;
   const api_key =process.env.api_key
    const secretKey = `${secret_key}`;
    const apiKey = `${api_key}`;  
    const data = {
      secret_key: secretKey,
      api_key: apiKey,
    };
    res.json(data);
  });
app.post("/send-email", async(req, res) => {
  const userInput = req.body;
  const userName = process.env.username;
  const password = process.env.password
  console.log(userName,password);
  console.log(userInput ,"usrInpt");
  
  let config = {
    service:'gmail',
    auth:{
        user:`${userName}374@gmail.com`,
        pass:`${password}`
    }
  }
  let transporter = nodemailer.createTransport(config)

  let MailGenerator = new Mailgen({
    theme: "default",
    product : {
        name: "Mailgen",
        link : 'https://mailgen.js/'
    }
})

var email = {
    body: {
        table: {
            data: [
                {
                    detail: userInput.detail,
                    image: userInput.image,
                    name: userInput.name,
                    phone: userInput.phone,
                    email: userInput.email,
                    dateAndTime: userInput.dateAndTime,
                    location: userInput.location
                }   
            ],
            columns: {
                
                customWidth: {
                    item: '20%',
                    price: '15%'
                },
                
                customAlignment: {
                    location: 'right'
                }
            }
        }
    }
};

let mail = MailGenerator.generate(email)

let message = {
    from : "rejin374@gmail.com",
    to : "sasisir374@gmail.com",
    subject: "Place Order",
    html: mail
}

transporter.sendMail(message).then(() => {
    console.log("entered");
    return res.status(201).json({
        msg: "you should receive an email"
    })
}).catch(error => {
    return res.status(500).json({ error })
})
});


const port = 3000; 
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
