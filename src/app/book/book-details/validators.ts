import { AbstractControl, ValidationErrors } from "@angular/forms";

export const maxLength = (max) => 
(control: AbstractControl): ValidationErrors | null => {
  return control.value.length > max ? { maxLength: true } : null;
};
