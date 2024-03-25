let pokemonRepository = (function () {
    let modal = $('#pokemonDetails');
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=700';
  
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
      let listItem = $('<div class="col-md-1 mb-2"></div>'); 
      let button = $('<button class="btn btn-success btn-block btn-pokemon"></button>').text(pokemon.name); 
    
      if (pokemon.types && pokemon.types.length > 0) {
        pokemon.types.forEach(type => {
          listItem.addClass('type-' + type.type.name); 
        });
      }
    
      listItem.append(button);
      listContainer.append(listItem);
    
      button.on('click', function () {
          showDetails(pokemon);
      });
    
      if (listContainer.children('.row').length === 0 || listContainer.children('.row:last').children('.col-md-1').length === 10) {
        listContainer.append('<div class="row"></div>');
      }
    
      listContainer.children('.row:last').append(listItem);
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
        console.log("Pokemon list loaded:", pokemonList);
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
          item.types = details.types;
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
      
      let types = pokemon.types.map(type => type.type.name).join(', ');
      let pokemonTypes = $('<p></p>').text('Types: ' + types);
    
      modalTitle.empty();
      modalBody.empty();
    
      modalTitle.text(pokemon.name);
      modalBody.append(pokemonTypes);
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
  
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
  