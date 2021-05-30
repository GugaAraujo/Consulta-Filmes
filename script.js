//criando a constante para se referir a classe movies
const moviesDiv = document.querySelector('.movies')

// se refere a ID film
const movie = document.querySelector('#film')
// se refera classe do botão
const button = document.querySelector('.btn-search-movie')


// callback que: Ao disparar o click em button (.btn-search-movie),
// A Div movies é Zerada, tento seus resultados anteriores apagados. Evita a somatória de várias pesquisas
// função fetch acessa a API e insere no link o resultado informado pelo Cliente dentro do input com ID film.
// caso o status seja uma falha 401 na pesquisa, o cliente será informado.
// caso contrário, retorna response.json. Aqui obtemos acesso as informações de dentro da API.
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

    // para cada elemento da busca, serão criadas novas tags  span, h4, p, img div

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