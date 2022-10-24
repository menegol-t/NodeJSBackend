const button = document.getElementById("button")
const title = document.getElementById("title")
const price = document.getElementById("price")
const thumbnail = document.getElementById("thumbnail")

async function postData(url = "", data = {}){
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-type": "application/.json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
    })
    return response.json()
}

button.addEventListener("click", async () => {
    try{
        const data = {
            title: title.value,
            price: price.value,
            thumbnail: thumbnail.value
        }
        button.reset()
        const url = "localhost:8080/api/products/"
        response = await postData(url, data)
        console.log(response);
    }catch(err){
        console.log(err);
    }
})