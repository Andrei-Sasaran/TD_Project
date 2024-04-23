import { useEffect, useState } from "react"; 

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
import { Clients } from "../../models/Client";
import { Address } from "../../models/Address";
import { BookingDetails } from "../../models/BookingDetails";

const PAGE_SIZE = 100;
export const BookingsShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [bookings, setBookings] = useState<BookingDetails[]>([]);
    const [pageSize, setPageSize] = useState(20);
    const [totalBookings, setTotalBookings] =useState(0)
    const [currentPage, setCurrentPage]=useState(0)
  
  
    useEffect(() => {
      setLoading(true);
  
      const fetchBookings = () => {
        
          fetch(`${BACKEND_API_URL}/bookings/paged?page=${currentPage}&size=${pageSize}`)
          .then((response) => response.json())
          .then((data) => {
            setTotalBookings(10000000);
            setBookings(data);
            setLoading(false);
          });
        
      };
      fetchBookings();
    }, [currentPage, pageSize]);
  
    
    const handlePreviousPage = () => {
      if(currentPage>0)
      {
        setCurrentPage(currentPage-1);
      }
    };
  
    const handleNextPage = () => {
      setCurrentPage(currentPage+1);
    };

    const sortBookings = () => {
        const sortedBooking = [...bookings].sort((a: BookingDetails, b: BookingDetails) => {
            if (a.amount < b.amount) {
                return -1;
            }
            if (a.amount > b.amount) {
                return 1;
            }
            return 0;
        })
        console.log(sortedBooking);
        setBookings(sortedBooking);
    }
  
    return (
      <Container>
        <h1>All Booking details</h1>
  
        {loading && <CircularProgress />}
        {!loading && bookings.length === 0 && <p>No booking details found</p>}
        {!loading && (
          <div style={{display:'flex', alignItems:'center'}}>
            <IconButton component={Link} sx={{marginRight: 0 }} to={`/bookings/add`}>
              <Tooltip title="Add a new booking detail" arrow>
                <AddIcon color="primary" />
              </Tooltip>
            </IconButton>
          </div>
        )}

        {!loading && (
                <Button sx={{color:"black"}} onClick={sortBookings} >
                    Sort bookings by price
                </Button>
            )}
  
        {!loading && (
              <div style ={{display: "flex", alignItems:"center"}}>
                 
                  <Button
                    sx={{color:"black"}}
                    disabled={currentPage===0}
                    onClick={handlePreviousPage}>
                      Previous Page
                  </Button>
                  <Button
                   sx={{color:"black"}} onClick={handleNextPage}>
                    Next Page
                   </Button>
  
                   <Box mx={2} display="flex" alignItems="center">
                    Page {currentPage+1} of {Math.ceil(totalBookings/pageSize)}
                   </Box>
              </div>
              )}
        
  
        {!loading && bookings.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                <TableCell>#</TableCell>IdBooking
                  <TableCell align="right">Start Date</TableCell>
                  <TableCell align="center">Return Date</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">Booking Status</TableCell>
                  <TableCell align="center">Drop Location</TableCell>
                  <TableCell align="center">Pickup Location</TableCell>
                  <TableCell align="right">Client Id</TableCell>
                  <TableCell align="right">Car Id</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {bookings.map((booking:BookingDetails, index) => (
                    <TableRow key={index}>
                      
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Link to={`/bookings/${booking.idBooking}/details`} title="View booking details">
                          {booking.idBooking}
                        </Link>
                    </TableCell>
  
                    <TableCell align="right">{booking.startDate}</TableCell>
                    <TableCell align="right">{booking.returnDate}</TableCell>
                    <TableCell align="right">{booking.amount}</TableCell>
                    <TableCell align="right">{booking.bookingStatus}</TableCell>
                    <TableCell align="right">{booking.drop_loc}</TableCell>
                    <TableCell align="right">{booking.pickup_loc}</TableCell>
                    <TableCell align="right">{booking.clientId}</TableCell>
                    <TableCell align="right">{booking.carId}</TableCell>

                    <TableCell align="right">
                    <IconButton
                          component={Link}
                          sx={{ mr: 3 }}
                          to={`/bookings/${booking.idBooking}/details`}>
                          <Tooltip title="View booking details" arrow>
                            <ReadMoreIcon color="primary" />
                          </Tooltip>
                        </IconButton>
  
                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`/bookings/${booking.idBooking}/edit`}
                        title="Edit booking details"
                      >
                        <EditIcon />
                      </IconButton>
  
                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`/bookings/${booking.idBooking}/delete`}
                        title="Delete booking"
                      >
                        <DeleteForeverIcon sx={{ color: "red" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Button
            sx={{color:"black"}}
            disabled={currentPage===0}
            onClick={handlePreviousPage}>
              Previous Page
            </Button>
  
          <Button sx={{color:"black"}} onClick={handleNextPage}>
            Next Page
          </Button>
      </Container>
    );
  };