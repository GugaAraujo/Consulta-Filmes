const moviesDiv = document.querySelector('.movies')
const movie = document.querySelector('#film')
const button = document.querySelector('.btn-search-movie')

button.addEventListener('click', (evento)=>{
    evento.preventDefault()
    moviesDiv.innerHTML = ""

    fetch(`http://www.omdbapi.com/?apikey=8a30bf8&s=${movie.value}`)
    .then((response)=> {
        if(response.status ===401){
            window.alert("Erro 401 - Entre em contato com o Administrador")
        } else {
            return response.json()
        }
    })

    .then((data) => {
        console.log(data)
        data.Search.forEach(element => {
            const box = document.createElement('span')
            box.setAttribute('class','box')
            box.setAttribute('box-id',element.imdbID)

            const titulo = document.createElement('h4')
            titulo.textContent = element.Title

            let divider = document.createElement('div')
            divider.setAttribute('class','box-divider')

            const ano = document.createElement('p')
            ano.textContent = `Ano: ${element.Year}`

            const tipo = document.createElement('p')
            tipo.textContent = `Tipo: ${element.Type}`

            const foto = document.createElement('img')
            foto.setAttribute('src',element.Poster)

            moviesDiv.appendChild(box)
            box.appendChild(foto)
            box.appendChild(divider)
            divider.appendChild(titulo)
            divider.appendChild(ano)
            divider.appendChild(tipo)
            
            
        });
    })

    .catch((erro)=>{
        console.log(erro)
    })

    document.querySelector('.form').reset('')
})