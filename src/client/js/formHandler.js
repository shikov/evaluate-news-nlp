function handleSubmit(event) {
    event.preventDefault()

    let formText = document.getElementById('input').value
    let formURL = document.getElementById('url').value

    console.log("::: Form Submitted :::")

    if(formText === "" && !Client.validateUrl(formURL)) {
        alert("URL is not valid!")
        return
    }

    fetch('http://localhost:8081/test', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({input: formText, url: formURL})
    })
    .then(res => res.json())
    .then(json => {
        console.log(json)
        // document.getElementById('results').innerHTML = JSON.stringify(json)
    })
}

export { handleSubmit }
