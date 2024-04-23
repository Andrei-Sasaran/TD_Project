package lab4.mpp.labb4.repo;

import lab4.mpp.labb4.domain.Car.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Component
public
interface CarRepository extends JpaRepository<Car, Long> {
    List<Car> findByNrkilometersGreaterThanEqual(int minNrKilometers);
    @Query("SELECT COUNT(c) FROM BookingDetails c WHERE c.car.id = :id")
    Integer countBookingsByClientId(@Param("id") Long id);
}
