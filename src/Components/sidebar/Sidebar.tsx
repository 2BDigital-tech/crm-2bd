import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from "@mui/material/Button";
import logoIcon from "../../../src/images/logoIcon.png";
import './Sidebar.css'
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const drawerWidth = 290;

const text_color = {
  color: 'white'
}

const styles = theme => ({
  tr: {
    background: "#f1f1f1",
    '&:hover': {
       background: "#f00",
    },
  },

});


export default function ClippedDrawer() {
  return (
    <Box sx={{ display: { md :"flex" , xl:'flex', sm:"none"}}} >
      <CssBaseline />
      <Drawer
        variant="permanent"

        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
        PaperProps={{
          sx: {
          borderRadius: "45px",
          margin:"1%",
          backgroundColor: "#2D2D2D",
          }
        }}
      >
        <img className="sidelogo" alt="Crm" src={logoIcon} width="200px"  />

        <Toolbar />

        <Box sx={{ overflow: 'auto' }}
         >
        <List sx={{ padding: '12px'}}>
        <ListItem disablePadding>
                   
                  <Button
                  startIcon={<DashboardIcon />}
                  fullWidth
                  variant="contained"
                  style={{
                    textTransform: "capitalize",
                    borderRadius: 35,
                    backgroundColor: "#D00062",
                    fontSize: "18px",
                  }}
                  sx={{
                    border: 3,
                    borderColor: "#202020",
                    boxShadow: 10,
                    width: "100%",
                 
                    "& .MuiButton-startIcon": {
                        position: "absolute",
                        left: "2rem",
                    },
                  }}
                >
                  Dashboard
                </Button>
              </ListItem>

              <ListItem >
                <ListItemButton>
                  <ListItemIcon>
                    <PersonOutlineIcon style={text_color} />
                  </ListItemIcon>
                  <ListItemText primary={"Clients"}  style={text_color} />
                </ListItemButton>
              </ListItem>

              <ListItem >
                <ListItemButton>
                  <ListItemIcon>
                    <FolderOpenIcon style={text_color} />
                  </ListItemIcon>
                  <ListItemText primary={"Dossiers"}  style={text_color} />
                </ListItemButton>
              </ListItem>

              <ListItem >
                <ListItemButton>
                  <ListItemIcon style={text_color}>
                    <BarChartIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Données"}  style={text_color} />
                </ListItemButton>
              </ListItem>
              <ListItem >
                <ListItemButton>
                  <ListItemIcon style={text_color} >
                    <FormatListBulletedIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Catégories"}  style={text_color} />
                </ListItemButton>
              </ListItem>
              <ListItem >
                <ListItemButton>
                  <ListItemIcon>
                    <SettingsIcon  style={text_color}/>
                  </ListItemIcon>
                  <ListItemText primary={"Réglages"}  style={text_color} />
                </ListItemButton>
              </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}