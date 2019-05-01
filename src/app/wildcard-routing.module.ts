import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '**',
                component: NotFoundComponent
            }
        ])
    ],
    declarations: [
        NotFoundComponent
    ],
    exports: [
        RouterModule
    ]
})
export class WildcardRoutingModule { }