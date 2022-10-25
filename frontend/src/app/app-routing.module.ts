import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComparatorComponent } from './comparator/comparator.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'list', component: ListComponent },
    { path: 'comparator', component: ComparatorComponent },
    { path: 'edit/:id', component: UpdateComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
