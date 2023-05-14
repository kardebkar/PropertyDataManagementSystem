import { User } from "../models/user";
import OwnerDetailsLoggedOutView from "../components/ownerDetails/OwnerDetailsLoggedOutView";
import OwnerDetailsLoggedInView from "../components/ownerDetails/OwnerDetailsLoggedInView";

interface OwnerDetailsPageProps{
    loggedInUser:User | null,
}


const OwnerDetailsPage = ({loggedInUser}:OwnerDetailsPageProps) => {
  return (
      <>
        {loggedInUser 
        ? <OwnerDetailsLoggedInView /> 
        : <OwnerDetailsLoggedOutView />}
      </>
  );
};

export default OwnerDetailsPage;
