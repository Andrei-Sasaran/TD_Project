import { Card, CardActions, CardContent, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BACKEND_API_URL } from "../../constants";
import ReadMoreIcon from "@mui/icons-material/ReadMore";



import { Car } from "../../models/Car";
import { GlobalURL } from "../../main";
import { BookingDetails } from "../../models/BookingDetails";

export const CarDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [car, setCars] = useState<Car>();
	const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCar = async () => {
          try {
            
            const response = await fetch(`${BACKEND_API_URL}/cars/${id}/details`);
            const data = await response.json();
            setCars(data);
            console.log(`Car id: ${data.id}`);
            
          } catch (error) {
            console.error(`Failed to fetch car with ID ${id}:`, error);
          }
        };
        fetchCar();
      }, [id]);

      return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/cars`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>Car Details</h1>
					<p>Car Model: {car?.model}</p>
					<p>Car Brand: {car?.brand}</p>
					<p>Car Color : {car?.color}</p>
                    <p>Car Year of manufacture : {car?.year_manufacture}</p>
                    <p>Car Nr Kilometers : {car?.nrkilometers}</p>
					<p>Car description : {car?.description}</p>
				</CardContent>
				<p>The bookings assigned</p>
            {!loading &&!car?.bookingDetailsSet&& <p> No bookings </p>}
            {!loading&& car?.bookingDetailsSet &&(
                
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
						<TableRow>
						<TableCell>#</TableCell>
                      <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Details</TableCell>
				      <TableCell align="right">Start Date</TableCell>
                  <TableCell align="center">Return Date</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">Booking Status</TableCell>
                  <TableCell align="center">Drop Location</TableCell>
                  <TableCell align="center">Pickup Location</TableCell>

                      </TableRow>
						</TableHead>
						<TableBody>
                            
							{car?.bookingDetailsSet.map((bookings: BookingDetails, index) => (
								<TableRow key={index}>
									<TableCell component="th" scope="row">
										{ index + 1}
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to={`/bookings/${bookings.idBooking}/details`} title="View booking details">
											{bookings.startDate}
										</Link>
									</TableCell>
									
									<TableCell align="right">{bookings.startDate}</TableCell>
                    <TableCell align="right">{bookings.returnDate}</TableCell>
                    <TableCell align="right">{bookings.amount}</TableCell>
                    <TableCell align="right">{bookings.bookingStatus}</TableCell>
                    <TableCell align="right">{bookings.drop_loc}</TableCell>
                    <TableCell align="right">{bookings.pickup_loc}</TableCell>
									<TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/bookings/${bookings.idBooking}/details`}>
											<Tooltip title="View booking details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/bookings/${bookings.idBooking}/edit`} title="Edit booking details">
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/bookings/${bookings.idBooking}/delete`} title="Delete booking">
											<DeleteForeverIcon sx={{ color: "red" }} />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>

            )}
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/cars/${id}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/cars/${id}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};