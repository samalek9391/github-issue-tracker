const signBtn = document.getElementById("signin-btn");
const loader = document.getElementById("loader");
const issuesCards = document.getElementById("issues-cards");
const allCount = document.getElementById("all-count");
const tabs = document.querySelectorAll(".tab-btn");
const searchInput = document.getElementById("search-input");

// Sign In authintication
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


// load cards
async function loadCards() {
  loader.classList.remove("hidden")
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues"
  );
  const data = await res.json();
  
  allIssues = data.data;

  allCount.innerText = allIssues.length + " Issues";
  
  loader.classList.add("hidden");

  displayCards(allIssues);
}


// Display all cards to dashboard
function displayCards(cards) {
  issuesCards.innerHTML = "";

  for (const card of cards) {
    const issueCard = document.createElement("div");

    const borderColor =
      card.status === "open" ? "border-green-500" : "border-purple-500";

    const statusIcon =
      card.status === "open"
        ? "./assets/Open-Status.png"
        : "./assets/Closed-Status.png";

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

        <div class="flex gap-2 mb-3 border-b pb-3">
            ${card.labels
              .map((label) => {
                const labelColor =
                  label === "bug" ? "bg-[#FEECEC]" : label === "help wanted" ? "bg-[#FFF8DB]" : "bg-[#DEFCE8]";
                const textColor = 
                  label === "bug" ? "text-[#EF4444]" : label === "help wanted" ? "text-[#D97706]" : "bg-[#00A96E]";
                return `
                <span class="text-xs ${labelColor} ${textColor} px-2 py-1 rounded">
                  ${label}
                </span>
                `;
              })
              .join("")}
        </div>

        <p class="text-xs text-gray-500">${card.author}</p>
        <p class="text-xs text-gray-400">${card.createdAt}</p>

    </div>
    `;

    issueCard.addEventListener("click", () => {
      openModal(card.id);
    });

    issuesCards.appendChild(issueCard);
  }
}


let allIssues = [];

// button toggling
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

// Modal
async function openModal(id) {

  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
  );

  const data = await res.json();

  const issue = data.data;

 
  document.getElementById("modal-title").innerText = issue.title;
  const status = document.getElementById("modal-status");
  status.innerText = issue.status;

  if(issue.status === "open"){
    status.className = "px-3 py-1 rounded-full text-white bg-green-500";
  }else{
    status.className = "px-3 py-1 rounded-full text-white bg-purple-500";
  }

  document.getElementById("modal-author").innerText =
    "Opened by " + issue.author;
  document.getElementById("modal-date").innerText =
    new Date(issue.createdAt).toLocaleDateString();


  document.getElementById("modal-description").innerText =
    issue.description;

  document.getElementById("modal-assignee").innerText =
    issue.author;

  const priority = document.getElementById("modal-priority");
  priority.innerText = issue.priority;

  if(issue.priority === "high"){
    priority.className = "px-3 py-1 rounded-full text-white bg-red-500";
  }else{
    priority.className = "px-3 py-1 rounded-full text-white bg-yellow-500";
  }

  const labels = document.getElementById("modal-labels");

  labels.innerHTML = "";

  for(const label of issue.labels){
    const span = document.createElement("span");
    span.className = label === "bug" ? "bg-red-200 px-2 py-1 text-xs rounded" : label === "help wanted" ? "bg-yellow-200 px-2 py-1 text-xs rounded" : "bg-green-200 px-2 py-1 text-xs rounded";
    span.innerText = label;
    labels.appendChild(span);
  }

  document.getElementById("issueModal").showModal();
}


// Search Functionality
searchInput.addEventListener("keyup", () => {

  const text = searchInput.value.toLowerCase();

  const filtered = allIssues.filter(issue =>
    issue.title.toLowerCase().includes(text) ||
    issue.description.toLowerCase().includes(text)
  );

  displayCards(filtered);
});




