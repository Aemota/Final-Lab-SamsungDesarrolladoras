import { Component, OnInit } from '@angular/core';
import { Socio } from './socio';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-reactivo',
  templateUrl: './formulario-reactivo.component.html',
  styleUrls: ['./formulario-reactivo.component.css']
})
export class FormularioReactivoComponent implements OnInit {

  contactform: FormGroup;
  socios: Socio[] = [];
  newSocio : Socio | null = null;



  constructor() {

    this.contactform = new FormGroup({
      nombre: new FormControl ('', [Validators.required, Validators.minLength(3)]),
      apellidos: new FormControl ('', [Validators.required, Validators.minLength(3)]),
      dni: new FormControl ('', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[0-9]{8}[A-Za-z]{1}')]),
      telefono: new FormControl ('', [Validators.required, Validators.pattern('[0-9]{9}')]),
      sexo: new FormControl ('', [Validators.required]),
    });

  }

  ngOnInit(): void {}


  registrar(): void
  {

		if (this.contactform.invalid || this.newSocio != null)
		{
			return;
		}

    // Nuevo usuario:

		let socio = new Socio();

		socio.nombre = this.contactform.value.nombre;
		socio.apellidos = this.contactform.value.apellidos;
		socio.numSocio = Math.floor(Math.random()*101);
		socio.dni = this.contactform.value.dni;
		socio.telefono = this.contactform.value.telefono;
		socio.sexo = this.contactform.value.sexo;

		// Añadimos usuario al array y reseteamos

		this.socios.push(socio);
		this.contactform.reset();

  }


  eliminar(event : MouseEvent, socio : Socio) : void
	{
		for (let i = this.socios.length -1; i >= 0; i--)
		{
			if (this.socios[i] == socio)
			{
				this.socios.splice(i, 1);
			}
		}

		if (this.newSocio != null && this.newSocio == socio)
		{
			this.contactform.reset();
			this.newSocio = null;
		}
  }

  modificar(event : MouseEvent, socio : Socio) : void
	{
		this.contactform.controls["nombre"].setValue(socio.nombre);
		this.contactform.controls["apellidos"].setValue(socio.apellidos);
		this.contactform.controls["dni"].setValue(socio.dni);
		this.contactform.controls["telefono"].setValue(socio.telefono);
		this.contactform.controls["sexo"].setValue(socio.sexo);


		this.newSocio = socio;
	}

  finModificar(event : MouseEvent, socio : Socio) : void
	{
		for (let s of this.socios)
		{
			if ( s == socio )
			{
				s.nombre = this.contactform.value.nombre;
				s.apellidos = this.contactform.value.apellidos;
				s.dni = this.contactform.value.dni;
				s.telefono = this.contactform.value.telefono;
				s.sexo = this.contactform.value.sexo;

				this.contactform.reset();
				this.newSocio = null;

        break;
      }
    }
  }

}
