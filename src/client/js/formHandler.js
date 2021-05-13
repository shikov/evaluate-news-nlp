function handleSubmit(event) {
    event.preventDefault()

    let formURL = document.getElementById('url').value
    let msg = document.getElementById('msg')
    let agreement = document.getElementById('agreement')
    let irony = document.getElementById('irony')
    let subjectivity = document.getElementById('subjectivity')
    let confidence = document.getElementById('confidence')

    agreement.innerHTML = ""
    irony.innerHTML = ""
    subjectivity.innerHTML = ""
    confidence.innerHTML = ""
    
    if(!Client.validateUrl(formURL)) {
        msg.innerHTML = "URL is NOT valid!"
        msg.className = 'error'
        return
    }

    msg.className = "info"
    msg.innerHTML = "Loading..."

    fetch('http://localhost:8081/test', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({url: formURL})
    })
    .then(res => res.json())
    .then(json => {
        console.log(json)
        if(json.status.code !== '0') {throw json.status.msg}
        msg.innerHTML = "Article has been processed!"
        agreement.innerHTML = json.agreement
        irony.innerHTML = json.irony
        subjectivity.innerHTML = json.subjectivity
        confidence.innerHTML = json.confidence
    })
    .catch(err => {
        msg.className = 'error'
        if(err.name === "TypeError" && err.message === "Failed to fetch") {
            msg.innerHTML = "Cannot reach server!"
        }
        else msg.innerHTML = err
    })
}

export { handleSubmit }
