
console.log("You are in the maint file")

const carArray = [];

const Car = function(inv, year, make, model, vin) {
    this.inv = inv,
    this.year = year,
    this.make = make,
    this.model = model,
    this.vin = vin,
    this.startMileage = 0,
    this.curMileage = 0,
    this.oilMiles = 0,
    this.tagExpires = new Date('June 30, 2022');
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
            <td><button class="edit ${this.id}">Edit</button></td>
            
        </tr>
    </table>
    
    `;
    const results = document.querySelector(".results");
    results.innerHTML = html;
}

Car.prototype.oilChange = function(){
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
        </tr>
    </table>
    `
    const results = document.querySelector(".results");
    results.innerHTML = html;
}


function carAdder(inv, year, make, model, vin, mileage, oilmiles){
   const car = new Car(inv, year, make, model, vin, mileage, oilmiles)
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
    const infoDiv = document.querySelector(".info-search");
    infoDiv.classList.toggle('hidden');
    const results = document.querySelector(".results");
    results.innerHTML = '';
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
    selection.oilChange();
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

const maintSearchButton = document.querySelector('.search-submit');
const infoSearchButton = document.querySelector('.info-search-submit');


const maintDisplayButton = document.querySelector('.maint');
const infoDisplayButton = document.querySelector('.info');


maintDisplayButton.addEventListener('click', toggleMaintDiv);
infoDisplayButton.addEventListener('click', toggleInfoDiv);
maintSearchButton.addEventListener('click', handleMaintSearchClick);
infoSearchButton.addEventListener('click', handleInfoSearchClick);



carAdder("A01", 2013, "Chevrolet", "Impala", 'Z123T5A7891230567');
carAdder("A02", 2011, "Ford", "Focus", '5Q78123W567896041');

const selection = carArray.find(car => car.year === 2013);
selection.oilMiles = 123456;
selection.curMileage = 127890

