import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private reservations: Reservation[] = [];

  //CRUD: CREATE, READ, UPDATE, DELETE

  // using LocalStorage
  constructor() {
    let reservations = localStorage.getItem('reservations');
    if (reservations) this.reservations = JSON.parse(reservations);
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservation(id: string): Reservation | undefined {
    return this.reservations.find((res) => res.id === id);
  }

  addReservation(reservation: Reservation): void {
    reservation.id = Date.now().toString();
    this.reservations.push(reservation);
    // console.log(this.reservations);
    this.saveReservation();
  }

  deleteReservation(id: string): void {
    let index = this.reservations.findIndex((res) => res.id === id);
    this.reservations.splice(index, 1);
    this.saveReservation();
  }

  updateReservation(id: string, updatedReservation: Reservation): void {
    // find the index of the current task:
    let index = this.reservations.findIndex((res) => res.id === id);
    this.reservations[index] = updatedReservation;
  }

  private saveReservation() {
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
}
