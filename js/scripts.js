let pokemonRepository = (function () {
    let modal = $('#pokemonDetails');
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=15';
  
    function add(pokemon) {
      if (
        typeof pokemon === 'object' &&
        'name' in pokemon &&
        'detailsUrl' in pokemon
      ) {
        pokemonList.push(pokemon);
      } else {
        console.log('pokemon is not correct');
      }
    }
  
    function getAll() {
      return pokemonList;
    }
  
    function addListItem(pokemon) {
      let listContainer = $('.pokemon-list');
      let listItem = $('<li></li>');
      let button = $('<button class="btn btn-primary"></button>').text(pokemon.name);
      listItem.append(button);
      listContainer.append(listItem);
  
      button.on('click', function () {
        showDetails(pokemon);
      });
    }
  
    function loadList() {
      return fetch(apiUrl)
        .then((response) => response.json())
        .then(function (data) {
          data.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url,
            };
            add(pokemon);
          });
        })
        .catch(function (e) {
          console.error('Error fetching Pokemon list:', e);
        });
    }
  
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url)
        .then((response) => response.json())
        .then(function (details) {
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          showModal(item);
        })
        .catch(function (e) {
          console.error('Error fetching Pokemon details:', e);
        });
    }
  
    function showDetails(pokemon) {
      loadDetails(pokemon);
    }
  
    function showModal(pokemon) {
      let modalTitle = modal.find('.modal-title');
      let modalBody = modal.find('.modal-body');
      let pokemonImage = $('<img class="img-fluid mb-2">').attr('src', pokemon.imageUrl);
      let pokemonHeight = $('<p></p>').text('Height: ' + pokemon.height + 'm');
  
      modalTitle.text(pokemon.name);
      modalBody.empty();
      modalBody.append(pokemonImage);
      modalBody.append(pokemonHeight);
  
      modal.modal('show');
    }
  
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails,
    };
  })();
  
  // Load Pokemon list and populate UI
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
  