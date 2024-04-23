package lab4.mpp.labb4.app;

public class BookingNotFoundException extends RuntimeException {

    public BookingNotFoundException(Long id) {
        super("Could not find booking " + id);
    }
}
