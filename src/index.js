// Your code here
document.addEventListener("DOMContentLoaded", () => {
    const baseURL = "https://flatacuties-zeta.vercel.app/characters";
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

    // Votes submission
    function addVote(e) {
        e.preventDefault();

        if (!selectedCharacter) return;

        let currentVotes = selectedCharacter.votes;
        const inputValue = document.querySelector("#votes").value;

        fetch(`${baseURL}/${selectedCharacter.id}`, { 
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ votes: parseInt(inputValue, 10) + currentVotes }),
        })
       
        .catch(error => console.error("Error updating votes:", error));
    }

    // Attach event listener to the form
    voteForm.addEventListener("submit", addVote);

    // Reset votes
    resetBtn.addEventListener("click", () => {
        if (!selectedCharacter) return;
        selectedCharacter.votes = 0;
        document.getElementById("vote-count").textContent = 0;
    });
});
