import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComparatorComponent } from './comparator/comparator.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
    // { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ListComponent },
    { path: 'comparator', component: ComparatorComponent },
    { path: 'edit/:id', component: UpdateComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
