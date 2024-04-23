package lab4.mpp.labb4.domain.Address;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lab4.mpp.labb4.domain.Client.Client;

import java.util.List;
import java.util.Objects;

//@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Entity
@Table(name="address")
public class Address {
    private @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY) Long address_id;
    @NotBlank(message ="The country is mandatory")
    @Column(name="country")
    private String country;
    @Column(name="county")
    private String county;
    @NotBlank(message ="The city is mandatory")
    @Column(name="city")
    private String city;
    @Column(name= "additional_info")
    private String additional_info;

//    @OneToOne
//    @PrimaryKeyJoinColumn
//    private Client client;

    @OneToMany(mappedBy = "address", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<Client> clientList;


    public Address() {
    }

    public Address(Long address_id, String country, String county, String city, String additional_info) {
        this.address_id = address_id;
        this.country = country;
        this.county = county;
        this.city = city;
        this.additional_info = additional_info;
    }

    public Address(String country, String county, String city, String additional_info) {
        this.country = country;
        this.county = county;
        this.city = city;
        this.additional_info = additional_info;
    }

    public List<Client> getClientList() {
        return clientList;
    }

    public void setClientList(List<Client> clientList) {
        this.clientList = clientList;
    }

    public Long getAddress_id() {
        return address_id;
    }

    public void setAddress_id(Long address_id) {
        this.address_id = address_id;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAdditional_info() {
        return additional_info;
    }

    public void setAdditional_info(String additional_info) {
        this.additional_info = additional_info;
    }

//    public Client getClient() {
//        return client;
//    }
//
//    public void setClient(Client client) {
//        this.client = client;
//    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Address address = (Address) o;
        return getAddress_id().equals(address.getAddress_id()) && getCountry().equals(address.getCountry()) && getCounty().equals(address.getCounty()) && getCity().equals(address.getCity()) && getAdditional_info().equals(address.getAdditional_info());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getAddress_id(), getCountry(), getCounty(), getCity(), getAdditional_info());
    }

    @Override
    public String toString() {
        return "Address{" +
                "address_id=" + address_id +
                ", country='" + country + '\'' +
                ", county='" + county + '\'' +
                ", city='" + city + '\'' +
                ", additional_info='" + additional_info + '\'' +
//                ", client=" + client +
                '}';
    }
}
//1,"",Cluj-Napoca,Romania,Cluj,1052
//        3,str. X nr. 100,Sibiu,Romania,Sibiu,1102
//        2, ,Gherla,Romania,Cluj,1053
//        4,str. A nr. 3,Cluj-Napoca,Romania,Cluj,1
//        6,str. M nr. 7,Floresti,Romania,Cluj,2
//        7,,Cluj-Napoca,Romania,Cluj,3
//        8,,Bucuresti,Romania,Ilfov,5
//        9,str. N nr. 8,Bucuresti,Romania,Ilfov,6
//        5,str. B nr. 56,Sibiu,Romania,Sibiu,4
