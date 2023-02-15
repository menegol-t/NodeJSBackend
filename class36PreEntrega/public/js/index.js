const chatForm = document.querySelector("#chatForm")
const message = document.querySelector("#textInput")
const msgsTable = document.querySelector("#msContainer")
const socket = io()

const author = new normalizr.schema.Entity("author", {}, {idAttribute: "email"});
const msg = new normalizr.schema.Entity("messages", {author: author}, {idAttribute: "_id"});
const finalSchema = [msg]
const denormalizeData = (data) => {
    const denormalizedData = normalizr.denormalize(data.result, finalSchema, data.entities)
    return denormalizedData
}

function validateEmail(mail) {
    const isRealEmail = /\S+@\S+\.\S+/;
    return isRealEmail.test(mail);
}

chatForm.addEventListener("submit", (e)=> {
    
    e.preventDefault()
    if(message.value.every(valueNotNull)){
        alert(`Escribe algo...`);
    // }else if(!validateEmail(email.value)){
    //     alert("Por favor ingresa un email valido.")
    }else{
        let text =  message.value
        socket.emit("postMsgToDB", text)
    }
    message.value = ""
})

socket.on("fetchMsgsFromDB", (normalizedData) => {

    const denormalized = denormalizeData(normalizedData)
    denormalized.forEach((msg) => {

        const div = document.createElement("div") 
        div.innerHTML = `
          
        <div class="d-flex justify-content-between">
            <p class="small mb-1"> ${msg.author.name} </p>  
            <p class="small mb-1 text-muted"> ${msg.createdAt} </p> 
        </div>	 
        <div class="d-flex flex-row justify-content-start"> 
            <div>
                <p class="small p-2 ms-3 mb-3 rounded-3" style="background-color: #f5f6f7;"> ${msg.text} </p>
            </div>
        </div		
        
        `
        msgsTable.appendChild(div)
    });
})

socket.on("newMsgInDB", (newMsg) => {
    
    const div = document.createElement("div") 
	div.innerHTML = `
	  
	<div class="d-flex justify-content-between">
		<p class="small mb-1"> ${newMsg.author.name} </p>  
		<p class="small mb-1 text-muted"> ${newMsg.createdAt} </p> 
	</div>	 
	<div class="d-flex flex-row justify-content-start"> 
		<div>
			<p class="small p-2 ms-3 mb-3 rounded-3" style="background-color: #f5f6f7;"> ${newMsg.text} </p>
		</div>
	</div		
	
	`
	msgsTable.appendChild(div)
})

const valueNotNull = (value) => {value !== undefined || value !== null || value !== " " }