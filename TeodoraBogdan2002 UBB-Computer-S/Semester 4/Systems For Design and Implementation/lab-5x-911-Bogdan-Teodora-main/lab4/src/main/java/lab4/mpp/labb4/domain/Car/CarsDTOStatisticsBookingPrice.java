package lab4.mpp.labb4.domain.Car;

public class CarsDTOStatisticsBookingPrice {
    private  Long id;
    private String model;
    private String brand;
    private String color;
    private int year_manufacture;
    private int nrkilometers;
    private double agvBookingPrice;

    private String description;

    public CarsDTOStatisticsBookingPrice() {
    }

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

    public double getAgvBookingPrice() {
        return agvBookingPrice;
    }

    public void setAgvBookingPrice(double agvBookingPrice) {
        this.agvBookingPrice = agvBookingPrice;
    }
}
