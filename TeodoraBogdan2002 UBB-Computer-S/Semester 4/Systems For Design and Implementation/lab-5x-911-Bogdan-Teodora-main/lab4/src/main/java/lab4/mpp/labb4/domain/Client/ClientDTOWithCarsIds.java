package lab4.mpp.labb4.domain.Client;

import lab4.mpp.labb4.domain.Client.Client;

import java.util.List;

public class ClientDTOWithCarsIds {
    Client client;
    List<Long> CarsIds;
    Long addressId;

    public ClientDTOWithCarsIds() {
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public List<Long> getCarsIds() {
        return CarsIds;
    }

    public void setCarsIds(List<Long> carsIds) {
        this.CarsIds = carsIds;
    }

    public Long getAddressId() {
        return addressId;
    }

    public void setAddressId(Long addressId) {
        this.addressId = addressId;
    }
}
