package lab4.mpp.labb4.controller;

import jakarta.transaction.Transactional;
import lab4.mpp.labb4.domain.Car.Car;
import lab4.mpp.labb4.domain.Car.CarDTO;
import lab4.mpp.labb4.domain.Car.CarDTOWithClientIDs;
import lab4.mpp.labb4.domain.Car.CarsDTOStatisticsBookingPrice;
import lab4.mpp.labb4.service.CarService;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
//@Service
class CarController {
    private final CarService carService;


    public CarController(CarService carService) {
        this.carService = carService;
    }

    // tag::get-aggregate-root[]
    @GetMapping("/cars")
    List<CarDTO> all() {
        return carService.all();
    }

    @Transactional
    @GetMapping("/cars/page/{page}/size/{size}")
    public List<CarDTO> AllPaged(@PathVariable int page, @PathVariable int size) {
        PageRequest pr = PageRequest.of(page, size);
        //return this.carService.allPaged(pr).stream().map(car -> car.getCarDTO(carService.getBookingsCount(car.getId()))).toList();

        return carService.allPaged(pr);
    }
    // end::get-aggregate-root[]

    @PostMapping("/cars/add")
    Car newCar(@RequestBody Car newCar) {
        return carService.newCar(newCar);
    }

    // Single item

    @GetMapping("/cars/{id}/details") //GET BY ID
    @CrossOrigin(origins = "*")
    Car oneCar(@PathVariable String id){
        return carService.oneCar(id);
    }

    @GetMapping("/cars/{id}")
    CarDTOWithClientIDs one (@PathVariable String id){
        return carService.one(id);
    }

    @PutMapping("/cars/{id}/edit")
    Car replaceCar(@RequestBody Car newCar, @PathVariable Long id) {
        return carService.replaceCar(newCar,id);
    }

    @DeleteMapping("/cars/{id}/delete")
    void deleteCar(@PathVariable Long id) {
        carService.deleteCar(id);
    }

    @GetMapping("/cars/nrKilometers/{minNrKilometers}")
    List<Car> byNrKilometers(@PathVariable int minNrKilometers) {
        return carService.byNrKilometers(minNrKilometers);
    }

    //all the cars ordered by the average booking's price
    @GetMapping("/cars/statistics")
    public List<CarsDTOStatisticsBookingPrice> getAllCarsOrderByAvgBookingPrice(@RequestParam(value = "page", defaultValue = "1", required = false) int page,
                                                                                @RequestParam(value = "size", defaultValue = "10", required = false) int size) {
        PageRequest pr = PageRequest.of(page, size);
        return carService.getAllCarsOrderByAvgBookingPrice(pr);
    }
    @GetMapping("/cars/countAll")
    public Long countAllCars()
    {
        return this.carService.countAllCars();
    }

    @GetMapping("/cars/autocomplete")
    public List<Car> getCarsSuggestions(@RequestParam String query)
    {
        return this.carService.getCarsIdsAutocomplete(query);
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
}

