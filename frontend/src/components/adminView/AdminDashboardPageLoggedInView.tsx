import { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { User as UserModel } from '../../models/user';
import * as UsersApi from "../../network/users_api";
import styles from "../../styles/NotesPage.module.css";
import styleUtils from "../../styles/utils.module.css";
// import AddEditNoteDialog from "./AddEditNoteDialog";
import AdminDashboard from './AdminDashboardPage';
import User from './AdminDashboardPage';

const AdminDashboardPageLoggedInView = () => {

    const [users, setUsers] = useState<UserModel[]>([]);
    const [usersLoading, setUsersLoading] = useState(true);
    const [showUsersLoadingError, setShowUsersLoadingError] = useState(false);

    const [showAddUserDialog, setShowAddUserDialog] = useState(false);
    const [userToEdit, setUserToEdit] = useState<UserModel | null>(null);

    useEffect(() => {
        async function loadUsers() {
            try {
                setShowUsersLoadingError(false);
                setUsersLoading(true);
                const users = await UsersApi.fetchUsers();
                setUsers(users);
            } catch (error) {
                console.error(error);
                setShowUsersLoadingError(true);
            } finally {
                setUsersLoading(false);
            }
        }
        loadUsers();
    }, []);

    async function deleteUser(user: UserModel) {
        try {
            await UsersApi.deleteUser(user._id);
            setUsers(users.filter(existingUser => existingUser._id !== user._id));
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    const usersGrid =
        <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
            {users.map(user => (
                <Col key={user._id}>
                    <User
                        user={user}
                        classNm={styles.note}
                        onUserClicked={setUserToEdit}
                        onDeleteUserClicked={deleteUser}
                    />
                </Col>
            ))}
        </Row>

    return (
        <>
            <Button
                className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
                onClick={() => setShowAddUserDialog(true)}>
                <FaPlus />
                Add new User
            </Button>
            {usersLoading && <Spinner animation='border' variant='primary' />}
            {showUsersLoadingError && <p>Something went wrong. Please refresh the page.</p>}
            {!usersLoading && !showUsersLoadingError &&
                <>
                    {users.length > 0
                        ? usersGrid
                        : <p>You don't have any users yet</p>
                    }
                </>
            }
            {/* {showAddUserDialog &&
                <AddEditNoteDialog
                    onDismiss={() => setShowAddNoteDialog(false)}
                    onNoteSaved={(newNote) => {
                        setNotes([...notes, newNote]);
                        setShowAddNoteDialog(false);
                    }}
                />
            } */}
            {/* {noteToEdit &&
                <AddEditNoteDialog
                    noteToEdit={noteToEdit}
                    onDismiss={() => setNoteToEdit(null)}
                    onNoteSaved={(updatedNote) => {
                        setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote));
                        setNoteToEdit(null);
                    }}
                />
            } */}
        </>
    );
}

export default AdminDashboardPageLoggedInView;