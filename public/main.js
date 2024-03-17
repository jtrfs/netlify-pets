const weatherUrl = 'https://api.weather.gov/gridpoints/MFL/110,50/forecast';
const petsUrl = '/.netlify/functions/pets';
const temp = document.querySelector('.temp');

const template = document.querySelector('#pet-card-template');
const wrapper = document.createDocumentFragment();
const listOfPets = document.querySelector('.list-of-pets');

// fetching the data from the weather api
async function start() {
  const weatherDataPromise = await fetch(weatherUrl);
  const weatherData = await weatherDataPromise.json();
  // console.log('weather data from start():', weatherData);
  const tempNow = weatherData.properties.periods[0].temperature;
  temp.textContent = tempNow + '\u00B0F';
}
start();

// fetching the data for pets area
const petsArea = async function () {
  const petsPromise = await fetch(petsUrl);
  const petsData = await petsPromise.json();
  console.log('pets data from petsArea():', petsData);
  petsData.forEach(({name, species, birthYear, description, photo}) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('.pet-card').dataset.species = species;
    clone.querySelector('.pet-name').textContent = name;
    clone.querySelector('.pet-description').textContent = description;
    clone.querySelector('.pet-age').textContent = calculateAge(birthYear);
    if (!photo) photo = species === 'dog' ? 'images/fallback-dog.jpg' : 'images/fallback-cat.jpg';
    clone.querySelector('.pet-card-photo img').src = photo;
    clone.querySelector('.pet-card-photo img').alt = `This is a ${species} named ${name}`;
    console.log(photo);

    wrapper.appendChild(clone);
  });
  listOfPets.appendChild(wrapper);
};
petsArea();

// calculate age for 3 scenarios: 1. less then a year, 2. one year, 3. more than a year
function calculateAge(birthYear) {
  const age = new Date().getFullYear() - birthYear;
  if (age < 1) return 'Less than a year old';
  else if (age === 1) return `${age} year old`;
  return `${age} years old`;
}

// pet filter buttons code
const petButtons = document.querySelectorAll('.pet-filter button');
petButtons.forEach(btn => {
  btn.addEventListener('click', handleButtonClick);
});

function handleButtonClick(e) {
  // remove active class from any and all buttons
  petButtons.forEach(btn => btn.classList.remove('active'));
  // add active class to the specific button that just got clicked
  e.target.classList.add('active');
  // actually filter the pets down below
  const currentFilter = e.target.dataset.filter;
  const petCardsAll = document.querySelectorAll('.pet-card');
  petCardsAll.forEach(card => {
    if (currentFilter === card.dataset.species || currentFilter === 'all') {
      card.style.display = 'grid';
    } else {
      card.style.display = 'none';
    }
  });
}
