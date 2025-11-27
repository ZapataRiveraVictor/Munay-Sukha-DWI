package munay_sukha_backend.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import munay_sukha_backend.app.model.EstadoPedido;
import munay_sukha_backend.app.model.Pedido;
import munay_sukha_backend.app.model.Usuario;
import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    // Para que el cliente vea su historial de pedidos
    List<Pedido> findByUsuarioOrderByFechaCreacionDesc(Usuario usuario); 
    
    // Para que el administrador vea todos los pedidos pendientes
    List<Pedido> findByEstado(EstadoPedido estado);
}
