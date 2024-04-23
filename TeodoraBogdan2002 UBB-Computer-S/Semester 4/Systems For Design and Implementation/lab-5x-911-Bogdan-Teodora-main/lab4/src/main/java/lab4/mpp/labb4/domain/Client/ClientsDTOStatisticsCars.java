package lab4.mpp.labb4.domain.Client;

public class ClientsDTOStatisticsCars {
    private  Long idClient;
    private String FName;
    private String LName;
    private String phoneNR;
    private String email_address;
    private String dateOfBirth;
    private double avgCarNrKilometers;

    public ClientsDTOStatisticsCars() {
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

    public double getAvgCarNrKilometers() {
        return avgCarNrKilometers;
    }

    public void setAvgCarNrKilometers(double avgCarNrKilometers) {
        this.avgCarNrKilometers = avgCarNrKilometers;
    }
}

