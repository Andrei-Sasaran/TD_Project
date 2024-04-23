package lab4.mpp.labb4.domain.Car;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lab4.mpp.labb4.domain.BookingDetails.BookingDetails;

import java.util.List;
import java.util.Objects;

//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.Id;

//@Data
@Entity
@Table(name="Car")
public class Car{

    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
    @NotBlank(message ="Car's model is mandatory")
    private String model;
    @NotBlank(message ="The brand is mandatory")
    private String brand;
    private String color;
    private int year_manufacture;
    @Min(value=1, message ="No of kilometers should be more than 0")
    private int nrkilometers;

    @OneToMany(mappedBy = "car", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<BookingDetails> bookingDetailsSet;

    private String description;


//    public Car(String model, String brand, String color, int year_manufacture, int nrkilometers, String description) {
//        this.model = model;
//        this.brand = brand;
//        this.color = color;
//        this.year_manufacture = year_manufacture;
//        this.nrkilometers = nrkilometers;
//        this.description=description;
//    }
//
//    public Car(String model, String brand, String color, int year_manufacture, int nrkilometers,String description,  List<BookingDetails> bookingDetailsSet) {
//        this.model = model;
//        this.brand = brand;
//        this.color = color;
//        this.year_manufacture = year_manufacture;
//        this.nrkilometers = nrkilometers;
//        this.description=description;
//        this.bookingDetailsSet = bookingDetailsSet;
//    }

    public Car() {
        ;
    }

    public List<BookingDetails> getBookingDetailsSet() {
        return bookingDetailsSet;
    }

    public void setBookingDetailsSet(List<BookingDetails> bookingDetailsSet) {
        this.bookingDetailsSet = bookingDetailsSet;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getYear_manufacture() {
        return year_manufacture;
    }

    public void setYear_manufacture(int year_manufacture) {
        this.year_manufacture = year_manufacture;
    }

    public int getNrkilometers() {
        return this.nrkilometers;
    }

    public void setNrkilometers(int nr_kilometers) {
        this.nrkilometers = nr_kilometers;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {

        if (this == o)
            return true;
        if (!(o instanceof Car))
            return false;
        Car car = (Car) o;
        return Objects.equals(this.id, car.id) && Objects.equals(this.model, car.model)
                && Objects.equals(this.brand, car.brand)&& Objects.equals(this.color, car.color)&& Objects.equals(this.year_manufacture, car.year_manufacture);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id, this.model, this.brand, this.color,this.year_manufacture,this.nrkilometers);
    }

    @Override
    public String toString() {
        return "Car{" +
                "id=" + id +
                ", model='" + model + '\'' +
                ", brand='" + brand + '\'' +
                ", color='" + color + '\'' +
                ", year_manufacture=" + year_manufacture +
                ", nr_kilometers=" + nrkilometers +
                '}';
    }

    @JsonIgnore
    public CarDTO getCarDTO(int transactionsCount ){
        CarDTO clientDTO = new CarDTO();

        clientDTO.setId(id);
        clientDTO.setModel(model);
        clientDTO.setBrand(brand);
        clientDTO.setColor(color);
        clientDTO.setYear_manufacture(year_manufacture);
        clientDTO.setNrkilometers(nrkilometers);

        clientDTO.setNoBookings(transactionsCount);
        clientDTO.setDescription(description);
        return clientDTO;
    }
}

//20,mazda,grey,5,2020,50000
//1303,audi,black,A8,2021,80000
//1252,skoda,blue,octavia,2021,40000
//1352,skoda,blue,octavia,2021,40000
//1353,audi,black,A8,2021,80000
//        1253,audi,black,A8,2021,80000
//        1302,skoda,blue,octavia,2021,40000
//        10,mazda,red,cx-5,2018,70000
//