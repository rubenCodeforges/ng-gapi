import {Injectable} from "@angular/core";
import {Tasklist, TaskListResource} from "./TasklistResource";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import * as _ from "lodash";

@Injectable()
export class TaskListModel {
    private currentTasklistId: string;
    private tasklists: Tasklist[] = [];

    constructor(private resource: TaskListResource,
                private router: Router) {
    }

    loadTasklist() {
        this.getAllTasklists().subscribe(tasklists => this.tasklists = tasklists);
    }

    getLoadedTasklists(): Tasklist[] {
        return this.tasklists;
    }

    setCurrentTasklistId(tasklistId: string) {
        this.currentTasklistId = tasklistId;
    }

    getCurrentTasklistId(): string {
        return this.currentTasklistId;
    }

    getAllTasklists(): Observable<Tasklist[]> {
        return this.resource.findAll().map((res) => res.items);
    }

    getTasklist(id: string): Observable<Tasklist> {
        return this.resource.findById(id);
    }

    createTasklist(tasklist: Tasklist): Subscription {
        return this.resource.create(tasklist)
            .subscribe(() => this.tasklists.push(tasklist));
    }

    updateTasklist(tasklist: Tasklist): Subscription {
        let observable: Observable<Tasklist> = this.resource.update(tasklist);

        return observable.subscribe((tasklist) => {
            this.tasklists = _.map(this.tasklists, (tl) => {
                if (tl.id == tasklist.id) {
                    return tasklist;
                }
                return tl;
            });
        });
    }

    deleteCurrentTasklist(): void {
        this.resource.delete(this.currentTasklistId).subscribe(() => {
            _.remove(this.tasklists, (tasklist) => tasklist.id == this.currentTasklistId);
            this.currentTasklistId = undefined;
            this.router.navigateByUrl("");
        });
    }
}