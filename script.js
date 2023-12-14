fetch('https://polar-chartreuse-silverfish.glitch.me/')
  .then(response => response.json())
  .then(data => {
    createTable(data)
    createSearchAndCheckboxContainer()
  })
  .catch(error => {
    console.error(error)
  })

function splitName(name) {
  const parts = name.split(' ')
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') }
}

function createTable(data) {
  const table = document.createElement('table')
  const thead = document.createElement('thead')
  const tbody = document.createElement('tbody')
  const row = document.createElement('tr')

  const headings = ['ID', 'Image', 'First Name', 'Last Name', 'City', 'Favorite Color'];
  headings.forEach((heading) => {
    const th = document.createElement('th')
    th.textContent = heading
    row.appendChild(th)
  })

  thead.appendChild(row)
  table.appendChild(thead)
  table.appendChild(tbody)

  data.forEach((item) => {
    const { id, name, city, fav_color, image } = item
    
    const { firstName, lastName } = splitName(name)

    const tableRow = document.createElement('tr')

    const cellId = document.createElement('td')
    cellId.textContent = id

    const cellImage = document.createElement('td')

    const img = document.createElement('img')
    img.src = image
    img.alt = name
    img.width = 50
    cellImage.appendChild(img)

    const cellFirstName = document.createElement('td')
    cellFirstName.textContent = firstName

    const cellLastName = document.createElement('td')
    cellLastName.textContent = lastName

    const cellCity = document.createElement('td')
    cellCity.textContent = city

    const cellColor = document.createElement('td')
    cellColor.textContent = fav_color

    tableRow.append(cellId, cellImage, cellFirstName, cellLastName, cellCity, cellColor)
    tbody.appendChild(tableRow)
  })

  document.body.appendChild(table)
}

function createSearchAndCheckboxContainer() {
  const container = document.createElement('div')

  createVIPCheckbox(container)
  createSearchBox(container)

  document.body.insertBefore(container, document.body.firstChild)
}

function createVIPCheckbox(container) {
  const checkbox = document.createElement('input')
  checkbox.setAttribute('type', 'checkbox')
  checkbox.setAttribute('id', 'isVip')
  container.appendChild(checkbox)

  const checkboxLabel = document.createElement('label')
  checkboxLabel.setAttribute('for', 'isVip')
  checkboxLabel.innerText = 'VIP'
  container.appendChild(checkboxLabel)

  checkbox.addEventListener('change', () => {
    const vipOnly = checkbox.checked ? state.data.filter(item => item.isVIP) : state.data
    createTable(vipOnly)
  })
}

function createSearchBox(container) {
  const form = document.createElement('form')

  const searchBox = document.createElement('input')
  searchBox.setAttribute('type', 'search')
  searchBox.setAttribute('id', 'search')
  searchBox.setAttribute('name', 'search')
  form.appendChild(searchBox)

  const searchButton = document.createElement('button')
  searchButton.innerHTML = 'Search for name'
  searchButton.setAttribute('id', 'searchButton')
  form.appendChild(searchButton)

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const searchString = searchBox.value.toLowerCase()
    const filteredData = state.data.filter(item => {
      const { firstName, lastName } = splitName(item.name)
      return firstName.toLowerCase().includes(searchString) || lastName.toLowerCase().includes(searchString)
    })
    createTable(filteredData)
  })

  container.appendChild(form)
}
