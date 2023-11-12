import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
   search: {[theme.breakpoints.down('sm')]:{
        display:'flex',
        justifyContent:'center',
        width:'100%',
    }},
    searchInput:{
        color:theme.palette.mode==="light" && 'dark',
        filter:theme.palette.mode === 'dark' ? 'invert(0)' : 'invert(1)',
        [theme.breakpoints.down('sm')]:{
            marginTop:'-10px',
            marginBottom:'10px',
        }
    }

}))