const pollData = {
    "Who are we building the app for?": ["Urban residents", "Students", "Elderly citizens", "Corporate programs"],
    "Is the idea already in existence?": ["Yes, similar apps exist", "No, it's unique"],
    "What will make ours stand out?": ["Better AI", "Affordable pricing", "Fast response"],
    "Software methodology?": ["Agile", "Waterfall", "Scrum"]
};

const votes = {};

// Load Poll UI
function loadPoll() {
    const pollContainer = document.getElementById("pollContainer");

    Object.entries(pollData).forEach(([question, options]) => {
        const div = document.createElement("div");
        div.classList.add("question");
        div.style.marginBottom = "15px";
        div.style.padding = "10px";
        div.style.borderBottom = "1px solid #ddd";

        div.innerHTML = `<strong style="color:#007bff;">${question}</strong><br>`;

        options.forEach(option => {
            div.innerHTML += `
                <label style="display: block; margin: 5px 0;">
                    <input type="radio" name="${question}" value="${option}" style="margin-right: 10px;"> ${option}
                </label>
            `;
        });

        pollContainer.appendChild(div);
        votes[question] = {};
        options.forEach(option => votes[question][option] = 0);
    });
}

// Count Votes
function submitVotes() {
    const selectedOptions = document.querySelectorAll("input[type=radio]:checked");

    selectedOptions.forEach(selected => {
        votes[selected.name][selected.value]++;
    });

    showResults();
}

// Display Results
function showResults() {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "<strong>Most Voted Options:</strong><br>";

    Object.entries(votes).forEach(([question, options]) => {
        const maxVote = Math.max(...Object.values(options));
        const winningOption = Object.keys(options).find(key => options[key] === maxVote);
        resultsContainer.innerHTML += `
            <div style="padding: 8px; border-bottom: 1px solid #ddd;">
                <strong style="color: #28a745;">${question}:</strong> ${winningOption} (${maxVote} votes)
            </div>
        `;
    });
}

// Load Poll on Page Load
window.onload = loadPoll;
