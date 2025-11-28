package munay_sukha_backend.app.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import munay_sukha_backend.app.service.impl.UserDetailsImpl;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {

    // Usamos una clave generada segura para evitar errores de Base64
    // Nota: Al reiniciar el servidor, los tokens antiguos dejarán de funcionar (es normal en desarrollo)
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    private final int jwtExpirationMs = 86400000; // 24 horas

    public String generateJwtToken(Authentication authentication) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(key) // Firmamos con la clave generada
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(authToken);
            return true;
        } catch (JwtException e) {
            // Token inválido
        }
        return false;
    }
}