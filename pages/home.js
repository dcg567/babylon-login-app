import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Home() {
  
  const [userName, setUserName] = useState(null); //state to store logged in user's name
  const router = useRouter(); //next js router to navigate programmatically

  //we check if the user is logged in 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserName(user.displayName || 'User');
        } else {
            router.push("/login"); //redirect to login if no user
        }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  //loading message while checking auth
  if (!userName) return <p>Loading...</p>; 

  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h1>Hey, {userName || "User"}! You’re successfully logged in.</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
