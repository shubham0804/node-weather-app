console.log("Client side javascript served from the static folder");

fetch('http://localhost:3000/weather?city=kolkata&code=I').then((response) => {
    response.json().then((data)=> {
        // if(data.error) {
        //     console.log(error)
        // };
        console.log(data)
    })
})