package lab4.mpp.labb4.domain.BookingDetails;
//Booking Details with client id and car id
public class BookingDTOWithID {
    private Long id_booking;
    private String startDate;
    private String returnDate;
    private int amount;
    private String bookingStatus;
    private String drop_loc;
    private String pickup_loc;
    private Long id;//client id
    private Long id_car;//car id

    public BookingDTOWithID() {
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

    public Long getClientId() {
        return id;
    }

    public void setClientId(Long clientId) {
        this.id = clientId;
    }

    public Long getCarId() {
        return id_car;
    }

    public void setCarId(Long carId) {
        this.id_car = carId;
    }
}
