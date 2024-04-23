package lab4.mpp.labb4.domain.Client;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lab4.mpp.labb4.domain.Address.Address;
import lab4.mpp.labb4.domain.BookingDetails.BookingDetails;

import java.util.List;
import java.util.Objects;


@Entity
@Table(name = "Client")
public class Client{
    private @Id
    @GeneratedValue
    Long idClient;
    @NotBlank(message ="First name is mandatory")
    private String FName;
    @NotBlank(message ="Last name is mandatory")
    private String LName;
    @NotBlank(message ="Phone number is mandatory")
    private String phoneNR;
    private String email_address;
    private String dateOfBirth;

    @OneToMany(mappedBy = "client", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<BookingDetails> bookingDetailsSet;

//    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
//    //@MapsId
//    @JoinColumn(name = "address_id")
//    private Address address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id")
    @JsonIgnore
    Address address;

//    public Set<BookingDetails> getBookingDetailsSet() {
//        return  bookingDetailsSet;
//    }
//


    public Client(String FName, String LName, String phoneNR, String address, String dateOfBirth) {
        this.FName = FName;
        this.LName = LName;
        this.phoneNR = phoneNR;
        this.email_address = address;
        this.dateOfBirth = dateOfBirth;
    }

    public Client(String FName, String LName, String phoneNR, String email_address, String dateOfBirth, Address address) {
        this.FName = FName;
        this.LName = LName;
        this.phoneNR = phoneNR;
        this.email_address = email_address;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
    }

    public Client() {

    }

    public Long getId() {
        return idClient;
    }

    public void setId(Long id) {
        this.idClient = id;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public List<BookingDetails> getBookingDetailsSet() {
        return bookingDetailsSet;
    }

    public void setBookingDetailsSet(List<BookingDetails> bookingDetailsSet) {
        this.bookingDetailsSet = bookingDetailsSet;
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

    public void setEmail_address(String address) {
        this.email_address = address;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Client client = (Client) o;
        return idClient.equals(client.idClient) && FName.equals(client.FName) && LName.equals(client.LName) && phoneNR.equals(client.phoneNR) && email_address.equals(client.email_address) && dateOfBirth.equals(client.dateOfBirth);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idClient, FName, LName, phoneNR, email_address, dateOfBirth);
    }



    @Override
    public String toString() {
        return "Client{" +
                "id=" + idClient +
                ", FName='" + FName + '\'' +
                ", LName='" + LName + '\'' +
                ", phoneNR='" + phoneNR + '\'' +
                ", email_address='" + email_address + '\'' +
                ", dateOfBirth='" + dateOfBirth + '\'' +
                ", bookings= "+bookingDetailsSet+'\''+
                '}';
    }

    public ClientDTO getClientDTO(int bookingsCount) {
        ClientDTO clientDTO = new ClientDTO();

        clientDTO.setIdClient(idClient);
        clientDTO.setFName(FName);
        clientDTO.setLName(LName);
        clientDTO.setPhoneNR(phoneNR);
        clientDTO.setEmail_address(email_address);
        clientDTO.setDateOfBirth(dateOfBirth);

        clientDTO.setNoBookings(bookingsCount);
        return clientDTO;
    }

//    public ClientDTO toClientDTO()
//    {
//        ClientDTO client = new ClientDTO();
//        client.setIdClient(this.getId());
//        client.setFName(this.getFName());
//        client.setLName(this.getLName());
//        client.setPhoneNR(this.getPhoneNR());
//        client.setAddress(this.getAddress());
//        client.setDateOfBirth(this.getDateOfBirth());
////        if(this.bookingDetailsSet==null) {
////            client.setBookingDetailsSet(null);
////        }
////        else
////        {
////            pet.setAdoptionId(this.adoption.getId());
////        }
//        return pet;
//    }
}
//1052,Anna,Y,abc@yahoo.com,01 Jan 1997,+40711111111,1
//        1053,Ken,Q,ken_q@yahoo.com,01 Mar 1980,+40722222222,2
//        1102,Annais,Y,annaisY@gmail.com,01 Jan 1990,+40711111100,3
//        1,X,B,nnnn@gmail.com,10 Jul 1988,+40788888888,4
//        4,Alex,Xy,xy_alex@yahoo.com,12 Mar 1999,,5
//        2,Andrew,Z,zzzz@yahoo.com,10 Sep 2001,+40211221122,6
//        3,Anna,X,,23 Mar 1977,<null>,7
//        5,A,X,aaaaa@yahoo.com,13 Sep 1996,+40344444444,8
//        6,Maria,M,mm@gmail.com,08 Nov 1991,+40766666666,9

