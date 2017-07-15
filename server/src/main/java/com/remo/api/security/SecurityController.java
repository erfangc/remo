package com.remo.api.security;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("api/security")
public class SecurityController {
    private SecurityRepository securityRepository;

    public SecurityController(SecurityRepository securityRepository) {
        this.securityRepository = securityRepository;
    }

    @PutMapping
    public ResponseEntity<Security> put(@Valid @RequestBody Security security) {
        return persist(security);
    }

    @DeleteMapping("{securityIDType}/{securityID}")
    public ResponseEntity<?> delete(@PathVariable String securityIDType, @PathVariable String securityID) {
        securityRepository.delete(new SecurityKey().setSecurityID(securityID).setSecurityIDType(securityIDType));
        return ResponseEntity.ok("");
    }

    @GetMapping("{securityIDType}/{securityID}")
    public Security get(@PathVariable String securityIDType, @PathVariable String securityID) {
        return securityRepository.findOne(
                new SecurityKey()
                        .setSecurityIDType(securityIDType)
                        .setSecurityID(securityID)
        );
    }

    @PostMapping
    public ResponseEntity<Security> post(@Valid @RequestBody Security security) {
        return persist(security);
    }

    private ResponseEntity<Security> persist(Security security) {
        security.getSecurityForeignIdentifiers().forEach(fID -> {
            fID.setSecurity(security);
            fID.setSecurityID(security.getSecurityKey().getSecurityID());
            fID.setSecurityIDType(security.getSecurityKey().getSecurityIDType());
        });
        Security saved = securityRepository.save(security);
        return ResponseEntity.ok(saved);
    }

}
