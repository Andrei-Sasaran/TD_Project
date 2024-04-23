import { Autocomplete, Button, Card, CardActions, CardContent, IconButton, TextField, } from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { debounce } from 'lodash';
import { BACKEND_API_URL } from "../../constants";


import { Clients } from "../../models/Client";
import { GlobalURL } from "../../main";
import { BookingDetails } from "../../models/BookingDetails";
import { Car } from "../../models/Car";

export const BookingsAdd = () => {
	const navigate = useNavigate();

	const [bookings, setBookings] = useState<BookingDetails>({
        startDate: "",
        returnDate: "",
        amount: 0,
        bookingStatus: "",
        drop_loc: "",
        pickup_loc: "",
        carId: 0,
        clientId: 0,
        idBooking: 0,
    });

	// State variables for input field errors
	const [startdError, setStartDError] = useState(false);
	const [returnDError, setReturnDError] = useState(false);
	const [amountError, setAmountError] = useState(false);
	const [carIdError, setCarIdError] = useState(false);
	const [clientIdError, setClientIdError] = useState(false);

	const addBooking = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		// Check for input field errors
		if (bookings.startDate === "") {
			setStartDError(true);
			return;
			// Return to prevent submission if there is an error
		}
		if (bookings.returnDate === "") {
			setReturnDError(true);
			return;
		}
		if (bookings.amount === 0) {
			setAmountError(true);
			return;
		}
		if (bookings.carId === 0) {
			setCarIdError(true);
			return;
		}
		if (bookings.clientId === 0) {
			setClientIdError(true);
			return;
		}
		try {
			await axios.post(`${BACKEND_API_URL}/bookings/add`, bookings);
			navigate("/bookings");
		} catch (error) {
			console.log(error);
		}
	};

	const [clients, setClients] = useState<Clients[]>([]);
    const [cars, setCars] = useState<Car[]>([]);

    
    const fetchCarsSuggestions = async (query: string) => {
      try {
        let url =`${BACKEND_API_URL}/cars/autocomplete?query=${query}`;
  
        const response = await fetch(url);
  
        const data = await response.json();
  
        setCars(data);
  
        console.log(data);
      } catch (error) {
        console.log("Error fetching suggestions:", error);
      }
    };
    const fetchClientSuggestions = async (query: string) => {
        try {
          let url = `${BACKEND_API_URL}/clients/autocomplete?query=${query}`;
    
          const response = await fetch(url);
    
          const data = await response.json();
    
          setClients(data);
    
          console.log(data);
        } catch (error) {
          console.log("Error fetching suggestions:", error);
        }
      };
  
    const debouncedFetchCarsSuggestions = useCallback(
      debounce(fetchCarsSuggestions, 500),
      []
    );
    const debouncedFetchClientsSuggestions = useCallback(
        debounce(fetchClientSuggestions, 500),
        []
      );
  
    const handleClientsInputChange = (event: any, value: any, reason: any) => {
      console.log("input", value, reason);
  
      if (reason == "input") {
        debouncedFetchClientsSuggestions(value);
      }
    };
    const handleCarsInputChange = (event: any, value: any, reason: any) => {
        console.log("input", value, reason);
    
        if (reason == "input") {
          debouncedFetchCarsSuggestions(value);
        }
      };

    useEffect(() => {
      return () => {
        debouncedFetchClientsSuggestions.cancel();
        debouncedFetchCarsSuggestions.cancel();
      };
    }, [debouncedFetchClientsSuggestions,debouncedFetchCarsSuggestions]);

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/bookings`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addBooking}>
						<TextField
							id="startDate"
							label="Start Date of car booking"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							error={startdError}
							helperText={startdError ? "Sart date cannot be empty" : ""}
							onChange={(event) => {
								setBookings({ ...bookings, startDate: event.target.value });
								setStartDError(false);
							}}
						/>
						<TextField
							id="returnDate"
							label="Return Date of car booking"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							error={returnDError}
							helperText={returnDError ? "Return date cannot be empty" : ""}
							onChange={(event) => {
								setBookings({ ...bookings, returnDate: event.target.value });
								setReturnDError(false);
							}}
						/>

                        <TextField
							id="amount"
							label="Amount of the booking "
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							error={amountError}
							helperText={amountError ? "Amount cannot be empty" : ""}
							onChange={(event) => {
								setBookings({ ...bookings, amount: parseInt(event.target.value) });
								setAmountError(false);
							}}
						/>

                        <TextField
							id="bookingStatus"
							label="Booking Status"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setBookings({ ...bookings, bookingStatus: event.target.value })}
						/>

                        <TextField
							id="drop_loc"
							label="Drop location"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setBookings({ ...bookings, drop_loc: event.target.value })}
						/>

						<TextField
							id="pickup_loc"
							label="Pickup location "
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setBookings({ ...bookings, pickup_loc: event.target.value })}
						/>
						<Autocomplete
								id="car"
								options={cars}
								
								getOptionLabel={(option) =>
								`${option.id}, ${option.nrkilometers},  ${option.brand}, ${option.model}, ${option.year_manufacture}`
								}
								renderInput={(params) => (
								<TextField {...params} label="Car Nr of kilometers" variant="outlined" />
								)}
								filterOptions={(options, date) =>
								options.filter((option) =>
									option.nrkilometers.toString().startsWith(date.inputValue)
								)
								}
								onInputChange={handleCarsInputChange}
								
								onChange={(event, value) => {
								if (value) {
									setBookings({ ...bookings, carId: value.id});
									setCarIdError(false);
								}
								}}
             			 />
                        {/* <TextField
							id="carId"
							label="Car Id "
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							error={carIdError}
							helperText={carIdError ? "CarID cannot be empty" : ""}
							onChange={(event) => {
								setBookings({ ...bookings, carId: parseInt(event.target.value) });
								setCarIdError(false);
							}}
						/> */}
						<div>
                			<br>
                			</br>
            			</div>

						<Autocomplete
							id="client"
							options={clients}
							getOptionLabel={(option) =>
							`${option.id}, ${option.fname}, ${option.lname}, ${option.email_address}`
							}
							renderInput={(params) => (
							<TextField {...params} label="Client email address" variant="outlined" />
							)}
							filterOptions={(options, state) =>
							options.filter((option) =>
								option.email_address.toLocaleLowerCase().includes(state.inputValue.toLocaleLowerCase())
							)
							}
							onInputChange={handleClientsInputChange}
							onChange={(event, value) => {
							if (value) {
								setBookings({ ...bookings, clientId: value.id});
							}
							}}
              		/>
                        {/* <TextField
							id="clientId"
							label="Client Id "
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							error={clientIdError}
							helperText={clientIdError ? "ClientID cannot be empty" : ""}
							onChange={(event) => {
								setBookings({ ...bookings, clientId: parseInt(event.target.value) });
								setClientIdError(false);
							}}
						/> */}
                        
						<Button type="submit">Add Booking</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};