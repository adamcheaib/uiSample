const prefix = "https://teaching.maumt.se/apis/SR/v1/";

async function fetchFunction(link, method, details) {

    switch (method) {
        case "GET": {
            console.log("ITS GET")
            try {
                const response = await fetch(link);
                const resource = await response.json();

                if (response.ok) {
                    console.log(resource);
                }
            } catch (error) {
                alert("ERROR!");
            }
            break;
        }
            
        case "POST": {
            const postLink = {
                method: "POST",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify(details)
                }
            try {
                const response = await fetch(link, postLink);
                const resource = await response.json();
                
                if (response.ok) {
                    console.log(resource);
                } else {
                    console.log(resource);
                }
            } catch (error) {
                alert("ERROR REG");
            }
            break;
        }
        
        case "DELETE": {
            try {
                const response = await fetch(link, details);
                const resource = await response.json();

                if (response.ok) {
                    console.log("DELETE WORKS!");
                }
            } catch (error) {
                alert("ERROR DELET")
            }
            break;
        }
    
        default: {
            alert("Must provide method!");
        }
            
    }
}

async function generateHomePage() {
    document.getElementById("mainContent").innerHTML = `
    <h1>Welcome to Series Rater!</h1>
    <p>This is where you can discover series, save series, and see what other people like to watch!</p>
    `;

    document.querySelector("#dialogCover").remove();
}

function menuSlide(event) {
    const dialogCover = document.createElement("div");
    dialogCover.id = "dialogCover";
    
    const dialogContent = document.createElement("div");
    dialogContent.id = "dialogContent";

    const closeDOM = document.createElement("div");
    closeDOM.id = "closeDOM";

    dialogCover.appendChild(closeDOM);
    
    dialogContent.innerHTML = `
    <h2 style="margin: 0; text-align: center;">Menu</h2>
    <hr>
    <div id="menuHome">Home</div>
    <div id="menuSeries">Series</div>`;
    
    document.body.appendChild(dialogCover);
    dialogCover.appendChild(dialogContent);
    
    // Sign up
    if (localStorage.getItem("signedIn") === null) {
        // Add registration!
        dialogContent.innerHTML += `<div id="menuSignUp">Login / Register</div>`;
        dialogContent.querySelector("#menuSignUp").addEventListener("click", (event) => {
            generateSignInForm();
            dialogCover.remove();
        } )
    }

    dialogContent.querySelector("#menuHome").addEventListener("click", generateHomePage);
    
    closeDOM.addEventListener("click", (cover) => {
        dialogCover.remove();
    })
    
    setTimeout(() => {
        dialogContent.style.left = 0 + "px";
    }, 50);   
}

function generateSignUpForm(event) {
    document.getElementById("mainContent").innerHTML = `
    <section id="logOrRegSection">
    <h1>Create account</h1>
    <input type="text" id="usernameInput" placeholder="Username">
    <input type="password" id="passwordInput" placeholder="Password">
    <input type="password" id="repeatPassword" placeholder="Repeat password">
    <input type="text" id="mauID" placeholder="MAU ID">
    <button>Sign up</button>
    <span id="switchLogReg" style="color: blue; text-decoration: underline;">Already have an account? Sign in</span>
    </section>
    `;
    
    document.querySelector("#mainContent > #logOrRegSection > #switchLogReg").addEventListener("click", generateSignInForm);
    const usernameInput = document.getElementById("usernameInput");
    const passwordInput = document.getElementById("passwordInput");
    const repeatedPassword = document.getElementById("repeatPassword");
    const mauID = document.getElementById("mauID");

    const submitButton = document.querySelector("#mainContent > #logOrRegSection > button");
    // submitButton.addEventListener("click", () => fetchFunction(prefix, "POST", userDetails));
    submitButton.addEventListener("click", () => {
        if (passwordInput.value !== repeatedPassword.value) {
            alert("Passwords do not match! Please try again.");
            document.querySelectorAll("#logOrRegSection > input:not(#usernameInput)").forEach(input => input.value = "");
            return;
        }
        
        const userDetails = {
            action: "register_user",
            user_name: usernameInput.value,
            password: passwordInput.value,
            mau_id: mauID.value
        }

        console.log(userDetails);
        fetchFunction(prefix, "POST", userDetails);
    });
}

function generateSignInForm(event) {
    document.getElementById("mainContent").innerHTML = `
    <section id="logOrRegSection" class="login">
    <h1>Sign in</h1>
    <input type="text" id="usernameInput" placeholder="Username">
    <input type="password" id="passwordInput" placeholder="Password">
    <button>Sign in</button>
    <span id="switchLogReg" style="color: blue; text-decoration: underline;">Register for free</span>
    </section>
    `;

    document.querySelector("#mainContent > #logOrRegSection > #switchLogReg").addEventListener("click", generateSignUpForm);
    const submitButton = document.querySelector("#mainContent > #logOrRegSection > button");
    // submitButton.addEventListener("click", () => fetchFunction(prefix + "?series", "GET"));

}