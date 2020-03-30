import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NacionalidadService} from '../../../services/tables/nacionalidad/nacionalidad.service';

@Component({
  selector: 'app-nacionalidad',
  templateUrl: './nacionalidad.component.html',
  styleUrls: ['./nacionalidad.component.css']
})
export class NacionalidadComponent implements OnInit {
  nacionalidades: Nacionalidades[] = [];
  form: FormGroup;
  isEdit: boolean = false;
  idx: number;
  constructor(private nacionalidadService: NacionalidadService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.nacionalidadService.getNacionalidades('api/v1/nacionalidad/').subscribe( (data: any) => {
      this.nacionalidades = data;
      console.log(data);
    });
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      abreviacion: ['', [Validators.required]]
    });
  }
  cleanForm() {
    this.isEdit = false;
    this.idx = null;
    this.form.setValue({
      nombre: '',
      abreviacion: ''
    });
  }
  editForm(nacionalidadId: number) {
    this.isEdit = true;
    // Actualizar form con datos de la nacionalidad creada
    const nacionalidad: any = this.nacionalidades.filter(nacionalidades => nacionalidades.id == nacionalidadId)[0];
    const { id, nombre, abreviacion} = nacionalidad;
    this.idx = id;
    this.form.setValue({
      nombre,
      abreviacion
    });
  }
  create() {
    if (this.form.valid) {
      this.nacionalidadService.create('api/v1/nacionalidad/create', this.form.value).subscribe((data: Nacionalidades) => {
        this.nacionalidades.push(data);
      });
    }

  }
  update() {
    if (this.form.valid) {
      this.nacionalidadService.update('api/v1/nacionalidad/update/' + this.idx, this.form.value).subscribe((data: any) => {
        const index = this.nacionalidades.findIndex(nacionalidades => nacionalidades.id == data.id);
        this.nacionalidades[index] = data;
      });
    }

  }
  delete( id: number ) {
    this.nacionalidadService.delete('api/v1/nacionalidad/delete/' + id).subscribe((data: any) => {
      const index = this.nacionalidades.findIndex(nacionalidad => nacionalidad.id == data.id);

      this.nacionalidades.splice(index, 1);
    });
  }
}
export interface Nacionalidades {
  id?: number;
  nombre: string;
  abreviacion: string;
}
