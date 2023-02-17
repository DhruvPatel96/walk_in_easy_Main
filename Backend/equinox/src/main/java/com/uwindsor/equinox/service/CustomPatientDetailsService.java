package com.uwindsor.equinox.service;

import com.uwindsor.equinox.entity.Patient;
import com.uwindsor.equinox.repository.PatientRepository;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Set;
import java.util.stream.Collectors;


public class CustomPatientDetailsService implements UserDetailsService {
    private PatientRepository patientRepository;

    public CustomPatientDetailsService(PatientRepository userRepository) {
        this.patientRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Patient patient = patientRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with username or email: "+ email));

        Set<GrantedAuthority> authorities = patient
                .getRoles()
                .stream()
                .map((role) -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toSet());

        return new org.springframework.security.core.userdetails.User(patient.getEmail(),
                patient.getPassword(),
                authorities);
    }
}
