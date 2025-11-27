package munay_sukha_backend.app.security.jwt;

import io.jsonwebtoken.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import munay_sukha_backend.app.service.impl.UserDetailsImpl;
import munay_sukha_backend.app.service.impl.UserDetailsServiceImpl;

import java.util.Date;

@Component
public class JwtUtils {
    private final String jwtSecret = "Tu_Clave_Secreta_Muy_Larga_y_Compleja_aqui";
    private final int jwtExpirationMs = 86400000;

    public String generateJwtToken(Authentication authentication) {

        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername())) 
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }
}
