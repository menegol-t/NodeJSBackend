const qsData = Qs.parse(location.search, {
	ignoreQueryPrefix: true,
});

const msg = timestamp(qsData)

console.log(msg);

const socket = io()

if(msg.email){
	checkParam(msg.email, msg.message) ? socket.emit("postchat", msg) : console.log("Completa todos los datos")
}else if(qsData.title){
	checkParams(qsData.title, qsData.price, qsData.thumbnail) ? socket.emit("postprod", qsData) : console.log("Completa todos los datos");
}

function timestamp(data){
	data.time = new Date().getHours() + ":" + new Date().getMinutes()
	return data
}

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




