import { Container } from "react-bootstrap";
// import NotesPageLoggedInView from "../components/NotesPageLoggedInView";
// import NotesPageLoggedOutView from "../components/NotesPageLoggedOutView";
// import styles from "../styles/NotesPage.module.css"; 
import { User } from "../models/user";
import OwnerDetailsLoggedOutView from "../components/ownerDetails/OwnerDetailsLoggedOutView";
import OwnerDetailsLoggedInView from "../components/ownerDetails/OwnerDetailsLoggedInView";

interface OwnerDetailsPageProps{
    loggedInUser:User | null,
}


const OwnerDetailsPage = ({loggedInUser}:OwnerDetailsPageProps) => {
  return (
    <Container>
      <>
        {loggedInUser 
        ? <OwnerDetailsLoggedInView /> 
        : <OwnerDetailsLoggedOutView />}
      </>
    </Container>
  );
};

export default OwnerDetailsPage;
