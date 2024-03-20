const url = window.location.search;
console.log(url);
const id = new URLSearchParams(url).get('id');
console.log(id);

// fetching the pet data for editing, based on the id passed in the url
async function getEditPet() {
  const ourPromise = await fetch('/.netlify/functions/getSingularPet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id}),
  });
  const pet = await ourPromise.json();
  console.log(pet);

  if (!pet.name) {
    window.location = '/admin';
  }

  document.querySelector('#name').value = pet.name;
  document.querySelector('#birthYear').value = pet.birthYear;
  document.querySelector('#species').value = pet.species;
  document.querySelector('#description').value = pet.description;

  document.querySelector('#edit-pet-form').classList.remove('form-is-loading');
  document.querySelector('#name').focus();
}

getEditPet();

// submitting the form with edited pet data
document.querySelector('#edit-pet-form').addEventListener('submit', async e => {
  e.preventDefault();

  const pet = {
    id,
    name: document.querySelector('#name').value,
    birthYear: document.querySelector('#birthYear').value,
    species: document.querySelector('#species').value,
    description: document.querySelector('#description').value,
  };

  document.querySelector('#edit-pet-form').classList.add('form-is-loading');

  const ourPromise = await fetch('/.netlify/functions/saveChanges', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pet),
  });

  const theResponse = await ourPromise.json();
  console.log(theResponse);
  if (theResponse.success) {
    window.location = '/admin';
  }
});
