import { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase";
import { updateProfile } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export default function Login() {
  //states for storing user input and form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    //simple password validation 
   if (isRegistering && password.length < 6) {
     setError("Password must be at least 6 characters");
     return;  // Prevent further execution if validation fails
     }

    
    try {
      if (isRegistering) {
        // Register new user
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        // Update the user's display name in Firebase
        await updateProfile(userCred.user, { displayName: fullName });
        alert("You have registered succesfully!");
      } else {
        // Login existing user
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successful!");
      }
      // Redirect to home page after successful login/registration
      router.push("/home");
    } catch (err) {
        const code = err.code ? err.code.replace("auth/", "") : "unknown-error";
        setError(code); //display error message
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "5rem auto", textAlign: "center" }}>
      <h1>{isRegistering ? "Register" : "Login"}</h1>

      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        )}
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">{isRegistering ? "Register" : "Login"}</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        {isRegistering ? "Already have an account?" : "New here?"}{" "}
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Login" : "Register"}
        </button>
      </p>
    </div>
  );
}
