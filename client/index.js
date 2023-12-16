var data= {
     chatinit : {
        title: [
            "Hey, Looking for expert interior designers in Dubai 🧐." , "Tired of having terrible Interior designs 🥵. If yes, then look no further." , "Artfirma Interior Design LLC is offering you the best services with affordable rates. 💥💥Book Now to get 20% instant discount 💥💥"
        ],
        options: [
            "I want to book",
            "Not This Time",
            "Unsubscribe this AD"
            
        ]
    },
    i: {
        title: [
            "Thank you for booking 👋", "Find Our Services." 
        ],
        options: [
            "Design + Visuals",
            "Design developers ",
            "Material Selection & Schedule",
            "Supervision",
            "Fitouts"   
        ],
        
    },
    design : {
        title: [
            "How many rooms", "You needed to design." 
        ],
        options: [
            1,
            2,
            3
        ],
    },

    3:{
        title: [
            "What is the design u want ?." 
        ],
        options: [
            "Modern",
            "Classic ",
            "Contemporory"  
        ]
    },
    2:{
        title: [
            "What is the design u want ?." 
        ],
        options: [
            "Modern",
            "Classic ",
            "Contemporory"  
        ]
    },
    1:{
        title: [
            "What is the design u want ?." 
        ],
        options: [
            "Modern",
            "Classic ",
            "Contemporory"  
        ]
    },
    modern:{
        title: [
            
        ],
        options: [
            
        ]
    },
    classic:{
        title: [
           
        ],
        options: [
             
        ]
    },
    contemporory:{
        title: [
            
        ],
        options: [
          
        ]
    }


}

document.getElementById("init").addEventListener("click" , showChatBot);

var cbot = document.getElementById("chat-box")
var len1= data.chatinit.title.length;
var room;
var userInput = {};
var image = "" ;
var loc;
var apiKey;
var secretKey;
function showChatBot(){
    console.log(this.innerText);
    if(this.innerText=='START CHAT'){
        document.getElementById('test').style.display='block';
        document.getElementById('init').innerText='CLOSE CHAT';
         initChat();
    }
    else{
        location.reload();
    }
}

function initChat(){
    j=0;
    cbot.innerHTML='';
    for(var i=0;i<len1;i++){
        setTimeout(handleChat,(i*500));
    }
    setTimeout(function(){
        showOptions(data.chatinit.options)
    },((len1+1)*500))
}
var j=0;
function handleChat(){
    var elm= document.createElement("p");
    elm.innerHTML= data.chatinit.title[j];
    elm.setAttribute("class","msg");
    cbot.appendChild(elm);
    j++;
     handleScroll();
}

function showOptions(options){
    for(var i=0;i<options.length;i++){
        var opt= document.createElement("span");
        var inp= '<div>'+options[i]+'</div>';
        opt.innerHTML=inp;
        opt.setAttribute("class","opt");
         opt.addEventListener("click", handleOpt);
        cbot.appendChild(opt);
         handleScroll();
    }
}

function handleOpt(){
    var str= this.innerText;
    var textArr= str.split(" ");
    var findText= textArr[0];

    document.querySelectorAll(".opt").forEach(el=>{
        el.remove();
    })
    var elm= document.createElement("p");
    elm.setAttribute("class","test");
    var sp= '<span class="rep">'+this.innerText+'</span>';
    elm.innerHTML= sp;
    cbot.appendChild(elm);
    if(findText == "3"){
        room = 3;
        handleDetailInput(findText,"text","detail","Enter the details");
        
    }
    else if(findText == "2"){
        room = 2;
        handleDetailInput(findText ,"text" ,"detail","Enter the details");
    }
    else if(findText == "1"){
        room = 1;
        handleDetailInput(findText,"text" ,"detail","Enter the details");
    }
    else if (findText === "Modern") {
        handleDetailInput(findText, "file", "image", "Choose Image", function() {
            handleDetailInput(findText, "text", "name", "Enter your name", function() {
                handleDetailInput(findText, "number", "phone", "Enter your mobile", function() {
                    handleDetailInput(findText, "email", "email", "Enter your Email", function() {
                       handleDetailInput(findText,"datetime-local","dateAndTime","Choose the date" ,function(){
                        handleLocation("location", function(locationDetails) {                       
                            console.log("Location details:", locationDetails);
                            handlePayment();
                        });
                        
                       });
                    });
                });
            });
        });
    }    
    else{
        var tempObj= data[findText.toLowerCase()];
        handleResults(tempObj.title,tempObj.options); 
    }
       
}

function handleResults(title , options){
    for(let i=0;i<title.length;i++){
        setTimeout(function(){
            handleDelay(title[i]);
        },i*500)
    }
        setTimeout(function(){
            showOptions(options);
        },options.length*500)

        
}

function handleDelay(title){
    var elm= document.createElement("p");
        elm.innerHTML= title;
        elm.setAttribute("class","msg");
        cbot.appendChild(elm);
}

function handleScroll(){
    var elem= document.getElementById('chat-box');
    elem.scrollTop= elem.scrollHeight;
}

function handleDetailInput(findText ,type ,name ,placeholder , callback) {
    var inputElm = document.createElement("input");
    if (type === "file") {
        inputElm.setAttribute("id", "fileInput");
        inputElm.setAttribute("class", "inpt");
        inputElm.setAttribute("type", type);
        inputElm.setAttribute("placeholder", placeholder);
        inputElm.setAttribute("onchange", "postDetails(this.files[0])"); 
    } else {
        inputElm.setAttribute("name", name);
        inputElm.setAttribute("class", "inpt");
        inputElm.setAttribute("type", type);
        inputElm.setAttribute("placeholder", placeholder);
    }

    cbot.appendChild(inputElm);

    var sendButton = document.createElement("button");
    sendButton.innerText = "Send";
    sendButton.setAttribute("class", "send-btn");
    cbot.appendChild(sendButton);
    handleScroll();

    sendButton.addEventListener("click", function() {  
        if (type === "file") {
          var  details = image; 
          userInput[name] = details;
        } else {
            var details = inputElm.value;
            userInput[name] = details;
        }

        document.querySelectorAll(".inpt").forEach(el => {
            el.remove();
        });
        document.querySelectorAll(".send-btn").forEach(el => {
            el.remove();
        });

        var elm = document.createElement("p");
        elm.setAttribute("class", "test");
        var sp = '<span class="rep">' + details + '</span>';
        elm.innerHTML = sp;
        cbot.appendChild(elm);
        if (callback) {
            callback(findText);
        }

        var tempObj = data[findText.toLowerCase()];
        handleResults(tempObj.title, tempObj.options);
        console.log(userInput,"user input");
    });

}

function postDetails(pics){
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "webapp");
        data.append("cloud_name", "dl4xaqrfu");
        fetch("https://api.cloudinary.com/v1_1/dl4xaqrfu/image/upload", {
          method: "post",
          body: data,
        }).then((res) => res.json())
        .then((data) => {
          console.log(data);
          console.log(data.url);
          image=data.url         
        })
        .catch((err) => {
          console.log(err);
        });
    }
}

function handleLocation(name , callback){
    var sendButton = document.createElement("button");
    sendButton.innerText = "Send Location";
    sendButton.setAttribute("class", "send-btn");
    sendButton.setAttribute("id", "get-location");
    cbot.appendChild(sendButton);
    handleScroll();

    let locationButton = document.getElementById("get-location");

    locationButton.addEventListener("click", () => {
    
        if (navigator.geolocation) {
          
          navigator.geolocation.getCurrentPosition(showLocation);
        } 
      });

      const showLocation = async (position) => {
        
        let response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
        );      
        ;
        var loc = await response.json();
        var details = loc.display_name;
            userInput[name] = details;
        document.querySelectorAll(".send-btn").forEach(el => {
            el.remove();
    
            var elm = document.createElement("p");
            elm.setAttribute("class", "test");
            var sp = '<span class="rep">' + loc.display_name + '</span>';
            elm.innerHTML = sp;
            cbot.appendChild(elm);
            
        });
        if (callback) {
            console.log("hi");
            callback(loc.display_name);
        }
      };
      
       
}

async function handlePayment() {
    try {
      var elm = document.createElement("p");
      elm.innerHTML = "Pricing for the visuals is 3000 AED/area";
      elm.setAttribute("class", "msg");
      cbot.appendChild(elm);
      handleScroll();

      
     
        var elem = document.createElement("div");
        elem.setAttribute("id" ,"card-element")
        cbot.appendChild(elem)
        handleScroll();
        
await fetch('http://localhost:3000/get_api_key') 
.then(response => response.json())
.then(data => {
 
    var secretKey = data.secret_key;
    var apiKey = data.api_key;
    console.log(secretKey);
    console.log(apiKey);
    
    var stripe = Stripe(`${apiKey}`);
      var elements = stripe.elements();
      var cardElement = elements.create("card");
      cardElement.mount("#card-element");

      var checkOut = document.createElement("button");
      checkOut.innerText = "Check Out";
      checkOut.setAttribute("class", "send-btn");
      checkOut.setAttribute("id", "checkout");
      cbot.appendChild(checkOut);
      handleScroll();

      fetch("https://api.stripe.com/v1/payment_intents", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${secretKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "amount=3000&currency=aed",
      })
      .then(function(response) {
        return response.json();
      })
      .then(async function(data) {
        var clientSecret = data.client_secret;
        

        document.getElementById("checkout").addEventListener("click", async function() {
          try {
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
              payment_method: {
                card: cardElement,
              },
            });

            if (error) {
              console.error(error);
              alert("1Payment failed. Please try again.");
            } else {
                document.querySelectorAll("#checkout").forEach(el => {
                    el.remove();
                });

              var successElm = document.createElement("p");
              successElm.innerHTML = "Payment successful! Thank you for your purchase.";
              successElm.setAttribute("class", "msg");
              cbot.appendChild(successElm);
              handleScroll();

            
              var last = document.createElement("p");
              last.innerHTML = "Our Represent will contact with you shortly";
              last.setAttribute("class", "msg");
              cbot.appendChild(last);
              handleScroll();


              
              $.ajax({
                url: "http://localhost:3000/send-email",
                data: JSON.stringify(userInput),
                method: "post",
                contentType: "application/json",
                success: function(response) {
                    alert(" submitted successfully");
                },
                error: function(err) {
                    alert("Something Error");
                    
                }
            });

            }
          } catch (error) {
            console.error(error);

            alert("2Payment failed. Please try again.");
          }
        });
      })
      .catch(function(error) {
        console.error(error);
    
        alert("3Payment failed. Please try again.");
      });
})
.catch(error => {
  console.error('Error fetching API key:', error);
});    
    }
     catch (error) {
      console.error(error);
      alert("4Payment failed. Please try again.");
    }
  }
  


