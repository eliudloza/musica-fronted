import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IdiomaService} from '../../../services/tables/idioma/idioma.service';
import {Nacionalidades} from '../nacionalidad/nacionalidad.component';

@Component({
  selector: 'app-idioma',
  templateUrl: './idioma.component.html',
  styleUrls: ['./idioma.component.css']
})
export class IdiomaComponent implements OnInit {
  idiomas: Idiomas[] = [];
  form: FormGroup;
  isEdit: boolean = false;
  idx: number;
  constructor( private idiomaService: IdiomaService, private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.idiomaService.getIdiomas('api/v1/idioma/').subscribe( (data: any) => {
      this.idiomas = data;
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
  editForm(idiomaId: number) {
    this.isEdit = true;
    // Actualizar form con datos del idioma creado
    const idioma: any = this.idiomas.filter(idiomas => idiomas.id == idiomaId)[0];
    const { id, nombre, descripcion} = idioma;
    this.idx = id;
    this.form.setValue({
      nombre,
      descripcion
    });
  }
  create() {
    if (this.form.valid) {
      this.idiomaService.create('api/v1/idioma/create', this.form.value).subscribe((data: Idiomas) => {
        this.idiomas.push(data);
      });
    }

  }
  update() {
    if (this.form.valid) {
      this.idiomaService.update('api/v1/idioma/update/' + this.idx, this.form.value).subscribe((data: any) => {
        const index = this.idiomas.findIndex(idiomas => idiomas.id == data.id);
        this.idiomas[index] = data;
      });
    }

  }
  delete( id: number ) {
    this.idiomaService.delete('api/v1/idioma/delete/' + id).subscribe((data: any) => {
      const index = this.idiomas.findIndex(idioma => idioma.id == data.id);
      this.idiomas.splice(index, 1);
    });
  }
}

export interface Idiomas {
  id?: number;
  nombre: string;
  descripcion: string;
}
