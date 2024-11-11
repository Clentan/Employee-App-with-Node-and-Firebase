import React, { useState, useEffect } from "react";
import { Tabs, Tab, Input, Link, Button, Card, CardBody, Spinner } from "@nextui-org/react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './config'; // Ensure Firebase is initialized here
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [selected, setSelected] = useState("login");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [storedName, setStoredName] = useState("");  // Store the name from localStorage
  const [loading, setLoading] = useState(false); // Loading state

  // Check if user is already logged in on initial load
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const storedUserName = localStorage.getItem('userName');  // Retrieve the stored name

    if (userToken) {
      setIsLoggedIn(true);
    }

    if (storedUserName) {
      setStoredName(storedUserName);  // Set the stored name in state
    }
  }, []);

  // Handle login functionality
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Both email and password are required.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('userToken', userCredential.user.accessToken); // Save the token
      localStorage.setItem('userName', userCredential.user.displayName || name);  // Save user name
      setIsLoggedIn(true);
      toast.success("Successfully logged in!");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      // Simulate a delay of 4 seconds before stopping the loading state
      setTimeout(() => setLoading(false), 4000);
    }
  };

  // Handle sign-up functionality
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("All fields are required.");
      return;
    }

    if (password.length < 7) {
      toast.error("Password must be at least 7 characters long.");
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await userCredential.user.updateProfile({
          displayName: name, // Set the display name
        });
        localStorage.setItem('userToken', userCredential.user.accessToken); // Store token for demo purposes
        localStorage.setItem('userName', name);  // Store name in localStorage
        setIsLoggedIn(true);
       
        setSelected("login"); // Switch to login tab
        toast.success("Successfully signed up! You can now log in.");
      } catch (error) {
        toast.error("Sign-up failed. Please try again.");
      }
    }
  };

  // Handle Google login functionality
  const handleGoogleSignIn = async () => {
    try {
      setEmail("");
      setPassword("");
      setName("");
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem('userToken', user.accessToken);
      localStorage.setItem('userName', user.displayName);
      setIsLoggedIn(true);
      toast.success("Successfully logged in with Google!");
    } catch (error) {
      toast.error("Google sign-in failed.");
    }
  };

  // Handle password reset functionality
  const handlePasswordReset = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (error) {
      toast.error("Failed to send reset email. Please check your email address.");
    }
  };

  // Handle logout functionality with a delay
  const handleLogout = () => {
    setLoading(true); // Start loading

    // Simulate 4 seconds delay before logging out
    setTimeout(() => {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userName');
      setIsLoggedIn(false);
      setStoredName("");
      toast.success("Successfully logged out!");
      setLoading(false); // Stop loading after 4 seconds
    }, 4000);
  };

  return (
    <div className="flex flex-col w-full">
      <Card className="max-w-full w-[340px] h-[500px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Sign">
              <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <Input
                  isRequired
                  label="Name"
                  placeholder="Enter your email"
                  type="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-center text-small">
                  Need to create an account?{" "}
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" type="submit" disabled={loading}>
                    {loading ? <Spinner size="sm" /> : "Sign In"}
                  </Button>
                  <Button fullWidth color="secondary" onClick={handleGoogleSignIn}>
                    SignIn with Google
                  </Button>
                </div>
                <div className="flex justify-center mt-2">
                  <Link onPress={handlePasswordReset} color="primary">
                    Forgot password?
                  </Link>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      {/* Show Logout button only when logged in */}
      {isLoggedIn && (
        <div className="flex justify-center mt-4">
          <Button color="error" onClick={handleLogout}>
            {loading ? <Spinner size="sm" /> : "Log Out"}
          </Button>
        </div>
      )}

      {/* Show the stored name when logged in */}
      {isLoggedIn && storedName && (
        <div className="flex justify-center mt-4">
          <p>Welcome, {storedName}!</p>
        </div>
      )}

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
}
