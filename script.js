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