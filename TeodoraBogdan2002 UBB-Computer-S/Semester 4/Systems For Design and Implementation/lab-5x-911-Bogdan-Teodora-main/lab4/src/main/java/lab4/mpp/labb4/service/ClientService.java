package lab4.mpp.labb4.service;

import lab4.mpp.labb4.app.ClientNotFoundException;
import lab4.mpp.labb4.domain.Address.Address;
import lab4.mpp.labb4.domain.BookingDetails.BookingDetails;
import lab4.mpp.labb4.domain.Client.Client;
import lab4.mpp.labb4.domain.Client.ClientDTO;
import lab4.mpp.labb4.domain.Client.ClientDTOWithCarsIds;
import lab4.mpp.labb4.domain.Client.ClientsDTOStatisticsCars;
import lab4.mpp.labb4.repo.AddressRepository;
import lab4.mpp.labb4.repo.BookingRepository;
import lab4.mpp.labb4.repo.ClientRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;


@Service
public
class ClientService {

    private final ClientRepository repository;
    private final BookingRepository bookingRepo;
    private final AddressRepository addrRepo;

    ClientService(ClientRepository repository, BookingRepository bookingRepo, AddressRepository addrRepo) {
        this.repository = repository;
        this.bookingRepo = bookingRepo;
        this.addrRepo = addrRepo;
    }

    // Aggregate root
    // tag::get-aggregate-root[]

//    List<Client> all() {
//        return repository.findAll();
//    }

    // I use this method for retuning all clients, NOT PAGED
    public List<ClientDTO> all() {
        ModelMapper modelMapper = new ModelMapper();
        List<Client> clients = repository.findAll();

        modelMapper.typeMap(Client.class,ClientDTO.class).addMapping(client -> client.getAddress().getAddress_id(),ClientDTO::setAddressID);
        return clients.stream().map(client -> modelMapper.map(client,ClientDTO.class)).collect(Collectors.toList());
    }

    // I use this method for retuning all clients, PAGED
    public List<Client> allClientsPaged(PageRequest pr) {
        ModelMapper modelMapper = new ModelMapper();
        Sort sort = Sort.by("idClient").descending(); // Add this line to sort clients by ID in ascending order
//        Page<Client> clients = repository.findAll(pr.withSort(sort)); // Add sort parameter to findAll method call
//        modelMapper.typeMap(Client.class,ClientDTO.class)
//        .addMapping(client -> client.getAddress().getAddress_id(),ClientDTO::setAddressID);
//        List<ClientDTO> clientsDTOs = clients.stream()
//                .map(client -> {
//                    ClientDTO clientDTO = modelMapper.map(client, ClientDTO.class);
//                    clientDTO.setNoBookings(repository.countBookingsByClientsId(client.getId()));
//                    return clientDTO;
//                })
//                .collect(Collectors.toList());
//        return clientsDTOs;
        return repository.findAll(pr.withSort(sort)).stream().toList();
    }

    public Client newClient(Client newClient, Long addressId) {
//        return repository.save(newClient);
        Address address=addrRepo.findById(addressId).get();
        newClient.setAddress(address);
        //newAdoption.getAdoptionCustomers().isEmpty();
        newClient=repository.save(newClient);
        return newClient;
    }

    public Client addClient( ClientDTO newClient) {
        Address address=addrRepo.findById(newClient.getAddressID()).get();
        ModelMapper modelMapper=new ModelMapper();
        TypeMap<ClientDTO,Client> typeMap=modelMapper.createTypeMap(ClientDTO.class,Client.class);
        Client client=modelMapper.map(newClient,Client.class);
        client.setAddress(address);
        return repository.save(client);
    }

    public ClientDTOWithCarsIds one(Long id){
        if (repository.findById(id).isEmpty())
            throw new ClientNotFoundException(id);

        Client client=repository.findById(id).get();
        ClientDTOWithCarsIds clientDTOWithCarIds=new ClientDTOWithCarsIds();

        List<Long> carsIds=new ArrayList<>();
        List<BookingDetails> bookingDetails=bookingRepo.findAll();
        for(BookingDetails ac:bookingDetails)
            if(Objects.equals(ac.getClient().getId(), client.getId()))
                carsIds.add(ac.getCar().getId());
        clientDTOWithCarIds.setCarsIds(carsIds);
        clientDTOWithCarIds.setClient(client);
        clientDTOWithCarIds.setAddressId(client.getAddress().getAddress_id());

        return  clientDTOWithCarIds;
    }

    public ClientDTO oneClient(String id){
        Long clientId = Long.parseLong(id);
        if (repository.findById(clientId).isEmpty())
            throw new ClientNotFoundException(clientId);

        Client client=repository.findById(clientId).get();
        ClientDTO clientDTO=new ClientDTO();
        clientDTO.setAddressID(client.getAddress().getAddress_id());
        clientDTO.setIdClient(client.getId());
        clientDTO.setEmail_address(client.getEmail_address());
        clientDTO.setPhoneNR(client.getPhoneNR());
        clientDTO.setDateOfBirth(client.getDateOfBirth());
        clientDTO.setFName(client.getFName());
        clientDTO.setLName(client.getLName());

        return  clientDTO;
    }

    public Client replaceClient( Client newClient, Long id) {

        return repository.findById(id)
                .map(client -> {
                    client.setFName(newClient.getFName());
                    client.setLName(newClient.getLName());
                    client.setPhoneNR(newClient.getPhoneNR());
                    client.setEmail_address(newClient.getEmail_address());
                    client.setDateOfBirth(newClient.getDateOfBirth());
                    return repository.save(client);
                })
                .orElseGet(() -> {
                    newClient.setId(id);
                    return repository.save(newClient);
                });
    }

    public void deleteClient(Long id) {
        repository.deleteById(id);
    }

    //statistics: show the clients orderd by the average of the number of kilometers of their booked/reserved cars
    public List<ClientsDTOStatisticsCars> getClientsStatistics(PageRequest pageable) {
        List<ClientsDTOStatisticsCars> clientsStatistics = new ArrayList<>();
        Page<Client> clients = repository.findAll(pageable);
        ModelMapper modelMapper = new ModelMapper();
        for (Client client : clients) {
            double sum = 0.0;
            int count = 0;
            for (BookingDetails booking : client.getBookingDetailsSet()) {
                sum += booking.getCar().getNrkilometers();
                count++;
            }
            double avgNrkilometers = count > 0 ? sum / count : 0.0;
            avgNrkilometers = Math.round(avgNrkilometers * 100.0) / 100.0;
            ClientsDTOStatisticsCars clientDTOStatisticsCars = modelMapper.map(client, ClientsDTOStatisticsCars.class);
            clientDTOStatisticsCars.setAvgCarNrKilometers(avgNrkilometers);
            clientsStatistics.add(clientDTOStatisticsCars);
        }
        clientsStatistics.sort(Comparator.comparingDouble(ClientsDTOStatisticsCars::getAvgCarNrKilometers).reversed());
        return clientsStatistics;
    }

    public int getBookingsCount(Long carId){
        return repository.countBookingsByClientsId(carId);
    }

    public Long countAllClients() {
        return repository.count();
    }

    public List<Client> getClientsNameAutocomplete(String query) {
        PageRequest pr = PageRequest.of(0,500);
        Sort sort = Sort.by("idClient").descending();

        Page<Client> customers=repository.findAll(pr.withSort(sort));

        return customers.stream()
                .filter(adoption -> adoption.getEmail_address().toLowerCase().contains(query.toLowerCase())).limit(20)
                .collect(Collectors.toList());
    }

//    @PostMapping("/clients/{clientId}/bookings")
//    BookingDetails newBookingForClient(@PathVariable Long clientId, @RequestBody BookingDetails newBooking) {
//        // Find the client by ID
//        Client client = repository.findById(clientId)
//                .orElseThrow(() -> new ClientNotFoundException(clientId));
//
//        // Check if the booking with the given ID already exists
//        BookingDetails existingBooking = null;
//        for (BookingDetails booking : bookingRepo.findAll()) {
//            if (booking.equals(newBooking)) {
//                existingBooking = booking;
//                break;
//            }
//        }
//        if (existingBooking != null) {
//            // If the booking already exists, set the client property and return the existing booking
//            existingBooking.setClient(client);
//            bookingRepo.save(existingBooking);
//            return existingBooking;
//        } else {
//            // If the booking does not exist, set the client property for the new booking
//            newBooking.setClient(client);
//            // Save the new booking to the database
//            BookingDetails savedBooking = bookingRepo.save(newBooking);
//            // Add the new booking to the client
//            client.getBookingDetailsSet().add(savedBooking);
//            // Save the client to update the bookings list
//            repository.save(client);
//            return savedBooking;
//        }
//    }

    // Single item

//    @GetMapping("/clients/{id}")
//    Client one(@PathVariable Long id) {
//        return repository.findById(id)
//                .orElseThrow(() -> new ClientNotFoundException(id));
//    }

//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex)
//    {
//        Map<String, String> errors = new HashMap<>();
//        ex.getBindingResult().getAllErrors().forEach((error) -> {
//            String fieldName =((FieldError) error).getField();
//            String errorMessage =error.getDefaultMessage();
//            errors.put(fieldName, errorMessage);
//        });
//        return errors;
//    }

}

