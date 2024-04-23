package lab4.mpp.labb4.repo;

import lab4.mpp.labb4.domain.BookingDetails.BookingDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Component
public interface BookingRepository extends JpaRepository<BookingDetails, Long> {
    List<BookingDetails> findByAmountGreaterThanEqual(int minAmount);

    List<BookingDetails> findBookingDetailsByClientId(Long carId);

}
//{
//     "startDate":"12 Apr 2023",
//        "returnDate":"12 May 2023",
//        "amount":2500,
//        "bookingStatus":"reserved",
//        "drop_loc":"cluj-napoca",
//        "pickup_loc":"brasov",
//        "id":752
//        }