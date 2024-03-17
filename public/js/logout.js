const logout = document.querySelector('#logout');

logout.addEventListener('click', async () => {
  const ourPromise = await fetch('/.netlify/functions/logout');
  const ourData = await ourPromise.json();
  window.location = '/admin';
});
