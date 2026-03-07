const signBtn = document.getElementById("signin-btn");
signBtn.addEventListener("click", function(){
    const userName = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if(userName === "admin" && password === "admin123"){
        const signInSection = document.getElementById("signin-section")
        const dashbordSection = document.getElementById("dashboard-section");

        signInSection.classList.add("hidden");
        dashbordSection.classList.remove("hidden");
    }else{
        alert("Invalid username or password");
    }
})

// const toggleSection = document.getElementById("toogle-section");

// async function loadButtons () {
//     const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
//     const data = await res.json();
//     console.log(data.data);
//     console.log(toggleSection);
//     data.data.forEach(element => {
//         console.log(element);
//         const btn = document.createElement("button");
//         btn.className = "btn btn-outline px-10 py-3";
//         toggleSection.appendChild(btn);
//     });
// }

// loadButtons()

const issuesCards = document.getElementById("issues-cards");
// console.log(issuesCards);

async function loadCards() {
    const res = await fetch ("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json();
    // console.log(data);
    data.data.forEach(card => {
        // console.log(card);
        const issueCard = document.createElement("div");
        // console.log(issueCard);
        issueCard.innerHTML = `
        <h2>This is card${card.title}</h2>
        `;
        issuesCards.append(issueCard);
    });
}

loadCards()