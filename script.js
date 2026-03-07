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
const allCount = document.getElementById("all-count");
// console.log(issuesCards);

async function loadCards() {
    const res = await fetch ("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json();
    
    allCount.innerText = data.data.length;
       
    // console.log(data);
    data.data.forEach(card => {
        console.log(card);
        const issueCard = document.createElement("div");
        // console.log(issueCard);
        issueCard.innerHTML = `
                     <div class="bg-[#F8FAFC] p-4 rounded-lg shadow-lg">
              <div class="border-b-2 border-b-gray-300">
                <div class="flex justify-between items-center mb-3">
                  <img src="./assets/Open-Status.png" alt="">
                  <div class="bg-[#FEECEC] text-[#EF4444] w-20 h-8 rounded-full text-center">
                    <p>High</p>
                  </div>
              </div>
              <div class="mb-4">
                <h2 class="font-semibold mb-2">Fix navigation menu on mobile devices</h2>
                <p class="mb-3 text-[#64748B]">The navigation menu doesn't collapse properly on mobile devices...</p>
                <div class="flex gap-1">
                  <div class="bg-[#FECACA] text-[#EF4444] text-[12px] w-20 h-8 rounded-full text-center px-2 py-[6px]"><i class="fa-solid fa-bug"></i> BUG</div>
                  <div class="bg-[#FFF8DB] text-[#D97706] text-[12px] w-[112px] h-8 rounded-full text-center px-2 py-[6px]"><i class="fa-solid fa-life-ring"></i> Help Wanted</div>
                </div>
              </div>
              </div>
              
              <p class="text-[#64748B]">#1by john_doe</p>
              <p class="text-[#64748B]"> 1/15/2024</p>
              
            </div>                     
        `;
        issuesCards.append(issueCard);
        
    });
}

loadCards();

