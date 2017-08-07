import {Injectable} from "@angular/core";
import {Task, TaskResource} from "./TaskResource";
import {Observable, Subscription} from "rxjs";
import {TaskListModel} from "../../taskList/services/TasklistModel";
import * as _ from "lodash";

@Injectable()
export class TaskModel {
    private tasks: Task[] = [];

    constructor(private taskListModel: TaskListModel,
                private resource: TaskResource) {
    }

    loadTasks(tasklistId?: string): Subscription {
        return this.getAllTasks(tasklistId).subscribe(tasks => this.tasks = tasks || []);
    }

    getLoadedTasks(): Task[] {
        return this.tasks;
    }


    getAllTasks(tasklistId?: string): Observable<Task[]> {

        return this.resource.findAll(tasklistId || this.taskListModel.getCurrentTasklistId())
            .map((res) => res.items);
    }

    getTask(id: string): Observable<Task> {
        return this.resource.findById(this.taskListModel.getCurrentTasklistId(), id);
    }

    createTask(task: Task): Subscription {
        let observable: Observable<Task> =
            this.resource.create(this.taskListModel.getCurrentTasklistId(), task);

        return observable.subscribe(task => this.tasks.push(task));
    }

    updateTask(task: Task): Subscription {
        let observable: Observable<Task> =
            this.resource.update(this.taskListModel.getCurrentTasklistId(), task);

        return observable.subscribe((task) => {
            this.tasks = _.map(this.tasks, (t) => {
                if (t.id == task.id) {
                    return task;
                }
                return t;
            });
        });
    }

    deleteTask(id: string): void {
        this.resource.delete(this.taskListModel.getCurrentTasklistId(), id)
            .subscribe(() => {
                _.remove(this.tasks, (task) => task.id == id);
            });
    }
}