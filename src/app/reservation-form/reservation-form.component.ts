import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css',
})
export class ReservationFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', Validators.required],
      roomNumber: ['', Validators.required],
    });

    // take the form of each time book reservation
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      let reservation = this.reservationService.getReservation(id);
      if (reservation) {
        this.reservationForm.patchValue(reservation);
      }
    }
  }
  reservationForm: FormGroup = new FormGroup({});
  onSubmit() {
    if (this.reservationForm.valid) {
      // take the value from the form and add to the service:
      let reservation: Reservation = this.reservationForm.value;
      // take the form of each time book reservation
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        // update the reservation
        this.reservationService.updateReservation(id, reservation);
      } else {
        // add a new reservation
        this.reservationService.addReservation(reservation);
      }
      this.router.navigate(['/list']);
    }
  }
}
