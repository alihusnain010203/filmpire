import { makeStyles } from '@mui/styles';

export default makeStyles((theme)=>({
toolbar:{
    display:"flex",
    justifyContent:"space-evenly",
    width:'100%',
    height:'70px',
    // marginLeft:'240px',
    [theme.breakpoints.down('sm')]:{
        marginLeft:'0px',
       flexWrap:'wrap',
    }
},
menuButton:{
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]:{
        display:'none',

    }
}
}))