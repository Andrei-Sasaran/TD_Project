package lab4.mpp.labb4.domain.Client;

import lab4.mpp.labb4.domain.Address.AddressDTO;
import lab4.mpp.labb4.domain.Client.Client;

import java.util.Objects;

public class ClientDTO {
    private  Long idClient;
    private String FName;
    private String LName;
    private String phoneNR;
    private String email_address;
    private String dateOfBirth;
    private Long addressID;

    private Integer noBookings;
//    private AddressDTO addressDTO;

    public ClientDTO(String FName, String LName, String phoneNR, String address, String dateOfBirth, AddressDTO addressDTO, Integer noBookings) {
        this.FName = FName;
        this.LName = LName;
        this.phoneNR = phoneNR;
        this.email_address = address;
        this.dateOfBirth = dateOfBirth;
        this.noBookings = noBookings;
    }

    public ClientDTO(Long idClient, String FName, String LName, String phoneNR, String address, String dateOfBirth, Long addressDTO, Integer noBookings) {
        this.idClient = idClient;
        this.FName = FName;
        this.LName = LName;
        this.phoneNR = phoneNR;
        this.email_address = address;
        this.dateOfBirth = dateOfBirth;
        this.addressID = addressDTO;
        this.noBookings=noBookings;
    }

    public ClientDTO() {
    }



    public Long getAddressID() {
        return addressID;
    }

    public void setAddressID(Long addressID) {
        this.addressID = addressID;
    }

    public Long getIdClient() {
        return idClient;
    }

    public void setIdClient(Long idClient) {
        this.idClient = idClient;
    }

    public String getFName() {
        return FName;
    }

    public void setFName(String FName) {
        this.FName = FName;
    }

    public String getLName() {
        return LName;
    }

    public void setLName(String LName) {
        this.LName = LName;
    }

    public String getPhoneNR() {
        return phoneNR;
    }

    public void setPhoneNR(String phoneNR) {
        this.phoneNR = phoneNR;
    }

    public String getEmail_address() {
        return email_address;
    }

    public void setEmail_address(String email_address) {
        this.email_address = email_address;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Integer getNoBookings() {
        return noBookings;
    }

    public void setNoBookings(Integer noBookings) {
        this.noBookings = noBookings;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Client adoption)) return false;
        return getIdClient().equals(adoption.getId()) && getFName().equals(adoption.getFName()) &&  getLName().equals(adoption.getLName()) && getPhoneNR().equals(adoption.getPhoneNR()) && getEmail_address().equals(adoption.getEmail_address()) && getDateOfBirth().equals(adoption.getDateOfBirth());//getPetId().equals(adoption.getPetId()) && getCustomerId().equals(adoption.getCustomerId()) &&
    }

    @Override
    public int hashCode() {
        return Objects.hash(idClient, FName, LName, phoneNR, email_address, dateOfBirth);
    }
}
