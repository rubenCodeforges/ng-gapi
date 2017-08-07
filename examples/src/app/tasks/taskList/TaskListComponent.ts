import {Component} from "@angular/core";
import {TaskListModel} from "./services/TasklistModel";
import {Tasklist} from "./services/TasklistResource";

@Component({
    selector: 'tasklist',
    template: require('./taskList.html')
})
export class TaskListComponent {
    constructor(private model: TaskListModel) {
        this.model.loadTasklist();
    }

    public getTasklists(): Tasklist[] {
        return this.model.getLoadedTasklists();
    }
}