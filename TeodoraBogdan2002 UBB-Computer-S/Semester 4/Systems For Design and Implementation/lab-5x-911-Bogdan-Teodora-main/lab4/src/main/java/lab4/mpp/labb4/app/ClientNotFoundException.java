package lab4.mpp.labb4.app;

public class ClientNotFoundException extends RuntimeException {

    public ClientNotFoundException(Long id) {
        super("Could not find client " + id);
    }
}
