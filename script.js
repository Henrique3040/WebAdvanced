"use strict";

//De html page wordt eerste opgeladen en dan pas kan de fucnties op de js gebruikt worden
//Arrow function werd hier voor gebruikt
window.onload = (event) => {
  console.log("page is fully loaded");

  let name = localStorage.getItem("name");
  let age = localStorage.getItem("age");

  while(!name || !age){

    
      name = prompt("Geef een naam in");
      age = prompt("Geef u leeftijd");
 
   

  }
  
 
  localStorage.setItem("name", name);
  localStorage.setItem("age", age);


  var myData = localStorage.getItem("name");


  // een asyc functie die zich zel excuteert
  (async function () {
    // Functie om een api call te maken
    async function fetchData(pokemonName, ...urls) {
      try {
        // Maak een GET request naar de PokeAPI
        const response = await Promise.all(
          urls.map(url => fetch(`${url}/${pokemonName}`))
        );

        // Controle om te zien of alles goed is

        const pokemonData = await Promise.all(

            response.map(async response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                  }
                  return await response.json();
            })

        );
       

      // de data sturen naar dispalay functie
        pokemonData.forEach(data => displayPokemonData(data));
      } catch (error) {
        // Hier worde de errors gehandelt
        console.error("There was a problem with the fetch operation:", error);
      }
    }


    const titelWeb = document.getElementById("titelWebsite");

    titelWeb.innerHTML =`
    <h1>Welkom op Search you favoriete pokemon ${myData}!!</h1>
    `


    // functie dat de pokemons zal display in de page
    function displayPokemonData(data) {
      const pokemonDataContainer = document.getElementById("pokemonData");

      //Controler of sprites bestaat en dat niet null is
      //Destrucring gebeurt hier 
      const spriteUrl =
        data.sprites && data.sprites.front_default
          ? data.sprites.front_default
          : "";

      pokemonDataContainer.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${spriteUrl}" alt="${data.name}">
        <p>Height: ${data.height}</p>
        <p>Weight: ${data.weight}</p>
      `;
    }

    // Deze functie behandel de submisie van de form met de pokemon naam
    document
      .getElementById("pokemonForm")
      .addEventListener("submit", async function (event) {
        event.preventDefault();

        const pokemonName = document.getElementById("pokemonName").value.trim();
        if (pokemonName) {
            const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
          await fetchData(pokemonName.toLowerCase(), apiUrl); // Lower case om de api requirements te matchen
        } else {
          console.error("Please enter a Pokemon name.");
        }
      });
  })();

  
};
