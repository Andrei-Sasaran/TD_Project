import {
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    IconButton,
    TextField,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  import { Link, useNavigate, useParams } from "react-router-dom";
  import ArrowBackIcon from "@mui/icons-material/ArrowBack";
  import axios from "axios";
  import { GlobalURL } from "../../main";
  import { BACKEND_API_URL } from "../../constants";
  
  export const CarUpdate = () => {
    const navigate = useNavigate();
  
    const { id } = useParams();
    const [car, setCars] = useState({
      model: "",
      brand: "",
      color: "",
      year_manufacture: 0,
      nrkilometers: 0,
    });
  
    useEffect(() => {
      const fetchCarUpdate = async () => {
        const response = await fetch(`${BACKEND_API_URL}/car/${id}/edit`);
        //const response = await fetch(`../../api/car/${busRouteId}`);
        const car = await response.json();
        setCars(car);
        console.log(car);
      };
      fetchCarUpdate();
    }, [id]);
  
    const updateBusRoute = async (event: { preventDefault: () => void }) => {
      event.preventDefault();
      try {
        await axios.put(`${BACKEND_API_URL}/cars/${id}/edit`, car);
        //await axios.put(`../../api/car/${busRouteId}`, busroute);
        //navigate(`/car/${busRouteId}/`);
        navigate("/cars");
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <Container>
        <Card>
          <CardContent>
            <IconButton
              component={Link}
              sx={{ mr: 3 }}
              to={`/cars`}
            >
              <ArrowBackIcon />
            </IconButton>{" "}
            <form onSubmit={updateBusRoute}>
              <TextField
                id="model"
                label="Model"
                variant="standard"
                defaultValue={car.model}
                fullWidth
                sx={{ mb: 2 }}
                onChange={(event) =>
                  setCars({ ...car, model: event.target.value })
                }
              />
              <TextField
                id="brand"
                label="Brand"
                variant="standard"
                defaultValue={car.brand}
                fullWidth
                sx={{ mb: 2 }}
                onChange={(event) =>
                  setCars({ ...car, brand: event.target.value })
                }
              />
  
              <TextField
                id="color"
                label="Color"
                variant="standard"
                defaultValue={car.color}
                fullWidth
                sx={{ mb: 2 }}
                onChange={(event) =>
                  setCars({ ...car, color: event.target.value })
                }
                value={car.color}
  
              />
  
              <TextField
                id="year_manufacture"
                label="Year of manufacture"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                onChange={(event) =>
                  setCars({ ...car, year_manufacture: parseInt(event.target.value) })
                }
                value={car.year_manufacture}
  
              />
  
              <TextField
                id="nrkilometers"
                label="KM"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                onChange={(event) =>
                  setCars({ ...car, nrkilometers: parseInt(event.target.value) })
                }
                value={car.nrkilometers}
  
              />
  
              <Button type="submit">Update Car</Button>
            </form>
          </CardContent>
  
          <CardActions>
           
          </CardActions>
  
        </Card>
      </Container>
    );
  };