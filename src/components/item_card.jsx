import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const ItemCard = (props) => {
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
      <Typography variant="h6" fontWeight="bold" >
        ₱{props.price}
      </Typography>
      <Typography variant="body2" fontWeight="bold" color="#194e48">
        {props.category}
      </Typography>
    </CardContent>
    <CardActions>
    <Button size="medium" variant="contained" startIcon={<ShoppingCartOutlinedIcon />} style={{backgroundColor: '#194E48'}}>Add</Button>
    </CardActions>
  </Card>
  )
}

export default ItemCard