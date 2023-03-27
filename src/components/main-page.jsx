import {React, useState, useEffect} from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Box, Button } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import {ItemCard} from './item_card';
import items from '../data'
import CartItemCard from './cart_item_card';

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
      }),
    }),
  );

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'center',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function MainPage() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    setCartItems(storedCartItems);
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = items.filter((item) => 
   item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
   item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const checkout = () => {
    if(cartItems.length > 0){
      localStorage.setItem('cartItems', JSON.stringify([]));
      alert("Items checked out successfully!"); 
      window.location.href = window.location.href;
    }
    else{
      alert("No items to be checked out!")
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open} style={{backgroundColor: '#194E48', color: '#FFFFFF'}}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            RVB
          </Typography>
          <Search onChange={handleSearchInputChange}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <ShoppingCartOutlinedIcon style={{fontSize: '32px'}}/>
          </IconButton>
        </Toolbar>
      </AppBar>
    
      <Main open={open}>
        <DrawerHeader />
        <Box component="span" sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
          {
            filteredItems.map((item) => {
              return(
                <ItemCard key={item.id} id={item.id} image={item.image} name={item.name} quantity={item.quantity} price={item.price.toFixed(2)} category={item.category}/>
              )
            })
          }
        </Box>
      </Main>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <Typography variant="h6" fontWeight="bold" noWrap sx={{ flexGrow: 1 }} component="div">
            Cart
          </Typography>
        </DrawerHeader>
        <Divider />
          <List sx={{height: '100vh', overflowY: 'scroll'}}>
          {
            cartItems.map((cartItem) => {
              return(
                <CartItemCard key={cartItem.id} id={cartItem.id} image={cartItem.image} name={cartItem.name} price={cartItem.price} quantity={cartItem.quantity} subTotal={cartItem.subtotal.toFixed(2)}/>
              )
            })
          }
          </List>
        <Divider />
          <Button variant="contained" sx={{m:2, backgroundColor: '#194E48',  '&:hover': {backgroundColor: '#98BA7D'}}} onClick={checkout}>Checkout</Button>
      </Drawer>
    </Box>
  );
}