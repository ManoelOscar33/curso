import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosFormComponent } from './cursos-form/cursos-form.component';
import { CursosComponent } from './cursos/cursos.component';
import { CursoResolverGuard } from './cursos/guarda/curso-resolver.guard';
//import { CursoResolverGuard } from './cursos/guarda/curso-resolver.guard';


const routes: Routes = [
  {path: '', component: CursosComponent},
  {
    path: 'novo', 
    component: CursosFormComponent,
    resolve: {
      curso: CursoResolverGuard
    }
  },
  {
    path: 'editar/:id', 
    component: CursosFormComponent,
    resolve: {
      curso: CursoResolverGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
