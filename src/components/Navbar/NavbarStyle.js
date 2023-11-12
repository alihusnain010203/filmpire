import { makeStyles } from '@mui/styles';
const drawerWidth = 200;
export default makeStyles((theme)=>({
toolbar:{
    display:"flex",
    justifyContent:"space-evenly",
    width:'100%',
    height:'70px',
    marginLeft:'100px',
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
},
drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
drawerPaper:{
    width:drawerWidth,
    overflowY: 'auto', // Add this to enable vertical scrolling
    '&::-webkit-scrollbar': {
      width: '2px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main, // Customize the color of the scrollbar thumb
      borderRadius: '6px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: theme.palette.background.default, // Customize the color of the scrollbar track
    },
},
linkButton:{
    '&:hover':{
        color:'white !important',
    },
    textDecoration:'none',
}
}))