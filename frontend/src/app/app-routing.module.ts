import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComparatorComponent } from './comparator/comparator.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
    // { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ListComponent },
    { path: 'comparator', component: ComparatorComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
