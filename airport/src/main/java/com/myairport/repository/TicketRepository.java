package com.myairport.repository;

import com.myairport.domain.Ticket;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Ticket entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
