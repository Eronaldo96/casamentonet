import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { Drawer} from "@mui/material";
import "./styles.scss";
import logo from "../../../app/assets/images/rings.png";
// import Loading from "../Loading"; // Importe o componente de loading
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Divider from "@mui/material/Divider";

export default function NavBar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isHidden, setIsHidden] = useState(false); // Estado para controlar visibilidade da navbar

  // const [scrolling, setScrolling] = useState(false);
  // const [opacity, setOpacity] = useState(1); // Controla a opacidade
  // const [isLoading, setIsLoading] = useState(true); // Estado de carregamento

  const menuItems = [
    { to: "/Home", label: "Home", icon: <HomeIcon /> },
    { to: "/Local", label: "Local", icon: <LocationOnIcon /> },
    { to: "/ListaPresentes", label: "Lista de Presentes", icon: <ListAltIcon /> },
    { to: "/ConfirmaPresenca", label: "Confirmar Presença", icon: <CheckCircleIcon /> },
  ];

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Se o scroll for maior que 50px, aplica a classe "hidden"
      if (window.scrollY > 5) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulando um carregamento (substitua isso com sua lógica real de carregamento)
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false); // Depois de 3 segundos, define o carregamento como falso
  //   }, 3000); // Ajuste o tempo conforme necessário
  // }, []);

  return (
    <div className="mainHeader">
      <AppBar sx={{ boxShadow: 'none' }} position="fixed" 
      className={`navBarStyle ${isHidden ? "hidden" : ""}`}
      style={{ transition: "background-color 0.3s ease, border-bottom 0.3s ease" }} 
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">
              <img
                style={{ width: "2em", color: "white" }}
                src={logo}
                alt="logo"
              />
            </Link>
          </Typography>

          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={handleDrawerClose}
        className="drawerStyle"
      >
        <MenuList>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              component={Link}
              to={item.to}
              onClick={handleDrawerClose}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <Typography variant="body1">{item.label}</Typography>
            </MenuItem>
          ))}
          <Divider />
        </MenuList>
      </Drawer>
    </div>
  );
}
