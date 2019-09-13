import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ContactListComponent } from 'src/app/components/contact-list/contact-list.component';
import { CourseFilterPipe } from 'src/app/pipes/contact-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [
    ContactListComponent,
    CourseFilterPipe,
    HomePage
  ]
})
export class HomePageModule {}
