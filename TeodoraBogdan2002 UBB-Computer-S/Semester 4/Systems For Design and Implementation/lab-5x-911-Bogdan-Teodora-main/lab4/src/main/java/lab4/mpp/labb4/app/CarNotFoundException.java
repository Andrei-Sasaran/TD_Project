package lab4.mpp.labb4.app;

public class CarNotFoundException extends RuntimeException {

    public CarNotFoundException(Long id) {
        super("Could not find car " + id);
    }
}
