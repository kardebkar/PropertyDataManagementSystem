import styles from "../../styles/Note.module.css";
import { Card } from "react-bootstrap";
import { User as UserModel } from "../../models/user";
import { formatDate } from "../../utils/formatDate";
import {MdDelete} from "react-icons/md";
import styleUtils from "../../styles/utils.module.css";


interface UserProps{
    user: UserModel,
    onUserClicked: (user: UserModel)=>void,
    onDeleteUserClicked: (user: UserModel)=>void,
    classNm?: string,
}


const User = ({user, onUserClicked, onDeleteUserClicked, classNm} : UserProps)=>{
    
    const {
        last_name,
        first_name,
        email,
        createdAt,
        updatedAt

    }=user;


    let createdUpdatedText:string;

    if(updatedAt>createdAt){
        createdUpdatedText="Updated: "+formatDate(updatedAt);
    }
    else{
        createdUpdatedText="Created: "+formatDate(createdAt);
    }

    return (
        <Card 
        className={`${styles.noteCard} ${classNm}`}
        onClick={()=>onUserClicked(user)}
        >
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.flexCenter}>
                    {first_name} {last_name}
                    <MdDelete 
                    className="text-muted ms-auto"
                    onClick={(e)=>{
                        onDeleteUserClicked(user);
                        e.stopPropagation();
                    }}
                    />
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {email}
                </Card.Text>
                
            </Card.Body>
            <Card.Footer className="text-muted">
                {createdUpdatedText}
            </Card.Footer>
        </Card>
    )
}


export default User;