import { Component, inject, model } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreatePlanDto } from '../../api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-plan-dialog',
  imports: [MatDialogModule, MatFormField, MatLabel, FormsModule, CommonModule, MatInputModule, MatButtonModule],
  templateUrl: './plan-dialog.component.html',
  styleUrl: './plan-dialog.component.scss'
})
export class PlanDialogComponent {
  readonly dialogRef = inject(MatDialogRef<PlanDialogComponent>);
  readonly data = inject<CreatePlanDto>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }

}
