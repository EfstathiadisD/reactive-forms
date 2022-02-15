import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { delay, map, Observable, of } from 'rxjs';

export class Validation {
  static match(cName: string, matchingCName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(cName);
      const checkControl = controls.get(matchingCName);
      if (checkControl?.errors && !checkControl.errors['matchingRequired']) {
        return null;
      }
      if (control?.value !== checkControl?.value) {
        controls.get(matchingCName)?.setErrors({ matchingRequired: true });
        return { matchingRequired: true };
      } else {
        return null;
      }
    };
  }
}

const Patterns = {
  stringLikeWithSpaces: /^[a-zA-Z0-9]*/,
  numeric: /[0-9]/,
  currency: /[0-9,]*/,
};

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.css'],
})
export class BasicFormComponent {
  private readonly usersList = ['Thomas', 'Jacob', 'Donald', 'Kim'];
  constructor(private fb: FormBuilder) {}

  form = this.fb.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(Patterns.stringLikeWithSpaces),
        ],
        [this.nameAsyncValidator()],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(12),
        ],
      ],
      confirmPassword: ['', [Validators.required, Validators.min(4)]],
      termsAndServices: [false, [Validators.requiredTrue]],
    },
    { validators: Validation.match('password', 'confirmPassword') }
  );

  /** This simulates an sync response. (i.e: APIs, State Updates etc.)
   *
   * Imagine, we query an API and either check the names, or
   * we read from a State that periodically updates.
   **/
  private userExists(name: string): Observable<boolean> {
    return of(this.usersList.includes(name)).pipe(delay(500));
  }

  /** We can create AsyncValidators. It is a higher-order function.
   *
   * The inner function accepts an AbstractControl. That will give the validator
   * access to the control value. Without us needing to do anything.
   */
  private nameAsyncValidator(): AsyncValidatorFn {
    return (c: AbstractControl): Observable<ValidationErrors | null> => {
      return this.userExists(c.value).pipe(
        map((respone) => (respone ? { userExist: true } : null))
      );
    };
  }

  public onSubmit() {
    return console.log(this.form.value);
  }

  public onReset() {
    this.form.reset();
  }

  /* Helper Utilities to target Fields easier in HTML */
  get name() {
    return this.form.get('name');
  }
  get password() {
    return this.form.get('password');
  }
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
  get termsAndServices() {
    return this.form.get('termsAndServices');
  }
}
