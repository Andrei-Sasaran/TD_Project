import { useEffect, useState } from "react"; 
import { CarStatistics } from "../../models/CarsStatistics";

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
} from "@mui/material";
import { Link } from "react-router-dom";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { GlobalURL } from "../../main";
import { BACKEND_API_URL } from "../../constants";
import { ClientStatistics } from "../../models/ClientStatistics";
import Pagination from "../../helpers/PaginationManager";


export const ClientsStatistics = () => {
    const [loading, setLoading]=useState(false);
    const [client, setClients] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const crt = (page - 1) * pageSize + 1;
  
    useEffect(() =>{   
      fetch(`${BACKEND_API_URL}/clients/statistics`)
          .then((res) => res.json())
          .then((data) => {
                setClients(data),
                setLoading(false);
                      
                  });
      }, [page, pageSize]);  

      return (
        <Container>
          <h1>Statistics</h1>
    
          {loading && <CircularProgress />}
          {!loading && client.length === 0 && <p>No clients found</p>}
          {/* {!loading && (
            <div style={{display:'flex', alignItems:'center'}}>
                    <IconButton component={Link} sx={{mr: 3 }} to={`/cars/add`}>
              <Tooltip title="Add a new car" arrow>
                <AddIcon color="primary" />
              </Tooltip>
            </IconButton>
                    </div>
          )} */}
          {!loading && client.length > 0 && (
            <>
            <Pagination page={page} pageSize={pageSize} totalEntries={999990} setPage={setPage} setPageSize={setPageSize} entityName="clients" />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell align="left">Phone Number</TableCell>
                    <TableCell align="right">Email Address</TableCell>
                    <TableCell align="right">Date Of Birth</TableCell>
                    <TableCell align="center">Average Car Nr Kilometers</TableCell>
                    <TableCell align="center">First Name</TableCell>
                    <TableCell align = "right">Last Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {client.map((client:ClientStatistics, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                        <TableCell align="left">{client.phoneNR}</TableCell>
                        <TableCell align="right">{client.email_address}</TableCell>
                        <TableCell align="right">{client.dateOfBirth}</TableCell>
                        <TableCell align="center">{client.avgCarNrKilometers}</TableCell>
                        <TableCell align="center">{client.fname}</TableCell>
                        <TableCell align = "right">{client.lname}</TableCell>

                      {/* <TableCell align="right">
                        <IconButton
                          component={Link}
                          sx={{ mr: 3 }}
                          to={`/cars/${car.id}/details`}>
                          <Tooltip title="View car details" arrow>
                            <ReadMoreIcon color="primary" />
                          </Tooltip>
                        </IconButton>
    
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </>
          )}
        </Container>
      );
  }
  