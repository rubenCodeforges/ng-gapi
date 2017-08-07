import {Component} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormService} from "../../../common/form/FormService";
import {FormControl, FormGroup} from "@angular/forms";
import {TaskListModel} from "../services/TasklistModel";
import {Tasklist} from "../services/TasklistResource";
import {Observable} from "rxjs";

@Component({
    selector: 'tasklist-create-modal',
    template: require('./tasklistCreateModal.html')
})
export class TasklistCreateModalComponent {

    public newTasklist: Tasklist = <Tasklist> {};

    constructor(private activeModal: NgbActiveModal,
                private model: TaskListModel) {
    }

    public onSubmit(form: FormGroup) {
        if (form.invalid) {
            FormService.markFormControlsTouched(form);
            return;
        }
        Observable.of(this.model.createTasklist(this.newTasklist))
            .subscribe(() => this.onClose());
    }

    public onClose() {
        this.activeModal.close();
    }


    public hasError(formControl: FormControl, errorType: string = "required"): boolean {
        return FormService.hasError(formControl, errorType);
    }
}