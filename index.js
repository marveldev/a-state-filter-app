const input = document.querySelector('.input');

input.addEventListener('keyup', () => {
  let inputValue = input.value;

  fetch('./index.json').then( (response) => {
    return response.json();
  })
  .then((datas) => {
    let matches = datas.filter(data => {
      let regex = new RegExp(`^${inputValue}`, 'gi');
      return data.name.match(regex) || data.abbr.match(regex)
    });

    if (inputValue.length == 0) {
      matches = [];
      stateOutput.innerHTML = '';
    }
    displaySearch(matches);
  });
})

function displaySearch(matches) {
  matches.forEach(match => {
  let output = `
    <div>
      <h4>${match.name}</h4>
      <span>capital: ${match.capital}</span><br>
      <small>latitude: ${match.lat}</small>
      <small>longitude: ${match.long}</small>
      </div>
  `
  const stateOutput = document.querySelector('.states-output').innerHTML += output;
  });
}
