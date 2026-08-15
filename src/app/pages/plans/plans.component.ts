import { Component, inject, OnInit, signal } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { CreatePlanDto, ListPlanDto, PlanService } from '../../api';
import { lastValueFrom } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { PlanDialogComponent } from '../../components/plan-dialog/plan-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-plans',
    standalone: true,
    imports: [CommonModule, MatCheckboxModule, FormsModule, MatDialogModule, MatButtonModule, MatIconModule],
    templateUrl: './plans.component.html',
    styleUrls: ['./plans.component.scss'],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(-8px)' }),
                animate('220ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ]),
            transition(':leave', [
                animate('180ms ease-in', style({ opacity: 0, transform: 'translateY(8px)' }))
            ])
        ])
    ]
})
export class PlansComponent implements OnInit {

    private readonly _planApi = inject(PlanService);

    private readonly dialog = inject(MatDialog);

    plans = signal<ListPlanDto[]>([]);

    completedPlans = signal<ListPlanDto[]>([]);

    remainingPlans = signal<ListPlanDto[]>([]);

    async ngOnInit(): Promise<void> {
        await this.load();
    }

    async load() {
        await lastValueFrom(this._planApi.getAllByUser()).then((plans) => {
            this.plans.set(plans);
        });

        this.completedPlans.set(this.plans().filter(x => x.isCompleted));

        this.remainingPlans.set(this.plans().filter(x => !x.isCompleted));
    }

    async changePlanStatus(plan: ListPlanDto, value: boolean) {
        plan.isCompleted = value;
        await lastValueFrom(this._planApi.updateUserPlanById(plan)).then(async () => {
            await this.load();
        })
    }

    async saveNewPlan(plan: CreatePlanDto) {
        await lastValueFrom(this._planApi.addPlan(plan));
    }

    async deletePlan(planId: string) {
        await lastValueFrom(this._planApi.deleteUserPlanById(planId));
        await this.load();
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(PlanDialogComponent, {
            data: { title: '', description: '' },
            width: '92vw',
            maxWidth: '480px'
        });

        dialogRef.afterClosed().subscribe(async result => {
            if (result !== undefined) {
                if (result.title.length > 0 && result.description.length > 0) {
                    await this.saveNewPlan(result);
                    await this.load();
                }
            }
        });
    }
}
