import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Function to initialize Firestore database
function initializeFirestore() {
    const db = getFirestore();
    return db;
}

// Function to save user registration data to Firestore
export async function saveUserData(fullName, email, password, gateEligibility, qualification, college) {
    try {
        const db = initializeFirestore();
        const docRef = await addDoc(collection(db, "users"), {
            fullName: fullName,
            email: email,
            password: password,
            gateEligibility: gateEligibility,
            qualification: qualification,
            college: college
        });
        console.log("Document written with ID: ", docRef.id);
        return true;
    } catch (error) {
        console.error("Error adding document: ", error);
        return false;
    }
}

// Function to handle form submission
export function handleFormSubmit() {
    const fullName = document.querySelector('input[name="full_name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const gateEligibility = document.querySelector('input[name="gate_eligibility"]').value;
    const qualification = document.querySelector('input[name="qualification"]').value;
    const college = document.querySelector('input[name="college"]').value;

    console.log("Full Name:", fullName);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("GATE Eligibility:", gateEligibility);
    console.log("Qualification:", qualification);
    console.log("College:", college);

    // Save user data to Firestore
    saveUserData(fullName, email, password, gateEligibility, qualification, college)
        .then(success => {
            if (success) {
                alert("Registration successful!");
                // Redirect or perform other actions upon successful registration
            } else {
                alert("Failed to register. Please try again later.");
            }
        });
}
