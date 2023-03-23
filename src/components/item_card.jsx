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

let cartItems = [];

const ItemCard = (props) => {
  const [qty, setQty] = useState(1);

  function addQty(){
    setQty(qty + 1);
  }
  
  function decreaseQty(){
  qty <= 1 ? setQty(1) : setQty(qty - 1);
  }
  
  function addToCart(){
  let subTotal = props.price * qty;
  let counter = 0;
  
  cartItems.push([counter, props.image, props.name, props.price, qty, subTotal]);

  setQty(1)
  counter++;
  }

  return (
    <Card sx={{ width: 250,}}>
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
        <Button size="medium" variant="contained" startIcon={<ShoppingCartOutlinedIcon />} style={{backgroundColor: '#194E48'}} onClick={addToCart}>Add</Button>
      </Box>
    </CardActions>
  </Card>
  )
}

export {ItemCard, cartItems};