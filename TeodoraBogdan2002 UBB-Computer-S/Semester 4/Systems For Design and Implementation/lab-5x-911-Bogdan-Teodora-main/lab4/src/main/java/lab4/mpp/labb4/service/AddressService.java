package lab4.mpp.labb4.service;

import lab4.mpp.labb4.app.AddressNotFoundException;
import lab4.mpp.labb4.domain.Address.Address;
import lab4.mpp.labb4.domain.Address.AddressDTO;
import lab4.mpp.labb4.repo.AddressRepository;
import lab4.mpp.labb4.repo.ClientRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public
class AddressService {
    private final AddressRepository repository;
    private ClientRepository clientrepo;

    public AddressService(AddressRepository repository, ClientRepository clientrepo) {
        this.repository = repository;
        this.clientrepo = clientrepo;
    }

    // Aggregate root
    // tag::get-aggregate-root[]
    public List<AddressDTO> all() {
//        return repository.findAll();
        ModelMapper modelMapper = new ModelMapper();
        List<Address> passengers = repository.findAll();
        return passengers.stream()
                .map(addr -> modelMapper.map(addr, AddressDTO.class))
                .collect(Collectors.toList());
    }

    public List<AddressDTO> allPaged(PageRequest pr) {
        ModelMapper modelMapper = new ModelMapper();
        Sort sort = Sort.by("address_id").ascending();
        Page<Address> addresses = repository.findAll(pr);
        List<AddressDTO> addressesDTOs = addresses.stream()
                .map(addr -> {
                    AddressDTO addressDTO = modelMapper.map(addr, AddressDTO.class);
                    addressDTO.setNoClients(repository.countClientsByAddressId(addr.getAddress_id()));
                    return addressDTO;
                })
                .collect(Collectors.toList());

        return addressesDTOs;
    }
    // end::get-aggregate-root[]
    //newAddress-method for adding a new address to the database
    public Address newAddress( Address newAddress) {
        return repository.save(newAddress);
    }

    // Return a single item
    public Address one( Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new AddressNotFoundException(id));
    }
    //Method for updating
    public Address replaceAddress( Address newAddress,  Long id) {

        return repository.findById(id)
                .map(car -> {
                    car.setCountry(newAddress.getCountry());
                    car.setCounty(newAddress.getCounty());
                    car.setCity(newAddress.getCity());
                    car.setAdditional_info(newAddress.getAdditional_info());
                    return repository.save(car);
                })
                .orElseGet(() -> {
                    newAddress.setAddress_id(id);
                    return repository.save(newAddress);
                });
    }

    //Method for deleting an address from the database
    public void deleteAddress( Long id) {
        if(clientrepo.existsById(id)){
            clientrepo.deleteById(id);
        }
        repository.deleteById(id);
    }

    //method that returns number of all entries
    public Long countAllAddresses() {
        return repository.count();
    }

    // method that returns list of addresses paged, This method retrieves a list of cities
    // from addresses that match the provided query string, limited to 20 results. It's useful
    // for providing autocomplete suggestions for cities based on user input.
    public List<Address> getAddressCitiesAutocomplete(String query)
    {
        PageRequest pr = PageRequest.of(0,500);
        Page<Address> addresses=repository.findAll(pr);

        return addresses.stream()
                .filter(address -> address.getCity().toLowerCase().contains(query.toLowerCase())).limit(20)
                .collect(Collectors.toList());
    }


//    @GetMapping("/cars/nrKilometers/{minNrKilometers}")
//    List<Car> byNrKilometers(@PathVariable int minNrKilometers) {
//        return repository.findByNrkilometersGreaterThanEqual(minNrKilometers);
//    }
}

