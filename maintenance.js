
console.log("You are in the maint file")

const carArray = [];

const Car = function(inv, year, make, model, vin, startMileage, tagExpires) {
    this.inv = inv,
    this.year = year,
    this.make = make,
    this.model = model,
    this.vin = vin,
    this.startMileage = 0,
    this.curMileage = this.startMileage,
    this.oilMiles = this.startMileage,
    this.tagExpires = new Date(tagExpires);
    this.id = Math.floor(Math.random() * 16777215).toString(16);
    this.dateAdded = new Date().toDateString();
};

Car.prototype.displayTag = function(){
    return `${this.tagExpires.getMonth() + 1} / ${this.tagExpires.getFullYear()}`;
}

Car.prototype.info = function() {
    let html = `
    <table>
        <tr>
            <th> Inv </th>
            <th> Year </th>
            <th> Make </th>
            <th> Model </th>
            <th> VIN </th>
            <th> Date Added </th>
            <th> Tag Exp </th>
        </tr>

        <tr>
            <td> ${this.inv} </td>
            <td> ${this.year} </td>
            <td> ${this.make} </td>
            <td> ${this.model} </td>
            <td> ${this.vin} </td>
            <td> ${this.dateAdded} </td>
            <td> ${this.displayTag()} </td>
            <td><button class="edit-info ${this.id}">Edit</button></td>
            
        </tr>
    </table>
    
    `;
    const results = document.querySelector(".results");
    results.innerHTML = html;
}

Car.prototype.oilInfo = function(){
    let html = `
    <table>
        <tr>
            <th> Inv </th>
            <th> Make </th>
            <th> Model </th>
            <th> Last Service </th>
            <th> Current Miles </th>
        </tr>

        <tr>
            <td> ${this.inv} </td>
            <td> ${this.make} </td>
            <td> ${this.model} </td>
            <td> ${this.oilMiles} </td>
            <td> ${this.curMileage} </td>
            <td><button class="edit-oil ${this.id}">Edit</button></td>
        </tr>
    </table>
    `
    const results = document.querySelector(".results");
    results.innerHTML = html;
}


function carAdder(inv, year, make, model, vin, startMileage, tagExpires){
   const car = new Car(inv, year, make, model, vin, startMileage, tagExpires)
   carArray.push(car);
}

function toggleInfoDiv() {
    const maintDiv = document.querySelector(".maint-search");
    maintDiv.classList.toggle('hidden');
    const results = document.querySelector(".results");
    results.innerHTML = '';
}

function toggleMaintDiv() {
    const infoDiv = document.querySelector(".info-search");
    if(!infoDiv.classList.contains("hidden")) {
        infoDiv.classList.toggle("hidden");
    }

    const addCarDiv = document.querySelector('.add-car-div');
    if(!addCarDiv.classList.contains("hidden")) {
        addCarDiv.classList.toggle("hidden");
    }

    const maintDiv = document.querySelector(".maint-search");
    maintDiv.classList.toggle('hidden');
    const results = document.querySelector(".results");
    results.innerHTML = '';
}

function toggleInfoDiv() {
    const maintDiv = document.querySelector(".maint-search");
    if(!maintDiv.classList.contains("hidden")) {
        maintDiv.classList.toggle("hidden");
    }

    const addCarDiv = document.querySelector('.add-car-div');
    if(!addCarDiv.classList.contains("hidden")) {
        addCarDiv.classList.toggle("hidden");
    }

    const infoDiv = document.querySelector(".info-search");
    infoDiv.classList.toggle('hidden');
    const results = document.querySelector(".results");
    results.innerHTML = '';
}

function toggleAddCarDiv() {
    const results = document.querySelector(".results");
    results.innerHTML = '';
    const maintDiv = document.querySelector(".maint-search");
    if(!maintDiv.classList.contains("hidden")) {
        maintDiv.classList.toggle("hidden");
    }

    const infoDiv = document.querySelector(".info-search");
    if(!infoDiv.classList.contains("hidden")) {
        infoDiv.classList.toggle("hidden");
    }

    const addCarDiv = document.querySelector('.add-car-div');
    addCarDiv.classList.toggle('hidden')
}

function maintSearchCars(inv) {
    const found = carArray.find(car => car.inv === inv);
    return found;
};

function infoSearchCars(inv){
    const found = carArray.find(car => car.inv === inv);
    return found;
}

function handleMaintSearchClick(e){
    e.preventDefault();
    const input = document.getElementById("inv-search").value;
    const upper = input.toUpperCase();

    const selection = maintSearchCars(upper);
    if(!selection) {
        alert("Not found!")
        document.getElementById("inv-search").value = ""
    } else {
    selection.oilInfo();
    document.getElementById("inv-search").value = ""
    }

}

function handleInfoSearchClick(e){
    e.preventDefault();
    const input = document.getElementById("info-search").value;
    const upper = input.toUpperCase();

    const selection = maintSearchCars(upper);
    if(!selection) {
        alert("Not found!")
        document.getElementById("info-search").value = ""
    } else {
    selection.info();
    document.getElementById("info-search").value = ""
    }
}

function handleSubmitNewCarClick(e) {
    e.preventDefault();
    const form = document.getElementById('add-car-form');
    const formData = new FormData(form);
    const dataFromForm = [...formData.values()];

    const inv = dataFromForm[0];
    const year = parseInt(dataFromForm[1]);
    const make = dataFromForm[2];
    const model = dataFromForm[3];
    const vin = dataFromForm[4];
    const startMileage = dataFromForm[5];
    const tagExpires = dataFromForm[6];

    carAdder(inv, year, make, model, vin, startMileage, tagExpires);
    console.log(carArray);
    form.reset();

    
}

const maintSearchButton = document.querySelector('.search-submit');
const infoSearchButton = document.querySelector('.info-search-submit');
const addCarButton = document.querySelector('.add-car');
const submitNewCarButton = document.querySelector('.submit-new-car');


const maintDisplayButton = document.querySelector('.maint');
const infoDisplayButton = document.querySelector('.info');


maintDisplayButton.addEventListener('click', toggleMaintDiv);
infoDisplayButton.addEventListener('click', toggleInfoDiv);
addCarButton.addEventListener('click', toggleAddCarDiv);
maintSearchButton.addEventListener('click', handleMaintSearchClick);
infoSearchButton.addEventListener('click', handleInfoSearchClick);
submitNewCarButton.addEventListener('click', handleSubmitNewCarClick);


const today = new Date();

carAdder("A01", 2013, "Chevrolet", "Impala", 'Z123T5A7891230567', 123456, today);
carAdder("A02", 2011, "Ford", "Focus", '5Q78123W567896041', 123456, today);

const selection = carArray.find(car => car.year === 2013);
selection.oilMiles = 123456;
selection.curMileage = 127890;

