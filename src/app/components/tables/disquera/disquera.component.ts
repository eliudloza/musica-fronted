import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DisqueraService} from '../../../services/tables/disquera/disquera.service';
import {Nacionalidades} from '../nacionalidad/nacionalidad.component';

@Component({
  selector: 'app-disquera',
  templateUrl: './disquera.component.html',
  styleUrls: ['./disquera.component.css']
})
export class DisqueraComponent implements OnInit {
  disqueras: Disqueras[] = [];
  form: FormGroup;
  isEdit: boolean = false;
  idx: number;
  constructor(private disqueraService: DisqueraService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.disqueraService.getDisqueras('api/v1/disquera/').subscribe( (data: any) => {
      this.disqueras = data;
      console.log(data);
    });
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
    });
  }
  cleanForm() {
    this.isEdit = false;
    this.idx = null;
    this.form.setValue({
      nombre: ''
    });
  }
  editForm(disqueraId: number) {
    this.isEdit = true;
    // Actualizar form con datos de la nacionalidad creada
    const disquera: any = this.disqueras.filter(disqueras => disqueras.id == disqueraId)[0];
    const { id, nombre} = disquera;
    this.idx = id;
    this.form.setValue({
      nombre
    });
  }
  create() {
    if (this.form.valid) {
      this.disqueraService.create('api/v1/disquera/create', this.form.value).subscribe((data: Disqueras) => {
        this.disqueras.push(data);
      });
    }

  }
  update() {
    if (this.form.valid) {
      this.disqueraService.update('api/v1/disquera/update/' + this.idx, this.form.value).subscribe((data: any) => {
        const index = this.disqueras.findIndex(disqueras => disqueras.id == data.id);
        this.disqueras[index] = data;
      });
    }

  }
  delete( id: number ) {
    this.disqueraService.delete('api/v1/disquera/delete/' + id).subscribe((data: any) => {
      const index = this.disqueras.findIndex(disquera => disquera.id == data.id);

      this.disqueras.splice(index, 1);
    });
  }
}

export interface Disqueras {
  id?: number;
  nombre: string;
}
