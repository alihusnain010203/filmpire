import { makeStyles } from "@mui/styles";
export default makeStyles((theme) => ({
    pagination:{
        display:'flex',
        justifyContent:'space-evenly',
        marginTop:'10px',
    },
    page:{
        color:theme.palette.text.primary
    }
}))