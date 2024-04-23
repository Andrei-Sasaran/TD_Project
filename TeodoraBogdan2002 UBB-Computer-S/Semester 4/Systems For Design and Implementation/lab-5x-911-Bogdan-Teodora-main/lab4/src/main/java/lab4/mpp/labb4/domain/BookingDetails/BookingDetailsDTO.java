package lab4.mpp.labb4.domain.BookingDetails;

import lab4.mpp.labb4.domain.Car.CarDTO;
import lab4.mpp.labb4.domain.Client.ClientDTO;

//Booking Details with ClientDTO and CarDTO
public class BookingDetailsDTO {
    private Long id_booking;
    private String startDate;
    private String returnDate;
    private int amount;
    private String bookingStatus;
    private String drop_loc;
    private String pickup_loc;

    private ClientDTO client;

    private CarDTO car;

    public BookingDetailsDTO() {
    }

    public Long getIdBooking() {
        return id_booking;
    }

    public void setIdBooking(Long idBooking) {
        this.id_booking = idBooking;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(String returnDate) {
        this.returnDate = returnDate;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(String bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

    public String getDrop_loc() {
        return drop_loc;
    }

    public void setDrop_loc(String drop_loc) {
        this.drop_loc = drop_loc;
    }

    public String getPickup_loc() {
        return pickup_loc;
    }

    public void setPickup_loc(String pickup_loc) {
        this.pickup_loc = pickup_loc;
    }

    public ClientDTO getClient() {
        return client;
    }

    public void setClient(ClientDTO client) {
        this.client = client;
    }

    public CarDTO getCar() {
        return car;
    }

    public void setCar(CarDTO car) {
        this.car = car;
    }
}
