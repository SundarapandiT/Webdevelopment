import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Function to initialize Firestore database
function initializeFirestore() {
    const db = getFirestore();
    return db;
}

// Function to check user credentials
async function checkCredentials(email, password) {
    try {
        const db = initializeFirestore();
        const usersCollection = collection(db, "users");
        const q = query(usersCollection, where("email", "==", email), where("password", "==", password));
        const querySnapshot = await getDocs(q);
        console.log("Query snapshot size:", querySnapshot.size);
        querySnapshot.forEach(doc => {
            console.log(doc.id, " => ", doc.data());
        });
        if (querySnapshot.size > 0) {
            return true; // Credentials are valid
        } else {
            return false; // Credentials are invalid
        }
    } catch (error) {
        console.error("Error checking credentials:", error);
        throw error;
    }
}


// Function to handle form submission
export function handleFormSubmit(event) {
    event.preventDefault();
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    console.log("Email:", email);
    console.log("Password:", password);

    // Check user credentials
    checkCredentials(email, password)
        .then(valid => {
            console.log("Credentials valid:", valid);
            if (valid) {
                alert("Login successful!");
                // Redirect or perform other actions upon successful login
            } else {
                alert("Invalid email or password. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error checking credentials:", error);
            alert("An error occurred while logging in. Please try again later.");
        });
}
