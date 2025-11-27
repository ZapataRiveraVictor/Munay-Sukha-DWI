package munay_sukha_backend.app.config; // <--- Asegúrate que coincida con tu paquete

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import munay_sukha_backend.app.model.Role;
import munay_sukha_backend.app.model.Usuario;
import munay_sukha_backend.app.repository.RoleRepository;
import munay_sukha_backend.app.repository.UsuarioRepository;

import java.util.Collections;
import java.util.Optional;

@Component
public class DataLoader implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(UsuarioRepository usuarioRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // 1. Crear Roles si no existen
        crearRolSiNoExiste("ROLE_ADMIN");
        crearRolSiNoExiste("ROLE_CLIENTE");

        // 2. Crear Usuario de Prueba si no existe
        if (!usuarioRepository.existsByEmail("cliente@munay.com")) {
            Usuario usuario = new Usuario();
            usuario.setNombreCompleto("Cliente Test");
            usuario.setEmail("cliente@munay.com");
            // ¡Aquí Spring encripta la contraseña automáticamente!
            usuario.setPassword(passwordEncoder.encode("password123")); 
            
            // Asignar rol
            Role rolCliente = roleRepository.findByNombre("ROLE_CLIENTE").get();
            usuario.setRoles(Collections.singleton(rolCliente));

            usuarioRepository.save(usuario);
            System.out.println(">>> Usuario de prueba creado: cliente@munay.com / password123");
        }
    }

    private void crearRolSiNoExiste(String nombre) {
        if (roleRepository.findByNombre(nombre).isEmpty()) {
            Role rol = new Role();
            rol.setNombre(nombre);
            roleRepository.save(rol);
        }
    }
}