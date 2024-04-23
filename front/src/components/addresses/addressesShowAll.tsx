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
import { AddressDTO } from "../../models/AddressDTO";

const PAGE_SIZE = 100;
export const AddressesShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [address, setAddresses] = useState<AddressDTO[]>([]);
    const [pageSize, setPageSize] = useState(10);
    const [totalAddresses, setTotalAddresses] =useState(0)
    const [currentPage, setCurrentPage]=useState(0)
  
  
    useEffect(() => {
      setLoading(true);
  
      const fetchAddresses = () => {
        fetch(`${BACKEND_API_URL}/addresses/paged?page=${currentPage}&size=${pageSize}`)
          .then((response) => response.json())
          .then((data) => {
            setTotalAddresses(1000000);
            setAddresses(data);
            setLoading(false);
          });
        
      };
      fetchAddresses();
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

    const sortAddresses = () => {
        const sortedAddr = [...address].sort((a: AddressDTO, b: AddressDTO) => {
            if (a.city < b.city) {
                return -1;
            }
            if (a.city > b.city) {
                return 1;
            }
            return 0;
        })
        console.log(sortedAddr);
        setAddresses(sortedAddr);
    }
  
    return (
      <Container>
        <h1>All Addresses</h1>
  
        {loading && <CircularProgress />}
        {!loading && address.length === 0 && <p>No addresses found</p>}
        {!loading && (
          <div style={{display:'flex', alignItems:'center'}}>
            <IconButton component={Link} sx={{marginRight: 0 }} to={`/addresses/add`}>
              <Tooltip title="Add a new address" arrow>
                <AddIcon color="primary" />
              </Tooltip>
            </IconButton>
          </div>
        )}

        {!loading && (
                <Button sx={{color:"black"}} onClick={sortAddresses} >
                    Sort address by city
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
                    Page {currentPage+1} of {Math.ceil(totalAddresses/pageSize)}
                   </Box>
              </div>
              )}
        
  
        {!loading && address.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                <TableCell>#</TableCell>IdAddress
                  <TableCell align="right">Country</TableCell>
                  <TableCell align="center">County</TableCell>
                  <TableCell align="right">City</TableCell>
                  <TableCell align="right">Additional Info</TableCell>
                  <TableCell align="right">Nr of clients</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
              {address.map((address:AddressDTO, index) => (
                    <TableRow key={index}>
                      
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Link to={`/addresses/${address.address_id}/details`} title="View address details">
                          {address.address_id}
                        </Link>
                    </TableCell>
  
                    <TableCell align="right">{address.country}</TableCell>
                    <TableCell align="right">{address.county}</TableCell>
                    <TableCell align="right">{address.city}</TableCell>
                    <TableCell align="right">{address.additional_info}</TableCell>
                    <TableCell align="right">{address.noClients}</TableCell>

                    
                    <TableCell align="right">
                    <IconButton
                          component={Link}
                          sx={{ mr: 3 }}
                          to={`/addresses/${address.address_id}/details`}>
                          <Tooltip title="View address details" arrow>
                            <ReadMoreIcon color="primary" />
                          </Tooltip>
                        </IconButton>
  
                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`/addresses/${address.address_id}/edit`}
                        title="Edit address details"
                      >
                        <EditIcon />
                      </IconButton>
  
                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`/addresses/${address.address_id}/delete`}
                        title="Delete address"
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