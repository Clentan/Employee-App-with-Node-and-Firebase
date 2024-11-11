import { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { Avatar } from "@nextui-org/react";

export default function App() {
  const [latestName, setLatestName] = useState(null);

  useEffect(() => {
    // Function to fetch the latest name from localStorage
    const fetchName = () => {
      const storedName = localStorage.getItem("userName");
      if (storedName) {
        setLatestName(storedName);
      } else {
        console.log("No name found in localStorage");
        setLatestName(null); // Optional: Reset if no name found
      }
    };

    // Initial fetch on component mount
    fetchName();

    // Set interval to check every 5 seconds for changes in localStorage
    const intervalId = setInterval(() => {
      fetchName();
    }, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div>
      <Navbar shouldHideOnScroll className="shadow-2xl">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">Employees</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link color="foreground" href="#">
              News
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Department
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Document
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" aria-current="page">
              Employee
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Avatar />
          </NavbarItem>
          <NavbarItem>
            {/* Replace the "Sign Up" button with the latest name */}
            {latestName ? (
              <Button as={Link} color="primary" variant="flat">
                {latestName}
              </Button>
            ) : (
              <Button as={Link} color="primary" variant="flat">
                Loading...
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
