package lab4.mpp.labb4.app;

public class AddressNotFoundException extends RuntimeException{
    public AddressNotFoundException(Long id) {
        super("Could not find address " + id);
    }

}
