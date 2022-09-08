let UserName = document.querySelector(".field");
let searchButton = document.querySelector("button");
let resultContainer = document.querySelector(".result");


let myRequest = new XMLHttpRequest();

searchButton.addEventListener("click", ()=>{
    if(UserName.value.split(" ").length === 1) {
        myRequest.open("GET",`https://api.genderize.io/?name=${UserName.value}`);
        myRequest.send();
    } else {
        resultContainer.innerHTML = "Not Valid! Try Another Value, Example:Ahmed";
    }
    UserName.value === "" ? resultContainer.innerHTML = "Enter a Name To Determine The Gender!":"";
    UserName.value = "";
});

myRequest.onreadystatechange = function () {
    if(this.readyState === 4 && this.status === 200) {
        let myObj = JSON.parse(myRequest.responseText);

        let nameValue = document.createElement("span");
        nameValue.innerHTML = `Name : ${fixName(myObj.name)}`;

        let genderValue = document.createElement("span");
        if (myObj.gender === "male") {

            genderValue.innerHTML = `Gender : ${myObj.gender}`;
            let genderSymbol = document.createElement("i");
            genderSymbol.classList.add("fa-solid","fa-mars","male");
            genderValue.append(genderSymbol);

        } else {

            genderValue.innerHTML = `Gender : ${myObj.gender}`;
            let genderSymbol = document.createElement("i");
            genderSymbol.classList.add("fa-solid","fa-venus","female");
            genderValue.append(genderSymbol);
        }
        
        let probabilityValue = document.createElement("span");
        probabilityValue.innerHTML = `Probability : ${myObj.probability}`;
        
        resultContainer.innerHTML = "";
        resultContainer.appendChild(nameValue);
        resultContainer.appendChild(genderValue);
        resultContainer.appendChild(probabilityValue);

    }
}

function fixName(name) {
let fixFirstLetter = name.charAt().toUpperCase();
return fixFirstLetter + name.slice(1);
}
