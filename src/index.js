// Currently clicked character
let clickedCharacter = null;

// Get div element that contains the `character-bar` id
const div = document.getElementById("character-bar");
// Fetch character data from the server
fetch("http://localhost:3000/characters")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    // Loop through the data
    data.forEach((character) => {
      // Create a span to contain name of each span
      const span = document.createElement("span");
      // Set the character name as the textContent of each span
      span.textContent = character.name;
      // Append the span to the div element that contains the `character-bar` id
      div.appendChild(span);

      // When the character in the `div#character-bar` is clicked, display the
      // character's details in the `div#detailed-info`
      span.addEventListener("click", () => {
        fetch(`http://localhost:3000/characters/${character.id}`)
          .then((response) => response.json())
          .then((character) => {
            // Set character's details
            const p = document.querySelector("#name");
            p.textContent = character.name;

            const img = document.querySelector("#image");
            img.src = character.image;

            const h4 = document.querySelector("#vote-count");
            h4.textContent = character.votes;

            // Update value of clickedCharacter
            clickedCharacter = character;
          });
      });
    });
  });
// When the `form#votes-form` is submitted, add the number of votes from
// the input field to the character displayed in the `div#detailed-info`
const form = document.querySelector("#votes-form");
const input = document.querySelector("input");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (clickedCharacter) {
    clickedCharacter.votes += Number(input.value);
    console.log(clickedCharacter.votes);
    const h4 = document.querySelector("#vote-count");
    h4.textContent = clickedCharacter.votes;
    // Reset value of input
    input.value = "";
  }
});

// Bonus Deliverable: Reset Votes
const resetBtn = document.querySelector("#reset-btn");
resetBtn.addEventListener("click", function () {
  if (clickedCharacter) {
    clickedCharacter.votes = 0;
    const h4 = document.querySelector("#vote-count");
    h4.textContent = clickedCharacter.votes;
    input.value = "";
  }
});
