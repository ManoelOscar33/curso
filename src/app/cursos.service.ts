import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from './cursos/curso';
import { delay, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}/cursos`;

  constructor(private http: HttpClient) { }

  listaDeCursos() {
    return this.http.get<Curso[]>(this.API)
      .pipe(
        delay(500),
        tap(console.log)
      )
  }

  
  listaPorId(id: number) {
    return this.http.get<Curso>(`${this.API}/${id}`).pipe(take(1))
  }

  criarCurso(curso: Curso): Observable<any> {
    return this.http.post(this.API, curso).pipe(take(1))

  }

  editarCurso(curso: Curso): Observable<any> {
    return this.http.put(`${this.API}/${curso.id}`, curso).pipe(take(1))
  }

  deletarCurso(id: any): Observable<any> {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1))
  }

  salvarEditarOuCriar(curso: any) {
    if (curso.id) {
      return this.editarCurso(curso)
    } else {
      return this.criarCurso(curso)
    }
      
  }
}
