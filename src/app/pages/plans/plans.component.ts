import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPlanDto, PlanService } from '../../api';
import { lastValueFrom } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-plans',
    standalone: true,
    imports: [CommonModule, MatCheckboxModule, FormsModule],
    templateUrl: './plans.component.html',
    styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {

    private readonly _planApi = inject(PlanService);

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
        await lastValueFrom(this._planApi.updateUserPlanById(plan)).then(() => {
            console.log('Terv frissítve')
        })
    }
}
