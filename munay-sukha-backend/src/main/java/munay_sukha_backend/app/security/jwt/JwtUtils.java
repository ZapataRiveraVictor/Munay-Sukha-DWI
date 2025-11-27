package munay_sukha_backend.app.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import munay_sukha_backend.app.service.impl.UserDetailsImpl;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {

    // 1. Usar una clave Base64 fija y válida (más de 256 bits)
    // Esta cadena es "SecretKeyParaMunaySukhaTieneQueSerLargaYSegura123" en Base64
    private final String jwtSecret = "Tm9UZU9sdmlkZXNEZUNhbWJpYXJFc3RhQ2xhdmVQb3JVbmFTZWd1cmFFbkJhc2U2NA==";

    private final int jwtExpirationMs = 86400000;

    // 2. Método para obtener la llave criptográfica correcta
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateJwtToken(Authentication authentication) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256) // Usar la clave decodificada
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(getSignInKey()).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(getSignInKey()).build().parseClaimsJws(authToken);
            return true;
        } catch (Exception e) {
            // Loguear el error si es necesario
        }
        return false;
    }
}
