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
	socket.emit("postProd", newProd) : console.log("Completa todos los datos")
	
	title.value = ""
	price.value = ""
	thumbnail.value = ""

	console.log(newProd);
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
	socket.emit("postchat", newChat) : console.log("Completa todos los datos")
	
	email.value = ""
	message.value = ""

	console.log(newChat);
})

socket.on("addToProdList", (data) => {
	console.log(data);
	const div = document.createElement("div") 
	div.innerHTML = `
	<tr> 
		<td class="align-middle"> ${data.id} </td>
		<td class="align-middle"> ${data.title} </td>
		<td class="align-middle"> ${data.price} </td>
		<td class="align-middle"> <img src="${data.thumbnail}" alt="${data.title}" class="img-fluid rounded-3" width="30%", height="30%"> </td>
	</tr>
	`
	prodList.appendChild(div)
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




