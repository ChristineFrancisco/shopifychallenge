let storageArray = []

//searches local storage and pushes out divs if there is existing data
if(localStorage.getItem('storage')) {
    //might change later to make it more efficient? same variable as below
    storageArray = JSON.parse(localStorage.getItem('storage'))
    loadStorage()
} 

function loadStorage(){
    let existingData = JSON.parse(localStorage.getItem('storage'))
    if(existingData.length > 0) {
        existingData.forEach(x => makeResponse(x))
    }
}

//button functionality
document.querySelector("#button").addEventListener('click', getFetch)

//creates divs with prompts and responses
function makeResponse(text){
    let newDiv = document.createElement("div")
    newDiv.appendChild(document.createTextNode(text)),
        addingTo = document.getElementById("container")
    addingTo.appendChild(newDiv)
}

//uses the fetch API from openai
function getFetch(){
    const apiKey = process.env.APIKEY
    const apiSecret = process.env.REACT_APP_APISecret

    let engine = document.getElementById("engine").value
    let promptFromUser = document.getElementById("prompt").value
    let newResponse

    const data = {
        prompt: promptFromUser,
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
       };

    fetch(`https://api.openai.com/v1/engines/${engine}/completions`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(newData => {
            newResponse = `Prompt: ${promptFromUser} 
            
            Response: ${newData.choices[0].text}`
            makeResponse(newResponse)
            storageArray.push(newResponse)
            localStorage.setItem('storage', JSON.stringify(storageArray))
        })
}