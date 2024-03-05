import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';


const Notification = ({ count }) => {
    return (
        <IconButton aria-label={(count)}>
            <Badge badgeContent={count} color="error">
                <FontAwesomeIcon icon={faBell} />
            </Badge>
        </IconButton>
        
    );
}
export default Notification
