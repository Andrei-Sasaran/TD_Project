package lab4.mpp.labb4.repo;

import lab4.mpp.labb4.domain.Address.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AddressRepository extends JpaRepository<Address,Long> {
    @Query("SELECT COUNT(c) FROM Client c WHERE c.address.address_id = :address_id")
    Integer countClientsByAddressId(@Param("address_id") Long address_id);
}
