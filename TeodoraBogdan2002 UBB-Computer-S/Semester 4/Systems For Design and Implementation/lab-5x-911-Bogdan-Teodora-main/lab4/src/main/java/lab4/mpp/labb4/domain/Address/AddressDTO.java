package lab4.mpp.labb4.domain.Address;

import java.util.Objects;

public class AddressDTO {
    private Long address_id;
    private String country;
    private String county;
    private String city;
    private String additional_info;

    private Integer noClients;

    public AddressDTO() {
    }

    public AddressDTO(Long address_id, String country, String county, String city, String additional_info, Integer noClients) {
        this.address_id = address_id;
        this.country = country;
        this.county = county;
        this.city = city;
        this.additional_info = additional_info;
        this.noClients=noClients;
    }

    public AddressDTO(String country, String county, String city, String additional_info, Integer noClients) {
        this.country = country;
        this.county = county;
        this.city = city;
        this.additional_info = additional_info;
        this.noClients=noClients;
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

    public Integer getNoClients() {
        return noClients;
    }

    public void setNoClients(Integer noClients) {
        this.noClients = noClients;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AddressDTO that = (AddressDTO) o;
        return getAddress_id().equals(that.getAddress_id()) && Objects.equals(getCountry(), that.getCountry()) && Objects.equals(getCounty(), that.getCounty()) && Objects.equals(getCity(), that.getCity()) && Objects.equals(getAdditional_info(), that.getAdditional_info());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getAddress_id(), getCountry(), getCounty(), getCity(), getAdditional_info());
    }

    @Override
    public String toString() {
        return "AddressDTO{" +
                "address_id=" + address_id +
                ", country='" + country + '\'' +
                ", county='" + county + '\'' +
                ", city='" + city + '\'' +
                ", additional_info='" + additional_info + '\'' +
                '}';
    }
}
