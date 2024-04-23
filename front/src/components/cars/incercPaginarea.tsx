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
  Stack,
  Pagination,
  Box
} from "@mui/material";
import { Link } from "react-router-dom";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { GlobalURL } from "../../main";
import { BACKEND_API_URL } from "../../constants";

const PAGE_SIZE = 50;

export const CarsShowAll = () => {
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [page, setPage] = useState(1);
  const [totalCars, setTotalCars] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_API_URL}/cars/paged?page=${page - 1}&size=${PAGE_SIZE}`)
      .then((res) => res.json())
      .then((data) => {
        setCars(data.content);
        setTotalCars(data.totalElements);
        setLoading(false);
      });
  }, [page]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const sortCars = () => {
    const sortedCars = [...cars].sort((a: Car, b: Car) => {
        if (a.nrkilometers < b.nrkilometers) {
            return -1;
        }
        if (a.nrkilometers > b.nrkilometers) {
            return 1;
        }
        return 0;
    })
    console.log(sortedCars);
    setCars(sortedCars);
};

  return (
    <Container>
      <h1>All cars</h1>

      {loading && <CircularProgress />}
      {!loading && cars.length === 0 && <p>No cars found</p>}
      {!loading && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton component={Link} sx={{ mr: 3 }} to={`/cars/add`}>
            <Tooltip title="Add a new car" arrow>
              <AddIcon color="primary" />
            </Tooltip>
          </IconButton>
        </div>
      )}

      {!loading && (
        <Button sx={{ color: 'black' }} onClick={sortCars}>
          Sort cars
        </Button>
      )}

      {!loading && cars.length > 0 && (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>IdCar
                  <TableCell align="left">Model</TableCell>
                  <TableCell align="right">Brand</TableCell>
                  <TableCell align="right">Color</TableCell>
                  <TableCell align="center">Year of manufacture</TableCell>
                  <TableCell align="center">Number kilometers</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cars.map((car: Car, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {(page - 1) * PAGE_SIZE + index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link
                        to={`/cars/${car.id}/details`}
                        title="View car details"
                      >
                        {car.id}
                      </Link>
                    </TableCell>
                    <TableCell align="left">{car.model}</TableCell>
                    <TableCell align="right">{car.brand}</TableCell>
                    <TableCell align="right">{car.color}</TableCell>
                    <TableCell align="center">
                      {car.year_manufacture}
                    </TableCell>
                    <TableCell align="center">{car.nrkilometers}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`/cars/${car.id}/details`}
                      >
                        <Tooltip title="View car details" arrow>
                          <ReadMoreIcon color="primary" />
                        </Tooltip>
                      </IconButton>

                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`/cars/${car.id}/edit`}
                        title="Edit car details"
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`/cars/${car.id}/delete`}
                        title="Delete car"
                      >
                        <DeleteForeverIcon sx={{ color: 'red' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
            <Pagination
              count={Math.ceil(totalCars / PAGE_SIZE)}
              page={page}
              onChange={handlePageChange}
              color="primary"
              variant="outlined"
              shape="rounded"
            />
          </Box>
        </>
      )}
    </Container>
  );
}