import {FormControl, FormGroup} from "@angular/forms";
import * as _ from "lodash";

export class FormService {
    public static hasError(formControl: FormControl, errorType: string = "required"): boolean {
        if (!formControl) {
            return;
        }
        return formControl.hasError(errorType) && formControl.touched;
    }

    public static markFormControlsTouched(form: FormGroup) {
        _.each(form.controls, (control: FormControl) => {
            control.markAsTouched();
        });
    }

}