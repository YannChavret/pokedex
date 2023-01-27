const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

async function fetchname() {
  fetchPokemon();
  const response = await fetch(apiUrl);
  const name_mumber = await response.json();
  const result = name_mumber.results;
  const list = document.querySelector("#selectOne");

  for (let i = 0; i < result.length; i++) {
    const option = document.createElement("option");
    option.value = result[i].name;
    list.appendChild(option);
  }
}

function getValue() {
  var pokemon = document.getElementById("search").value;

  // pokemon = "snorlax";

  // window.onload = function () {
  fetchPokemon();
  fetchSpecies();
  // };

  // function poundsToKg(poundsWeight) {
  //   const kgWeight = Math.round((poundsWeight / 2.205 / 100) * 100);
  //   console.log({ kgWeight });
  //   specificationsWeight.textContent = `${kgWeight}kg`;
  //   return kgWeight;
  // }

  const specificationsWeight = document.querySelector("#specifications-weight");

  /***************************************************/
  /*---------------- API GENERALE --------------------*/
  /****************************************************/

  async function fetchPokemon() {
    // const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon/" + pokemon
    );
    const data = await response.json();
    console.log(data);

    /*---------------- Nom et numéro --------------------*/

    const h1 = document.querySelector("h1");
    h1.textContent = data.name + " ";
    const span = document.createElement("span");
    // span.textContent = `#${data.game_indices[0].game_index}`;
    span.textContent = "#" + data.game_indices[0].game_index;
    h1.appendChild(span);
    // h1.innerHTML = `${data.name} <span>#${data.game_indices[0].game_index}</span>`;
    // const description = document.querySelector(".description");
    // description.textContent = data.description;

    /*---------------- height / weight --------------------*/

    const height = document.querySelector(".height");
    height.textContent = data.height;

    // specificationsWeight.textContent = poundsToKg(data.weight) + " kg";
    specificationsWeight.textContent = data.weight / 10 + " kg";

    /*---------------- Image --------------------*/

    const image = document.querySelector(".imgHero");
    console.log(data.sprites.other);
    image.setAttribute(
      "src",
      data.sprites.other["official-artwork"].front_default
    );

    /*----------------- Stats -----------------------*/

    const stats = document.querySelector(".stats");

    for (const typeStats of data.stats) {
      const baseStat = Math.round((typeStats.base_stat * 15) / 100);
      console.log(baseStat);
      stats.classList.add(typeStats.stat.name + "-" + baseStat);
    }

    /***************************************************/
    /*---------------- API ABILITY --------------------*/
    /***************************************************/

    /*---------------- Capacité --------------------*/

    // const capacity = document.querySelector(".capacity");
    // capacity.textContent = data.abilities[0].ability.name;

    const urlAbility = data.abilities[0].ability.name;

    fetchAbility();

    async function fetchAbility() {
      const response = await fetch(
        "https://pokeapi.co/api/v2/ability/" + urlAbility
      );
      const data = await response.json();
      console.log(data.names);
      const capacity = document.querySelector(".capacity");
      capacity.textContent = data.names[3].name;
    }

    /*---------------- Type --------------------*/

    const typeContainer = document.querySelector(".type-list");

    for (const types of data.types) {
      const list = document.createElement("li");
      typeContainer.appendChild(list);

      const buttonType = document.createElement("button");
      buttonType.classList.add(types.type.name);
      buttonType.textContent = types.type.name;
      list.appendChild(buttonType);

      fetchTypes(types.type.name);
    }
  }
  /***************************************************/
  /*---------------- API SPECIES --------------------*/
  /***************************************************/

  async function fetchSpecies() {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon-species/" + pokemon
    );
    const data = await response.json();

    console.log(data.genera);

    /*---------------- Catégorie --------------------*/

    const category = document.querySelector(".category");
    category.textContent = data.genera[3].genus;

    /*---------------- Description --------------------*/

    const description = document.querySelector(".description");
    description.textContent = data.flavor_text_entries[16].flavor_text;

    /*---------------- Gender --------------------*/
    const gender = data.gender_rate;

    const female = document.querySelector(".bi-gender-female");
    const male = document.querySelector(".bi-gender-male");
    const unknown = document.querySelector(".unknown");

    switch (gender) {
      case -1:
        female.style.display = "none";
        male.style.display = "none";
        break;
      case 0:
        unknown.style.display = "none";
        female.style.display = "none";
        break;
      case 8:
        unknown.style.display = "none";
        male.style.display = "none";
        break;
      default:
        unknown.style.display = "none";
        break;
    }
  }

  /***************************************************/
  /*---------------- API TYPES ----------------------*/
  /***************************************************/

  async function fetchTypes(typePokemon) {
    /*---------------- Faiblesses --------------------*/

    const response = await fetch(
      "https://pokeapi.co/api/v2/type/" + typePokemon
    );
    const data = await response.json();

    console.log(data);

    const weakness = document.querySelector("#weaknesses");

    for (const damages of data.damage_relations.double_damage_from) {
      const list = document.createElement("li");
      weakness.appendChild(list);

      const buttonType = document.createElement("button");
      buttonType.classList.add(damages.name);
      buttonType.textContent = damages.name;
      list.appendChild(buttonType);
    }
  }
  header("Refresh:0");
  // setInterval(() => {
  //   location.reload();
  // }, 10000);
}
