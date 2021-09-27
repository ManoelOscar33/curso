import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { CursosFormComponent } from '../cursos-form/cursos-form.component';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  //cursos: Curso[] = [];

  cursos$: any;
  error$ = new Subject<boolean>();
  

  constructor(
    private cursosService: CursosService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  //curso = this.route.snapshot.data['curso'];

  
  /*formulario: FormGroup = new FormGroup({
    "id": new FormControl(this.curso.id),
    "nome": new FormControl(this.curso.nome, [Validators.required, Validators.minLength(4), Validators.maxLength(50)])
  });*/

  ngOnInit(): void {
    //this.cursosService.listaDeCursos()
    // .subscribe((dados) => this.cursos = dados);

    
    this.onRefresh();

  }

  onRefresh() {
    this.cursos$ = this.cursosService.listaDeCursos()
     .pipe(
       catchError(error => {
        console.error(error)
        this.error$.next(true)
        return of();
       })
      );
  }

  editar(id: any) {
    return this.router.navigate(['editar', id], {relativeTo: this.route})
    
  }

  /*
  salvar() {
    this.cursosService.editarCurso(this.formulario.value)
        .subscribe(
          (success) => { 
            alert('Procedimento realizado com sucesso'),
            this.router.navigate([''])
          },
          error => alert('Erro ao realizar o procedimento, tente novamente!'),
          () => console.log('Requisição completada com sucesso.')
        )
  }*/

  

  
  

  deletarCurso(id: any) {
    this.cursosService.deletarCurso(id)
      .pipe(
        delay(100)
      )
      .subscribe(
      sucess => {
        console.log('Remoção requisitada com sucesso.')
      },
      error => alert('Erro ao remover curso, tente novamente!'),
      () =>  {
        this.onRefresh()
        alert('Procedimento realizado com sucesso.')
      }//alert('Remoção completada com sucesso.')//console.log('Remoção completada com sucesso.')
    )
  }
    

}

