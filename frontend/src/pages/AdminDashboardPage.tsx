import { Container } from "react-bootstrap";
import styles from "../styles/NotesPage.module.css"; 
import { User } from "../models/user";
import AdminDashboardPageLoggedInView from "../components/adminView/AdminDashboardPageLoggedInView";
import AdminDashboardPageLoggedOutView from "../components/adminView/AdminDashboardPageLoggedOutView";

interface AdminDashboardPageProps{
    loggedInUser:User | null,
}


const AdminDashboardPage = ({loggedInUser}:AdminDashboardPageProps) => {
  return (
    <Container className={styles.pageContainer}>
      <>
        {loggedInUser 
        ? <AdminDashboardPageLoggedInView /> 
        : <AdminDashboardPageLoggedOutView />}
      </>
    </Container>
  );
};

export default AdminDashboardPage;
