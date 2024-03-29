const start = async () => {
  const ourPromise = await fetch('/.netlify/functions/adminDashboard');
  const ourData = await ourPromise.json();

  if (ourData.success) {
    // do something interesting, show the pet management UI
    console.log(ourData);
    document.querySelector('#render-here').innerHTML = ourData.pets;
  } else {
    // redirecting to login page
    window.location = '/login';
  }
};
start();

function handleDelete(id, el) {
  el.closest('.pet-card').remove();

  fetch('.netlify/functions/deletePet', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id}),
  });
}
