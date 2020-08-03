const input = document.querySelector('.input');
const stateOutput = document.querySelector('.states-output');

input.addEventListener('keyup', () => {
  let inputValue = input.value;
  stateOutput.innerHTML = '';

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
      <div class="state-content">
        <h3 class="state-name">${match.name}</h3>
        <span class="state-capital">capital: ${match.capital}</span><br>
        <small>latitude: ${match.lat}</small>
        <small>longitude: ${match.long}</small>
      </div>
    `
    stateOutput.innerHTML += output;
  });
}
