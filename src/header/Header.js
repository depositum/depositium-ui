import './Header.css';
import {Box, Stack} from "@mui/material";
import walletAPI from "../api/WalletAPI";
import ConnectItem from "../login/ConnectItem";
import ProfileItem from "../login/ProfileItem";

export default function Header(props) {
    return <div className="Header" >
        <Stack direction="row" justifyContent="space-between" spacing={1}>
            <Box>Depositium</Box>
            <Box>
                {walletAPI.isSignedIn() ? <ProfileItem /> : <ConnectItem/>}
            </Box>
        </Stack>
    </div>;
}
