import { React, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton, OutlinedInput } from '@mui/material';
import { useLocalStorage } from 'usehooks-ts';

const ItemCard = (props) => {
  const [qty, setQty] = useState(1);
  const [cartItems, setCartItems] = useLocalStorage('cartItems', []);
  

  const addQty = () => {
    setQty(qty + 1);
  }
  
  const decreaseQty = () => {
    qty <= 1 ? setQty(1) : setQty(qty - 1);
  }
  
  const addToCart = () => {
    const index = cartItems.findIndex((cartItem) => cartItem.id === props.id);
    let subTotal = props.price * qty;

    if (index === -1) {
      const newCartItem = {
        id: props.id,
        image: props.image,
        name: props.name,
        quantity: qty,
        price: props.price,
        subtotal: subTotal,
      };

      setCartItems([...cartItems, newCartItem]);
    }
    else {
      const newCartItems = [...cartItems];
      newCartItems[index].quantity += qty;
      newCartItems[index].subtotal = newCartItems[index].quantity * newCartItems[index].price;

      setCartItems(newCartItems);
    }
  }

  return (
    <Card sx={{ width: 250, m:1, boxShadow: '1px 2px 9px #808080'}}>
    <CardMedia
      sx={{ height: 200 }}
      image={props.image}
      title={props.name}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {props.name}
      </Typography>
      <Typography variant="h6" fontWeight="bold">
        ₱{props.price}
      </Typography>
      <Typography variant="body2" fontWeight="bold" color="#194e48">
        {props.category}
      </Typography>
    </CardContent>
    <CardActions>
      <Box>
        <IconButton size="medium" style={{height: '32px', width: '32px', color: "#194E48"}} onClick={decreaseQty}>
          <RemoveIcon />
        </IconButton>
      </Box>
      <Box>
          <OutlinedInput style={{height: '32px', width: '50px'}} type="number" value={qty} readOnly/>
      </Box>
      <Box>
        <IconButton size="medium" style={{height: '32px', width: '32px', color: "#194E48"}} onClick={addQty}>
          <AddIcon/>
        </IconButton>
      </Box>
      <Box textAlign="end" width={125}>
        <Button size="medium" variant="contained" startIcon={<ShoppingCartOutlinedIcon />} onClick={addToCart} style={{backgroundColor: '#194E48'}}>Add</Button>
      </Box>
    </CardActions>
  </Card>
  )
}

export {ItemCard};