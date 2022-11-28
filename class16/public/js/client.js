const prodForm = document.querySelector("#formProd")
const title = document.querySelector("#title")
const price = document.querySelector("#price")
const thumbnail = document.querySelector("#thumbnail")
const prodList = document.querySelector("#tbody")

const chatForm = document.querySelector("#chatForm")
const email = document.querySelector("#emailInput")
const message = document.querySelector("#textInput")
const msgList = document.querySelector("#msContainer")

const socket = io()

prodForm.addEventListener("submit", (e) => {
	e.preventDefault()

	let newProd = {
		title: title.value,
		price: price.value,
		thumbnail: thumbnail.value
	}
	
	checkParams(title.value, price.value, thumbnail.value) ? 
	socket.emit("postProduct", newProd) : console.log("Completa todos los datos")
	
	title.value = ""
	price.value = ""
	thumbnail.value = ""

})

chatForm.addEventListener("submit", (e) => {
	e.preventDefault()

	let newChat = {
		email: email.value,
		message: message.value,
		time: new Date().getHours() + ":" + new Date().getMinutes()
	}
	
	console.log(newChat);
	
	checkParam(email.value, message.value) ? 
	socket.emit("postMsgToChat", newChat) : console.log("Completa todos los datos")
	
	email.value = ""
	message.value = ""
})

socket.on("addToProdList", (data) => {
	const tr = document.createElement("tr") 
	tr.innerHTML = `
	 
		<td class="align-middle"> ${data.id} </td>
		<td class="align-middle"> ${data.title} </td>
		<td class="align-middle"> ${data.price} </td>
		<td class="align-middle"> <img src="${data.thumbnail}" alt="${data.title}" class="img-fluid rounded-3" width="30%", height="30%"> </td>
	
	`
	prodList.appendChild(tr)
})

socket.on("addToChatList", (data) => {
	const div = document.createElement("div") 
	div.innerHTML = `
	  
	<div class="d-flex justify-content-between">
		<p class="small mb-1"> ${data.email} </p>  
		<p class="small mb-1 text-muted"> ${data.time} </p> 
	</div>	 
	<div class="d-flex flex-row justify-content-start"> 
		<div>
			<p class="small p-2 ms-3 mb-3 rounded-3" style="background-color: #f5f6f7;"> ${data.message} </p>
		</div>
	</div		
	
	`
	msgList.appendChild(div)
})

function checkParam(x, y){
	if(x == undefined || typeof(x) != "string" || x =="" || y == undefined || typeof(y) != "string" || y ==""  ){
		return false
	}else{
		return true
	}
}

function checkParams(x, y, z){
	if(x == undefined || typeof(x) != "string" || x =="" || y == undefined || typeof(y) != "string" || y =="" || z == undefined || typeof(z) != "string" || z =="" ){
		return false
	}else{
		return true
	}
}




