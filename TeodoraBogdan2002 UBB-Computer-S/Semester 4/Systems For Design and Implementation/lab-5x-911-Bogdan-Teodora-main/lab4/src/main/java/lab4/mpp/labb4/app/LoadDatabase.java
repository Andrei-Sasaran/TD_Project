package lab4.mpp.labb4.app;

import lab4.mpp.labb4.repo.BookingRepository;
import lab4.mpp.labb4.repo.CarRepository;
import lab4.mpp.labb4.repo.ClientRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class LoadDatabase {

    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase(CarRepository carRepository, ClientRepository clientRepository, BookingRepository bookingRepository) {
        return args -> {
//            log.info("Preloading " + carRepository.save(new Car("octavia", "skoda",
//                    "blue",2021,4000)));
//            log.info("Preloading " + carRepository.save(new Car("A8", "audi",
//                    "black",2021,8000)));
//            Client client1= new Client("Anna","Y","+40711111111","str. A, B city","01 Jan 1997");
//            log.info("Preloading "+ clientRepository.save(client1));
//            log.info("Preloading "+ clientRepository.save(new Client("Ken","Q","+40722222222","str. B, C city","01 Mar 1980")));

//            log.info("Preloading "+ bookingRepository.save(new BookingDetails("14 Mar 2023","14 Apr 2023",2000, "reserved","loc A","loc B")));
//            log.info("Preloading "+ bookingRepository.save(new BookingDetails("3 Mar 2023","29 Apr 2023",3500, "reserved","loc X","loc Y")));

        };
    }
}
