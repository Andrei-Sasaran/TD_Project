package lab4.mpp.labb4.domain.Car;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class CarDTO {
    private  Long id;
    @NotBlank(message ="Car's model is mandatory")
    private String model;
    @NotBlank(message ="The brand is mandatory")
    private String brand;
    private String color;
    private int year_manufacture;
    @Min(value=1, message ="No of kilometers should be more than 0")
    private int nrkilometers;
    //private List<BookingDTOWithID> bookings= new ArrayList<>();
    private String description;

    private Integer noBookings;

    public CarDTO() {
    }

    public CarDTO(Long id, String model, String brand, String color, int year_manufacture, int nrkilometers, String description, Integer noBookings) {
        this.id = id;
        this.model = model;
        this.brand = brand;
        this.color = color;
        this.year_manufacture = year_manufacture;
        this.nrkilometers = nrkilometers;
        this.description = description;
        this.noBookings = noBookings;
    }

    public CarDTO(String model, String brand, String color, int year_manufacture, int nrkilometers, String description,Integer noBookings) {
        this.model = model;
        this.brand = brand;
        this.color = color;
        this.year_manufacture = year_manufacture;
        this.nrkilometers = nrkilometers;
        this.description= description;
        this.noBookings=noBookings;
    }

//    public static CarDTO fromManufacturer(Car manufacturer){
//        return new CarDTO(
//                manufacturer.getId(),
//                manufacturer.getModel(),
//                manufacturer.getBrand(),
//                manufacturer.getColor(),
//                manufacturer.getYear_manufacture(),
//                manufacturer.getNrkilometers(),
//                manufacturer.getDescription(),
//                manufacturer.getBookingDetailsSet().stream().map(BookingDetails::getId).collect(Collectors.toList())
//        );
//    }

//    public List<BookingDTOWithID> getBookings() {
//        return bookings;
//    }

//    public void setBookings(List<BookingDTOWithID> bookings) {
//        this.bookings = bookings;
//    }

    public Long getId() {
        return id;
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
        return nrkilometers;
    }

    public void setNrkilometers(int nrkilometers) {
        this.nrkilometers = nrkilometers;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getNoBookings() {
        return noBookings;
    }

    public void setNoBookings(Integer noBookings) {
        this.noBookings = noBookings;
    }

    public static Car toCar(CarDTO carDTO) {
        Car car = new Car();
        car.setId(carDTO.getId());
        car.setModel(carDTO.getModel());
        car.setBrand(carDTO.getBrand());
        car.setColor(carDTO.getColor());
        car.setYear_manufacture(carDTO.getYear_manufacture());
        car.setNrkilometers(carDTO.getNrkilometers());
        car.setDescription(carDTO.getDescription());
        return car;
    }

    //    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (!(o instanceof Car car)) return false;
//        return getId().equals(car.getId()) && getModel().equals(car.getModel()) &&  getBrand().equals(car.getBrand()) && getColor().equals(car.getColor());//getPetId().equals(adoption.getPetId()) && getCustomerId().equals(adoption.getCustomerId()) &&
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(getId(), getModel(), getBrand(), getColor(), getYear_manufacture(), getNrkilometers());
//    }
}
/*
 id, model, brand, color, year_manufacture, nrkilometers;
 */
