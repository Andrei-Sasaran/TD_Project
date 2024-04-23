package lab4.mpp.labb4.domain.Car;

import java.util.List;

public class CarDTOWithClientIDs {
    Car car;
    private List<Long> clientsIds;

    public CarDTOWithClientIDs() {
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car client) {
        this.car = client;
    }

    public List<Long> getClientsIds() {
        return clientsIds;
    }

    public void setClientsIds(List<Long> clientsIds) {
        this.clientsIds = clientsIds;
    }
}
