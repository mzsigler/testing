const carArray = [
  {
    inv: 'a01',
    year: 2013,
    make: "chevrolet",
    model: "impala",
    miles: 123456,
    vin: 5390,
    lastOilChange: 110000,
    nextOilChange: 115000,
  },

  {
    inv: 'a02',
    year: 2011,
    make: "chevrolet",
    model: "impala",
    miles: 98322,
    vin: 8631,
    lastOilChange: 98000,
    nextOilChange: 103000,
  },

  {
    inv: 'a03',
    year: 2010,
    make: "hyundai",
    model: "accent",
    miles: 101248,
    vin: 4149,
    lastOilChange: 95000,
    nextOilChange: 100000,
  },

  {
    inv: 'a04',
    year: 2010,
    make: "nissan",
    model: "altima",
    miles: 147888,
    vin: 9352,
    lastOilChange: 145000,
    nextOilChange: 150000,
  },
];

const CarFactory = (inv, year, make, model, vin, miles, lastOilChange, nextOilChange) => {
  const info = () => console.log(`${inv} ${year} ${make} ${model} ${vin} ${miles}`);
  // const oilInfo = () => return `
  
  // `
  return { inv, year, make, model, vin, miles, lastOilChange, nextOilChange, info };
};





function findByProp(prop, value) {
  return function(car) {
    return car[prop] === value;
  };
}


// function generateCards(car) {
//   const displayCarsDiv = document.querySelector('.display-cars');
//   const card = document.createElement('div');
//   card.classList.add('carCard');
//   card.innerHTML = `
//   <p>Number: ${car.inv}</p>
//   <p> Year: ${car.year}</p>
//   <p> Make: ${car.make}</p>
//   <p> Model: ${car.model}</p>
//   <p> Current Miles: ${car.miles}</p>
//   <p> Service Due: ${car.nextOilChange}</p>
//   <button id="${car.inv}" class="update">Update</button>
//   `;
//   displayCarsDiv.appendChild(card);
// };

CarFactory.prototype.oilTable = function() {
  return `
  
  `
}


function showInventory() {
  carArray.forEach(car => generateCards(car));
}

function showService() {
  const needsOilChange = carArray.filter(car => car.miles > car.nextOilChange);
  needsOilChange.forEach(car => generateCards(car));
}


const serviceButton = document.querySelector('.show-service');

serviceButton.addEventListener('click', function(){
  const allCards = document.querySelectorAll('.carCard');
  allCards.forEach(card => card.remove());
  showService();

});

const showTableButton = document.querySelector('.show-table');
const hideTableButton = document.querySelector('.hide-table');

showTableButton.addEventListener('click', function() {
  const oilTable = document.querySelector('.oilTable');
  oilTable.classList.remove('hidden');
});

hideTableButton.addEventListener('click', function() {
  const oilTable = document.querySelector('.oilTable');
  oilTable.classList.add('hidden');
});




const inventoryButton = document.querySelector('.show-inventory');
inventoryButton.addEventListener('click', function(){
  const allCards = document.querySelectorAll('.carCard');
  allCards.forEach(card => card.remove());
  showInventory();

});

const addCarButton = document.querySelector('.car-adder-submit');

addCarButton.addEventListener('click', function(e){
  e.preventDefault();
  const formInv = e.currentTarget.form.inv.value.toLowerCase();
  const formYear = parseInt(e.currentTarget.form.year.value);
  const formMake = e.currentTarget.form.make.value.toLowerCase();
  const formModel = e.currentTarget.form.model.value.toLowerCase();
  const formVin = parseInt(e.currentTarget.form.vin.value);
  const formMiles = parseInt(e.currentTarget.form.miles.value);
  const formLastOilChange = 0;
  const formNextOilChange = 0;

  

  let newCar = CarFactory(formInv, formYear, formMake, formModel, formVin, formMiles, formLastOilChange, formNextOilChange);

  carArray.push(newCar);
  showInventory();

  const form = document.querySelector('.car-adder');
  form.reset();

});

