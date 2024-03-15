let pokemonRepository = (function () {
    let modalContainer = document.querySelector('#pokemonDetails'); // Corrected modal container selection
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=15';

    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "detailsUrl" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let listContainer = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("btn", "btn-primary");
        listItem.appendChild(button);
        listContainer.appendChild(listItem);
        
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    async function loadList() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            data.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        } catch (e) {
            console.error("Error fetching Pokemon list:", e);
        }
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url)
            .then(response => response.json())
            .then(function (details) {
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = details.types;
            })
            .catch(function (e) {
                console.error("Error fetching Pokemon details:", e);
            });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon.name, `Height: ${pokemon.height} m`, pokemon.imageUrl); 
        });
    }

    function showModal(name, height, imageUrl) {
        modalContainer.innerHTML = ''; 
        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = name;

        let imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.alt = name;

        let contentElement = document.createElement('p');
        contentElement.innerText = height;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement)
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: "Pikachu", height: 0.4, types: ["electric"] });
console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
