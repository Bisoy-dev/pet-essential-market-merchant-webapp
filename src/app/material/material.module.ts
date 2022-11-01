import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatDividerModule } from '@angular/material/divider'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatCommonModule } from '@angular/material/core'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatMenuModule } from '@angular/material/menu'

const material = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatDividerModule,
  MatExpansionModule,
  MatCommonModule,
  MatGridListModule,
  MatSnackBarModule,
  MatMenuModule
]
@NgModule({
  declarations: [],
  imports: [material],
  exports : [material]
})
export class MaterialModule { }
