import { useEffect, useState } from "react"; 
import { Car } from "../../models/Car";

import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	CircularProgress,
	Container,
	IconButton,
	Tooltip,
  Button,
  Box
} from "@mui/material";
import { Link } from "react-router-dom";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { GlobalURL } from "../../main";
import { BACKEND_API_URL } from "../../constants";
import { Clients } from "../../models/Client";
import { Address } from "../../models/Address";
import { CarDTO } from "../../models/CarDTO";
import Pagination from "../../helpers/PaginationManager";


const PAGE_SIZE = 100;
export const CarsShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [car, setCars] = useState<CarDTO[]>([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const crt = (page - 1) * pageSize + 1;
  
  
    useEffect(() => {
      setLoading(true);

      const fetchRecLbl = () => {
        fetch(`${BACKEND_API_URL}/cars/countAll`)
        .then((response) => response.json())
        .then((count) => {
          fetch(`${BACKEND_API_URL}/cars/page/${page}/size/${pageSize}`)
          .then((response) => response.json())
          .then((data) => {
            setCars(data);
            setLoading(false);
          });
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
      };
      fetchRecLbl();
    }, [page, pageSize]);
  

    const sortCars = () => {
        const sortedCar = [...car].sort((a: CarDTO, b: CarDTO) => {
            if (a.nrkilometers < b.nrkilometers) {
                return -1;
            }
            if (a.nrkilometers > b.nrkilometers) {
                return 1;
            }
            return 0;
        })
        console.log(sortedCar);
        setCars(sortedCar);
    }
  
    return (
      <Container>
        <h1>All Cars</h1>
  
        {loading && <CircularProgress />}
        {!loading && car.length === 0 && <p>No cars found</p>}
        {!loading && (
          <div style={{display:'flex', alignItems:'center'}}>
            <IconButton component={Link} sx={{marginRight: 0 }} to={`/cars/add`}>
              <Tooltip title="Add a new car" arrow>
                <AddIcon color="primary" />
              </Tooltip>
            </IconButton>
          </div>
        )}

        {!loading && (
                <Button sx={{color:"black"}} onClick={sortCars} >
                    Sort cars by number of kilometers
                </Button>
            )}
         
  
        {!loading && car.length > 0 && (
          <>
                    <Pagination page={page} pageSize={pageSize} totalEntries={999990} setPage={setPage} setPageSize={setPageSize} entityName="clients" />

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                <TableCell>#</TableCell>IdCar
                  <TableCell align="right">Model</TableCell>
                  <TableCell align="center">Brand</TableCell>
                  <TableCell align="center">Color</TableCell>
                  <TableCell align="center">Year of manufacture</TableCell>
                  <TableCell align="center">Number of kilometers</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="right">Number bookings</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
              {car.map((cars:CarDTO, index) => (
                    <TableRow key={index}>
                      
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Link to={`/cars/${cars.id}/details`} title="View cars details">
                          {cars.id}
                        </Link>
                    </TableCell>
  
                    <TableCell align="right">{cars.model}</TableCell>
                    <TableCell align="center">{cars.brand}</TableCell>
                    <TableCell align="center">{cars.color}</TableCell>
                    <TableCell align="center">{cars.year_manufacture}</TableCell>
                    <TableCell align="center">{cars.nrkilometers}</TableCell>
                    <TableCell align="right">{cars.description}</TableCell>
                    <TableCell align="right">{cars.noBookings}</TableCell>
                    
                    <TableCell align="right">
                    <IconButton
                          component={Link}
                          sx={{ mr: 3 }}
                          to={`/cars/${cars.id}/details`}>
                          <Tooltip title="View cars details" arrow>
                            <ReadMoreIcon color="primary" />
                          </Tooltip>
                        </IconButton>
  
                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`/cars/${cars.id}/edit`}
                        title="Edit car details"
                      >
                        <EditIcon />
                      </IconButton>
  
                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`/cars/${cars.id}/delete`}
                        title="Delete car"
                      >
                        <DeleteForeverIcon sx={{ color: "red" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </>
        )}
        <Button style={{color:"whitesmoke"}} disabled={page === 1} onClick={() => setPage(page - 1)}>
              Previous Page
            </Button>
  
            <Button style={{color:"whitesmoke"}}
          disabled={car.length < pageSize}
          onClick={() => setPage(page + 1)}
          >
            Next Page
          </Button>
      </Container>
    );
  };