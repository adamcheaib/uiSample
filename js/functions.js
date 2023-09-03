const prefix = "https://teaching.maumt.se/apis/SR/v1/";

async function fetchFunction(link, method, body = "") {
    switch (method) {
        case "GET": {
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
            try {
                const response = await fetch(link, body);
                const resource = await response.json();
                
                if (response.ok) {
                    console.log("REGISTERED");
                }
            } catch (error) {
                alert("ERROR REG");
            }
            break;
        }
        
        case "DELETE": {
            try {
                const response = await fetch(link, body);
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

function menuSlide(event) {
    const dialogCover = document.createElement("div");
    dialogCover.id = "dialogCover";
    
    const dialogContent = document.createElement("div");
    dialogContent.id = "dialogContent";

    const closeDOM = document.createElement("div");
    closeDOM.id = "closeDOM";

    dialogCover.appendChild(closeDOM);
    
    dialogContent.innerHTML = `
    <h2>Menu</h2>
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
    
    closeDOM.addEventListener("click", (cover) => {
        dialogCover.remove();
    })
    
    setTimeout(() => {
        dialogContent.style.left = 0 + "px";
    }, 50);   
}

function generateSignUpForm(event) {
    document.getElementById("mainContent").innerHTML = `
    <section id="logOrRegSection" class="login">
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
    const userDetails = {
        action: "register_user",
        user_name: usernameInput.value,
        password: passwordInput.value,
        mau_id: mauID.value
    }
    // submitButton.addEventListener("click", () => fetchFunction(prefix, "POST", userDetails));
    submitButton.addEventListener("click", () => {
        if (passwordInput.value !== repeatedPassword.value) {
            alert("Passwords do not match! Please try again.");
            document.querySelectorAll("#logOrRegSection > input:not(#usernameInput)").forEach(input => input.value = "");
            return;
        }

        // Send the user here!!
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
    submitButton.addEventListener("click", () => fetchFunction(prefix + "?series", "GET"));

}