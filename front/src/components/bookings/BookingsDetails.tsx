import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BACKEND_API_URL } from "../../constants";


import { GlobalURL } from "../../main";
import { BookingDetails } from "../../models/BookingDetails";

export const BookingsDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [bookings, setBookings] = useState<BookingDetails>();

    useEffect(() => {
        const fetchBooking = async () => {
          try {
            
            const response = await fetch(`${BACKEND_API_URL}/bookings/${id}/details`);
            const data = await response.json();
            setBookings(data);
            console.log(`Booking id: ${data.idBooking}`);
          } catch (error) {
            console.error(`Failed to fetch booking with ID ${id}:`, error);
          }
        };
        fetchBooking();
      }, [id]);

      return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/bookings`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>Booking Details</h1>
					<p>Booking start date: {bookings?.startDate}</p>
					<p>Booking return date: {bookings?.returnDate}</p>
					<p>Booking price : {bookings?.amount}</p>
                    <p>Booking status : {bookings?.bookingStatus}</p>
                    <p>Booking drop location : {bookings?.drop_loc}</p>
                    <p>Booking pickup location : {bookings?.pickup_loc}</p>
                    {/* <p>Booking's client id : {bookings?.id}</p> */}
                    {/* <p>Booking's car id : {bookings?.carId}</p> */}

					{bookings?.client &&bookings.car &&(
					<><p>Client ID : {bookings?.client?.idClient}</p>
					<p>Client First Name : {bookings?.client?.fname}</p>
					<p>Client Last Name : {bookings?.client?.lname}</p>
					<p>Client Phone Nr : {bookings?.client?.phoneNR}</p>
					<p>Client Email addr : {bookings?.client?.email_address}</p>
					<p>Client Date of Birth:{bookings?.client?.dateOfBirth}</p>
					<p>Car ID : {bookings?.car?.id}</p>
					<p>Car Brand:{bookings?.car?.brand}</p>
					<p>Car Model:{bookings?.car?.model}</p>
					<p>Car Color:{bookings?.car?.color}</p>
					<p>Car Year of manufacture:{bookings?.car?.year_manufacture}</p>
					<p>Car Nr of kilometers:{bookings?.car.nrkilometers}</p></>)}
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/bookings/${id}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/bookings/${id}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};