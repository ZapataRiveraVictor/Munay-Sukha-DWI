package munay_sukha_backend.app.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import munay_sukha_backend.app.model.*;
import munay_sukha_backend.app.repository.UsuarioRepository;
import munay_sukha_backend.app.service.PedidoService;
import java.util.List;

@RestController
@RequestMapping("api/pedidos")
public class PedidoController {

    private final PedidoService pedidoService;
    private final UsuarioRepository usuarioRepository;

    public PedidoController(PedidoService pedidoService, UsuarioRepository usuarioRepository) {
        this.pedidoService = pedidoService;
        this.usuarioRepository = usuarioRepository;
    }

    // POST: /api/pedidos/checkout (RUTA PROTEGIDA: Solo usuarios autenticados)
    @PostMapping("/checkout")
    public ResponseEntity<?> realizarCheckout(@RequestBody Pedido pedido,
            @AuthenticationPrincipal UserDetails userDetails) {
        try {
            // Obtener el objeto Usuario completo a partir del email autenticado (principal)
            Usuario usuario = usuarioRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new Exception("Usuario no encontrado en la base de datos."));

            // El cuerpo de la petición debe incluir los ítems del carrito
            Pedido nuevoPedido = pedidoService.crearPedido(usuario, pedido, pedido.getItems());
            return ResponseEntity.ok(nuevoPedido);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al procesar el pedido: " + e.getMessage());
        }
    }

    // GET: /api/pedidos (RUTA PROTEGIDA: Solo para ADMIN - configurado en
    // SecurityConfig)
    @GetMapping
    public ResponseEntity<List<Pedido>> getAllPedidos() {
        return ResponseEntity.ok(pedidoService.findAll());
    }

    // PUT: /api/pedidos/{id}/estado (RUTA PROTEGIDA: Solo para ADMIN)
    @PutMapping("/{id}/estado")
    public ResponseEntity<?> actualizarEstado(@PathVariable Long id, @RequestParam EstadoPedido estado) {
        try {
            Pedido pedidoActualizado = pedidoService.actualizarEstado(id, estado);
            return ResponseEntity.ok(pedidoActualizado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
