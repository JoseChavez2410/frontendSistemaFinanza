import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  public registroForm: FormGroup;

  constructor(private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,) {
    this.registroForm = this.formBuilder.group({
      name: [null, {
        validators: [Validators.required]
      }],
      email: [null, {
        validators: [Validators.required]
      }],
      password: [null, {
        validators: [Validators.required]
      }]
    })
  }

  ngOnInit(): void {
  }

  registro(): void {
    if (this.registroForm.get('name')?.value === null) {
      Swal.fire({
        icon: 'warning',
        title: 'Trabajo autonomo',
        text: `Ingrese email.`,
        timer: 3000,
        toast: true,
        position: 'bottom-end',
        timerProgressBar: true,
        showConfirmButton: false
      });
      return;
    }

    if (this.registroForm.get('email')?.value === null) {
      Swal.fire({
        icon: 'warning',
        title: 'Trabajo autonomo',
        text: `Ingrese email.`,
        timer: 3000,
        toast: true,
        position: 'bottom-end',
        timerProgressBar: true,
        showConfirmButton: false
      });
      return;
    }

    if (this.registroForm.get('password')?.value === null) {
      Swal.fire({
        icon: 'warning',
        title: 'Trabajo autonomo',
        text: `Ingrese contraseña.`,
        timer: 3000,
        toast: true,
        position: 'bottom-end',
        timerProgressBar: true,
        showConfirmButton: false
      });
      return;
    }


    const body = {
      name:this.registroForm.get('name')?.value,
      email:this.registroForm.get('email')?.value,
      password:this.registroForm.get('password')?.value
    };


    this.authService.registro(body).subscribe({
      next: (res: any) => {
        this.router.navigate(['/', 'login']);
        Swal.fire({
          icon: 'success',
          title: `Trabajo autonomo`,
          text: 'Registrado exitosamente',
          timer: 3500,
          toast: true,
          position: 'bottom-end',
          timerProgressBar: true,
          showConfirmButton: false
        });
      },
      error: (err: any) => {
        const response = err.error;
        Swal.fire({
          icon: 'warning',
          title: `Trabajo autonomo`,
          text: response.message,
          timer: 3500,
          toast: true,
          position: 'bottom-end',
          timerProgressBar: true,
          showConfirmButton: false
        });
      }
    });
  }




}
