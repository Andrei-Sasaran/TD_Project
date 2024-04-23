package lab4.mpp.labb4.service;

import lab4.mpp.labb4.app.CarNotFoundException;
import lab4.mpp.labb4.domain.BookingDetails.BookingDetails;
import lab4.mpp.labb4.domain.Car.Car;
import lab4.mpp.labb4.domain.Car.CarDTO;
import lab4.mpp.labb4.domain.Car.CarDTOWithClientIDs;
import lab4.mpp.labb4.domain.Car.CarsDTOStatisticsBookingPrice;
import lab4.mpp.labb4.repo.BookingRepository;
import lab4.mpp.labb4.repo.CarRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public
class CarService {

    private final CarRepository repository;

    private final BookingRepository bookingRepo;

    public CarService(CarRepository repository, BookingRepository bookingRepo) {
        this.repository = repository;
        this.bookingRepo = bookingRepo;
    }

    // Aggregate root
    //This method returns all entries, but not paged
    public List<CarDTO> all() {
//        return repository.findAll();
        ModelMapper modelMapper = new ModelMapper();
        List<Car> cars = repository.findAll();

        List<CarDTO> carDTOS = cars.stream()
                .map(car -> modelMapper.map(car, CarDTO.class))
                .collect(Collectors.toList());
        for (CarDTO cardto: carDTOS){
            cardto.setNoBookings(repository.countBookingsByClientId(cardto.getId()));
        }
        return carDTOS;
        //-------------
        //modelMapper.typeMap(Customer.class, CustomerDTO.class).addMapping(Customer::getAddress,CustomerDTO::setAddress);
        //List<Car> customers=repository.findAll();
        //List<CarDTO> customerDTOS=customers.stream()
        //        .map(customer->modelMapper.map(customer,CarDTO.class)).collect(Collectors.toList());
        //return customerDTOS;
//        ModelMapper modelMapper = new ModelMapper();
//        List<Car> cars = repository.findAll();
//        List<CarDTO> carDTOS = cars.stream()
//                .map(car -> modelMapper.map(car, CarDTO.class))
//                .collect(Collectors.toList());
//        return carDTOS;
    }

    //this method returns all cars, PAGED
    public List<CarDTO> allPaged(PageRequest pr) {
        ModelMapper modelMapper = new ModelMapper();
        Page<Car> cars = repository.findAll(pr);
        List<CarDTO> carsDTOs = cars.stream()
                .map(car -> modelMapper.map(car, CarDTO.class))
                .collect(Collectors.toList());
        for (CarDTO cardto: carsDTOs){
            cardto.setNoBookings(repository.countBookingsByClientId(cardto.getId()));
        }
        return carsDTOs;
        //return repository.findAll(pr.withSort(sort)).stream().toList();
    }

    public Car newCar( Car newCar) {
        return repository.save(newCar);
    }

    // Single item
    // THIS ONE IS USED IN FRONTEND
    public Car oneCar( String id){
        Long carId = Long.parseLong(id);
        return repository.findById(carId)
                .orElseThrow(() -> new CarNotFoundException(carId));
    }

    // This one method retrieves information about a specific car,
    // including its details and a list of client IDs who have booked that car.
    // THIS ONE IS NOT USED IN FRONTEND
    public CarDTOWithClientIDs one (String id){
        Long longInt = Long.parseLong(id);
        Car car=repository.findById(longInt).get();
        CarDTOWithClientIDs carDTOWithClients=new CarDTOWithClientIDs();
        List<Long> adoptionIds=new ArrayList<>();
        List<BookingDetails> bookingDetails=bookingRepo.findAll();
        for(BookingDetails ac:bookingDetails)
            if(ac.getCar().getId()== car.getId())
                adoptionIds.add(ac.getClient().getId());
        carDTOWithClients.setClientsIds(adoptionIds);
        carDTOWithClients.setCar(car);
        return  carDTOWithClients;
    }

    public Car replaceCar( Car newCar,  Long id) {

        return repository.findById(id)
                .map(car -> {
                    car.setModel(newCar.getModel());
                    car.setBrand(newCar.getBrand());
                    car.setColor(newCar.getColor());
                    car.setYear_manufacture(newCar.getYear_manufacture());
                    car.setNrkilometers(newCar.getNrkilometers());
                    return repository.save(car);
                })
                .orElseGet(() -> {
                    newCar.setId(id);
                    return repository.save(newCar);
                });
    }

    public void deleteCar( Long id) {
        repository.deleteById(id);
    }

    public List<Car> byNrKilometers( int minNrKilometers) {
        return repository.findByNrkilometersGreaterThanEqual(minNrKilometers);
    }

    public int getBookingsCount(Long carId){
        return repository.countBookingsByClientId(carId);
    }

    //all the cars ordered by the average booking's price
    public List<CarsDTOStatisticsBookingPrice> getAllCarsOrderByAvgBookingPrice(PageRequest pageable) {
        Page<Car> cars = repository.findAll(pageable);
        List<CarsDTOStatisticsBookingPrice> carsDTOStatisticsBookingsPrices = new ArrayList<>();
        ModelMapper modelMapper = new ModelMapper();
        for (Car car : cars) {
            double sum = 0.0;
            int count = 0;
            for (BookingDetails booking : car.getBookingDetailsSet()) {
                sum += booking.getAmount();
                count++;
            }
            double avgPrice = count > 0 ? sum / count : 0.0;
            avgPrice=Math.round(avgPrice * 100.0) / 100.0;
            CarsDTOStatisticsBookingPrice carsDTOStatisticsBookingPrice = modelMapper.map(car, CarsDTOStatisticsBookingPrice.class);
            carsDTOStatisticsBookingPrice.setAgvBookingPrice(avgPrice);
            carsDTOStatisticsBookingsPrices.add(carsDTOStatisticsBookingPrice);
        }
        carsDTOStatisticsBookingsPrices.sort(Comparator.comparingDouble(CarsDTOStatisticsBookingPrice::getAgvBookingPrice).reversed());
        return carsDTOStatisticsBookingsPrices;
//        return new PageImpl<>(carsDTOStatisticsBookingsPrices, pageable, cars.getSize());
    }

    public Long countAllCars() {
        return repository.count();
    }

    public List<Car> getCarsIdsAutocomplete(String query) {
        PageRequest pr = PageRequest.of(0,500);
        Sort sort = Sort.by("id").ascending();
        Page<Car> cars=repository.findAll(pr.withSort(sort));

        return cars.stream()
                .filter(adoption -> String.valueOf(adoption.getNrkilometers()).startsWith(query)).limit(20)
                .collect(Collectors.toList());
    }


//    @PostMapping("/cars/{carId}/bookings")
//    BookingDetails newBookingForCar(@PathVariable Long carId, @RequestBody BookingDetails newBooking) {
//        // Find the client by ID
//        Car car = repository.findById(carId)
//                .orElseThrow(() -> new CarNotFoundException(carId));
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
//            existingBooking.setCar(car);
//            bookingRepo.save(existingBooking);
//            return existingBooking;
//        } else {
//            // If the booking does not exist, set the client property for the new booking
//            newBooking.setCar(car);
//            // Save the new booking to the database
//            BookingDetails savedBooking = bookingRepo.save(newBooking);
//            // Add the new booking to the client
//            car.getBookingDetailsSet().add(savedBooking);
//            // Save the client to update the bookings list
//            repository.save(car);
//            return savedBooking;
//        }
//    }

//    public Page<CarsDTOStatisticsBookingPrice> getAllCarsOrderByAvgBookingPricePaged(Pageable pageable) {
//        CriteriaBuilder cb = em.getCriteriaBuilder();
//        CriteriaQuery<Object[]> cq = cb.createQuery(Object[].class);
//        Root<Car> cars = cq.from(Car.class);
//        Join<Car, BookingDetails> carBookingsJoin = cars.join("booking_details", JoinType.LEFT);
//        cq
//                .multiselect(cars, cb.count(carBookingsJoin))
//                .groupBy(cars)
//                .orderBy(cb.desc(cb.count(carBookingsJoin)));
//        TypedQuery<Object[]> typedQuery = em.createQuery(cq);
//
//
//        List<CarsDTOStatisticsBookingPrice> results = typedQuery
//                .setFirstResult(pageable.getPageNumber() * pageable.getPageSize())
//                .setMaxResults(pageable.getPageSize())
//                .getResultStream()
//                .map(row -> {
//                    return new CarsDTOStatisticsBookingPrice(
//                            CarDTO.((Car) row[0]),
//                            ((Long) row[1]).intValue()
//                    );
//                })
//                .toList();
//
//        CriteriaQuery<Long> count_cq = cb.createQuery(Long.class);
//        count_cq.select(cb.count(count_cq.from(Car.class)));;
//        long total = em.createQuery(count_cq).getSingleResult();
//
//        return new PageImpl<>(results, pageable, total);
//    }
}

