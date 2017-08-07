import {Component} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormService} from "../../../common/form/FormService";
import {FormControl, FormGroup} from "@angular/forms";
import {TaskListModel} from "../services/TasklistModel";
import {Task} from "../services/TaskResource";
import {TaskModel} from "../services/TaskModel";
import {Observable} from "rxjs";

@Component({
    selector: 'task-create-modal',
    template: require('./taskCreateModal.html')
})
export class TaskCreateModalComponent {

    public task: Task = <Task> {};

    constructor(private activeModal: NgbActiveModal,
                private model: TaskModel) {
    }

    public onSubmit(form: FormGroup) {
        if (form.invalid) {
            FormService.markFormControlsTouched(form);
            return;
        }
        Observable.of(this.model.createTask(this.task))
            .subscribe(() => this.onClose());
    }

    public onClose() {
        this.activeModal.close();
    }


    public hasError(formControl: FormControl, errorType: string = "required"): boolean {
        return FormService.hasError(formControl, errorType);
    }
}