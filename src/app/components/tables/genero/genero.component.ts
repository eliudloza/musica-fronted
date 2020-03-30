import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GeneroService} from '../../../services/tables/genero/genero.service';
import {Nacionalidades} from '../nacionalidad/nacionalidad.component';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})
export class GeneroComponent implements OnInit {
  generos: Generos[] = [];
  form: FormGroup;
  isEdit: boolean = false;
  idx: number;
  constructor( private generoService: GeneroService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.generoService.getGeneros('api/v1/genero/').subscribe( (data: any) => {
      this.generos = data;
      console.log(data);
    });
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
    });
  }
  cleanForm() {
    this.isEdit = false;
    this.idx = null;
    this.form.setValue({
      nombre: '',
      descripcion: ''
    });
  }
  editForm(generoId: number) {
    this.isEdit = true;
    // Actualizar form con datos del genero creado
    const genero: any = this.generos.filter(generos => generos.id == generoId)[0];
    const { id, nombre, descripcion} = genero;
    this.idx = id;
    this.form.setValue({
      nombre,
      descripcion
    });
  }
  create() {
    if (this.form.valid) {
      this.generoService.create('api/v1/genero/create', this.form.value).subscribe((data: Generos) => {
        this.generos.push(data);
      });
    }

  }
  update() {
    if (this.form.valid) {
      this.generoService.update('api/v1/genero/update/' + this.idx, this.form.value).subscribe((data: any) => {
        const index = this.generos.findIndex(generos => generos.id == data.id);
        this.generos[index] = data;
      });
    }

  }
  delete( id: number ) {
    this.generoService.delete('api/v1/genero/delete/' + id).subscribe((data: any) => {
      const index = this.generos.findIndex(genero => genero.id == data.id);
      this.generos.splice(index, 1);
    });
  }
}

export interface Generos {
  id?: number;
  nombre: string;
  descripcion: number;
}
