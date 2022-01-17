function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let titleSearchText = document.getElementById('titlesearch').value;

    //Clear the results and validation message
    document.getElementById('results').innerHTML = "";
    document.getElementById('inputErrorMsg').innerHTML = "";

    Client.checkForName(titleSearchText);

    if (titleSearchText == "") {
        document.getElementById('inputErrorMsg').innerHTML = "Invalid or Empty input";
        return false;
    }

    console.log("::: Form Submitted :::")

    fetch('http://localhost:8081/aylienNewsApiCall', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url:titleSearchText })
        })
    .then(res => res.json())
    .then(function(res) {

        let storyArray = res.stories;
        for (let i in storyArray) {
            document.getElementById('results').innerHTML += "(" + i + ") " + storyArray[i].title + "<br/>";
        }
    })
}

export { handleSubmit }
