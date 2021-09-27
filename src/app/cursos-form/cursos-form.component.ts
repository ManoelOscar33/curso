import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import { map, switchMap } from 'rxjs/operators';
import { CursosService } from '../cursos.service';


@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.css']
})
export class CursosFormComponent implements OnInit {

  constructor(
    private cursosService: CursosService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    /*
    this.route.params.subscribe(
      (params: any) => {
        const id = params['id'];
        console.log(id);
        const curso$ = this.cursosService.listaPorId(id);
        curso$.subscribe(curso => {
          this.atualizarForm(curso);
        });
      }
    )*/

    /*
    this.route.params
    .pipe(
      map((params: any) => params['id']),
      switchMap((id) => this.cursosService.listaPorId(id))
      //switchMap((cursos) => tobterAula())
    )*
    .subscribe((curso) => this.atualizarForm(curso));
      
      /* Para CREATE, UPDATE OU DELETE usar 
       concatMap -> A ORDEM DA REQUISIÇÃO IMPORTA.
       mergeMap -> A ordem da requisição não importa.
       exhaustMap -> casos de login
      */
    
  }

  /*
  atualizarForm(curso: any) {
    this.formulario.patchValue({
      id: curso.id,
      nome: curso.nome
    });
  }*/

  curso = this.route.snapshot.data['curso'];

  @Input() formulario: FormGroup = new FormGroup({
    "id": new FormControl(this.curso.id),
    "nome": new FormControl(this.curso.nome, [Validators.required, Validators.minLength(4), Validators.maxLength(50)])
  });

  
  salvar() {
    
      
      this.cursosService.salvarEditarOuCriar(this.formulario.value)
        .subscribe(
          (success) => { 
            alert('Procedimento realizado com sucesso'),
            this.router.navigate([''])
          },
          error => alert('Erro ao realizar o procedimento, tente novamente!'),
          () => console.log('Requisição completada com sucesso.')
        )
    
  }


}
