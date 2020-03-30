import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TemaService} from '../../../services/tables/tema/tema.service';
import {ArtistaService} from '../../../services/tables/artista/artista.service';
import {Artistas} from '../artista/artista.component';
import {IdiomaService} from '../../../services/tables/idioma/idioma.service';
import {Idiomas} from '../idioma/idioma.component';
import {GeneroService} from '../../../services/tables/genero/genero.service';
import {Generos} from '../genero/genero.component';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {
  temas: Temas[] = [];
  artistas: Artistas[] = [];
  idiomas: Idiomas[] = [];
  generos: Generos[] = [];
  form: FormGroup;
  isEdit: boolean = false;
  idx: number;
  constructor( private temaService: TemaService, private artistaService: ArtistaService , private idiomaService: IdiomaService ,  private generoService: GeneroService , private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.temaService.getTemas('api/v1/tema/').subscribe( (data: any) => {
      this.temas = data;
      console.log(data);
    });
    this.artistaService.getArtistas('api/v1/artista/').subscribe( (data: any) => {
      this.artistas= data;
      console.log(data);
    });
    this.idiomaService.getIdiomas('api/v1/idioma/').subscribe( (data: any) => {
      this.idiomas = data;
      console.log(data);
    });
    this.generoService.getGeneros('api/v1/genero/').subscribe( (data: any) => {
      this.generos = data;
      console.log(data);
    });



    this.form = this.fb.group({
      titulo: ['', [Validators.required]],
      year: ['', [Validators.required]],
      idioma_id: ['', [Validators.required]],
      artista_id: ['', [Validators.required]],
      genero_id: ['', [Validators.required]]
    });
  }
  cleanForm() {
    this.isEdit = false;
    this.idx = null;
    this.form.setValue({
      titulo: '',
      year: '',
      idioma_id: '',
      artista_id: '',
      genero_id: ''
    });
  }
  editForm(temaId: number) {
    this.isEdit = true;
    // Actualizar form con datos de la nacionalidad creada
    const tema: any = this.temas.filter(temas => temas.id == temaId)[0];
    const { id, titulo, year, idioma_id, artista_id, genero_id} = tema;
    this.idx = id;
    this.form.setValue({
      titulo,
      year,
      idioma_id,
      artista_id,
      genero_id
    });
  }
  create() {
    if (this.form.valid) {
      this.temaService.create('api/v1/tema/create', this.form.value).subscribe((data: Temas) => {
        this.temas.push(data);
      });
    }

  }
  update() {
    if (this.form.valid) {
      this.temaService.update('api/v1/tema/update/' + this.idx, this.form.value).subscribe((data: any) => {
        const index = this.temas.findIndex(temas => temas.id == data.id);
        this.temas[index] = data;
      });
    }

  }
  delete( id: number ) {
    this.temaService.delete('api/v1/tema/delete/' + id).subscribe((data: any) => {
      const index = this.temas.findIndex(tema => tema.id == data.id);
      this.temas.splice(index, 1);
    });
  }





}

export interface Temas {
  id?: number;
  titulo: string;
  year: number;
  idioma_id: number;
  artista_id: number;
  genero_id: number;
}
