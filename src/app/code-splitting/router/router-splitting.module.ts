import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterSplittingDemoComponent } from './router-splitting-demo.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MyTableComponent } from './components/my-table/my-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MyTreeComponent } from './components/my-tree/my-tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MyDashboardComponent } from './components/my-dashboard/my-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';



@NgModule({
  declarations: [RouterSplittingDemoComponent, AddressFormComponent, MyTableComponent, MyTreeComponent, MyDashboardComponent],
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path : '' , component : RouterSplittingDemoComponent }
    ]),

    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTreeModule,
    MatIconModule,
    MatGridListModule,
    MatMenuModule,
    LayoutModule
  ]
})
export class RouterSplittingModule { }
