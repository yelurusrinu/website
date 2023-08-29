import { useContext } from "react";
import { UserContext } from "../../lib/UserContext";
import Appointment from "../components/Appointments";
import Appointments from "../components/Appointments";

const Home = () => {
  // Allow this component to access our user state
  const [user] = useContext(UserContext);

  return (
    <div>
      {/* Check to see if we are in a loading state and display a message if true */}
      {user?.loading && <p>Loading...</p>}
      {user && !user.loading && <Appointments/>}
    </div>
  );
};

export default Home;
