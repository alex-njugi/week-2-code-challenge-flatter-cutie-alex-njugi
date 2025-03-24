// Your code here
document.addEventListener("DOMContentLoaded", () => {
    const baseURL = "http://flatacuties-zeta.vercel.app/characters";
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const voteForm = document.getElementById("votes-form");
    const resetBtn = document.getElementById("reset-btn");
    let selectedCharacter = null;

// Fetch characters 
    fetch(baseURL)
        .then(response => response.json())
        .then(characters => {
            characters.forEach(character => {
                const span = document.createElement("span");
                span.textContent = character.name;
                span.addEventListener("click", () => displayCharacter(character));
                characterBar.appendChild(span);
            });
        })
        .catch(error => console.error("Error fetching characters:", error)); 


    function displayCharacter(character) {
        selectedCharacter = character;
        document.getElementById("name").textContent = character.name;
        document.getElementById("image").src = character.image;
        document.getElementById("image").alt = character.name;
        document.getElementById("vote-count").textContent = character.votes;
    }

// votes submission
    voteForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!selectedCharacter) return;

        const votesInput = document.getElementById("votes");
        const newVotes = parseInt(votesInput.value) || 0;
        selectedCharacter.votes += newVotes;
        document.getElementById("vote-count").textContent = selectedCharacter.votes;
        votesInput.value = "";
    });

// Reset votes
    resetBtn.addEventListener("click", () => {
        if (!selectedCharacter) return;
        selectedCharacter.votes = 0;
        document.getElementById("vote-count").textContent = 0;
    });
});
