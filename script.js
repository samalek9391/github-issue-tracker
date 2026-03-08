const signBtn = document.getElementById("signin-btn");



signBtn.addEventListener("click", function () {
  const userName = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (userName === "admin" && password === "admin123") {
    const signInSection = document.getElementById("signin-section");
    const dashbordSection = document.getElementById("dashboard-section");

    signInSection.classList.add("hidden");
    dashbordSection.classList.remove("hidden");
  } else {
    alert("Invalid username or password");
  }
});

const issuesCards = document.getElementById("issues-cards");
const allCount = document.getElementById("all-count");
// console.log(issuesCards);

async function loadCards() {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();

  allCount.innerText = data.data.length;
  displayCards(data.data);
}


function displayCards(cards) {
  issuesCards.innerHTML = "";

  for (const card of cards) {

    const issueCard = document.createElement("div");

    const borderColor =
      card.status === "open" ? "border-green-500" : "border-purple-500";

    const statusIcon =
      card.status === "open"
        ? "./assets/Open-Status.png"
        : "./assets/Closed- Status .png";

    issueCard.innerHTML = `
    
    <div class="bg-[#F8FAFC] p-4 rounded-lg shadow border-t-4 ${borderColor} cursor-pointer">

        <div class="flex justify-between items-center mb-3">
            <img src="${statusIcon}" class="w-6">

            <div class="bg-red-100 text-red-500 px-3 py-1 rounded-full text-sm">
                ${card.priority}
            </div>
        </div>

        <h2 class="font-semibold mb-2 line-clamp-1">
        ${card.title}
        </h2>

        <p class="text-[#64748B] text-sm line-clamp-2 mb-3">
        ${card.description}
        </p>

        <div class="flex gap-2 mb-3 border-b p-5">
            ${card.labels
              .map(
                (label) => `
            <span class="text-xs bg-gray-200 px-2 py-1 rounded">
            ${label}
            </span>
            `
              )
              .join("")}
        </div>



        <p class="text-xs text-gray-500">${card.author}</p>
        <p class="text-xs text-gray-400">${card.createdAt}</p>

    </div>
    
    `;

    issuesCards.appendChild(issueCard);
  }
};


let allIssues = [];

async function loadCards() {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues"
  );
  const data = await res.json();

  allIssues = data.data;

  allCount.innerText = allIssues.length + " Issues";

  displayCards(allIssues);
}

const tabs = document.querySelectorAll(".tab-btn");

for (const tab of tabs) {
  tab.addEventListener("click", function () {
    
    tabs.forEach((t) => t.classList.remove("active"));
    this.classList.add("active");

    const status = this.dataset.status;

    if (status === "all") {
      displayCards(allIssues);
    } else {
      const filtered = allIssues.filter(
        (issue) => issue.status === status
      );

      displayCards(filtered);
    }
  });
}


loadCards();


// Search Functionality

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("keyup", async function () {

  const text = this.value;

  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
  );

  const data = await res.json();

  displayCards(data.data);
});



