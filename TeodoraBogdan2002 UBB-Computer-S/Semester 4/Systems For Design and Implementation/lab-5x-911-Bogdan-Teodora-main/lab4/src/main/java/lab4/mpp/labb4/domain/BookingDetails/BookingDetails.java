package lab4.mpp.labb4.domain.BookingDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lab4.mpp.labb4.domain.Car.Car;
import lab4.mpp.labb4.domain.Client.Client;

//@Data
@Entity
@Table(name = "booking_details")
@JsonIgnoreProperties("client")
public class BookingDetails {
    private @Id
    @GeneratedValue @Column(name="id_booking") Long id_booking;
    @NotBlank(message ="Start date is mandatory")
    public String startDate;
    @NotBlank(message ="Return date is mandatory")
    public String returnDate;
    @Min(value=1, message ="Amount should be more than 0")
    public int amount;
    public String bookingStatus;
    public String drop_loc;
    public String pickup_loc;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    @JsonIgnore
    Client client;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_car")
    @JsonIgnore
    Car car;

    public BookingDetails(String startDate, String returnDate, int amount, String bookingStatus, String drop_loc, String pickup_loc) {
        this.startDate = startDate;
        this.returnDate = returnDate;
        this.amount = amount;
        this.bookingStatus = bookingStatus;
        this.drop_loc = drop_loc;
        this.pickup_loc = pickup_loc;
    }

    public BookingDetails(Long idBooking, String startDate, String returnDate, int amount, String bookingStatus, String drop_loc, String pickup_loc) {
        this.id_booking = idBooking;
        this.startDate = startDate;
        this.returnDate = returnDate;
        this.amount = amount;
        this.bookingStatus = bookingStatus;
        this.drop_loc = drop_loc;
        this.pickup_loc = pickup_loc;
    }

    public BookingDetails() {

    }

    public Client getClient() {
        return this.client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }



    public Long getId() {
        return id_booking;
    }

    public void setId(Long idBooking) {
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

//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//        BookingDetails that = (BookingDetails) o;
//        return amount == that.amount && idBooking.equals(that.idBooking) && startDate.equals(that.startDate) && returnDate.equals(that.returnDate) && bookingStatus.equals(that.bookingStatus) && drop_loc.equals(that.drop_loc) && pickup_loc.equals(that.pickup_loc);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(idBooking, startDate, returnDate, amount, bookingStatus, drop_loc, pickup_loc);
//    }

    @Override
    public String toString() {
        return "BookingDetails{" +
                "idBooking=" + id_booking +
                ", startDate='" + startDate + '\'' +
                ", returnDate='" + returnDate + '\'' +
                ", amount=" + amount +
                ", bookingStatus='" + bookingStatus + '\'' +
                ", drop_loc='" + drop_loc + '\'' +
                ", pickup_loc='" + pickup_loc + '\'' +
//                ", id_client=" + client +
                '}';
    }
}
//        "startDate":"12 Apr 2023",
//        "returnDate":"12 May 2023",
//        "amount":2500,
//        "bookingStatus":"reserved",
//        "drop_loc":"cluj-napoca",
//        "pickup_loc":"brasov",
//        "client":{
//        "idClient": 1102,
//        "phoneNR": "+40711111111",
//        "address": "str. A, B city",
//        "dateOfBirth": "01 Jan 1997",
//        "fname": "Anna",
//        "lname": "Y"
//        },
//        "id":1102