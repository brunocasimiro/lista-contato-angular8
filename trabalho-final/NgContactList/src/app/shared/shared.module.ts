import { InputTextComponent } from "./components/input-text/input-text.component";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { IonicModule } from '@ionic/angular';
import { MaskDirective } from '../directives/mask.directive';

@NgModule({
  declarations: [
    InputTextComponent,
    MaskDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [
    InputTextComponent
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        DatePipe
      ]
    }
  }
}
