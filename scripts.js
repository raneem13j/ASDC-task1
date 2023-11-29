const app = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(container)

var request = new XMLHttpRequest()

request.open('GET', 'http://localhost:5000/excel', true)
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    data.data.forEach((row) => {
      const card = document.createElement('div')
      card.setAttribute('class', 'card')

      const h1 = document.createElement('h1')
      h1.textContent = row.name

      const pD = document.createElement('p')
      row.description = row.description.substring(0, 300)
      pD.textContent = `${row.description}...`
      
      const pL = document.createElement('p')
      row.location = row.location.substring(0, 300)
      pL.textContent = `${row.location}...`

      const pP = document.createElement('p')
      row.price = row.price.substring(0, 100)
      pP.textContent = `${row.price}...`

      const pC = document.createElement('p')
      row.color = row.color.substring(0, 100)
      pC.textContent = `${row.color}...`


      container.appendChild(card)
      card.appendChild(h1)
      card.appendChild(pD)
      card.appendChild(pL)
      card.appendChild(pP)
      card.appendChild(pC)
    })
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
  }
}

request.send()

function triggerFileInput() {
  document.getElementById('file').click();
}

function displayFileName() {
  const fileName = document.getElementById('file').value.split('\\').pop();
  // Display the file name or any other desired action
  console.log('Selected file:', fileName);
}


const postExcel = document.getElementById('btn')

function submitExcel () {
  var form = document.getElementById('uploadForm');
  var formData = new FormData(form);

  var request = new XMLHttpRequest()

  request.open('POST', 'http://localhost:5000/excel', true)

  request.onload = function () {
    if (request.readyState == 4 && request.status == 200) {
      console.log(JSON.parse(request.responseText));
    } else {
      console.log(`Error: ${request.status}`);
    }
  };

  request.send(formData);
}