package com.uwindsor.equinox.repository;

import com.uwindsor.equinox.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByEmail(String email);
    Boolean existsByEmail(String email);
}
