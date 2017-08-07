import {Component} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'delete-confirmation-modal',
    template: require('./deleteConfirmationModal.html'),
})
export class DeleteConfirmationModal {

    constructor(private activeModal: NgbActiveModal) {
    }

    public onConfirmation() {
        this.activeModal.close({confirmed: true});
    };

    public onClose() {
        this.activeModal.close({confirmed: false});
    }

}
