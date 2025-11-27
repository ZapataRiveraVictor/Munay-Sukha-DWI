package munay_sukha_backend.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import munay_sukha_backend.app.model.ItemPedido;
import java.util.List;

public interface ItemPedidoRepository extends JpaRepository<ItemPedido, Long> {
    // Métodos específicos si los necesitas para reportes
}
