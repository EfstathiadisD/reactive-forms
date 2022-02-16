import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormBuilder,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { delay, map, Observable, of } from 'rxjs';

interface SignUpProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  coupon: boolean;
  occupation: string;
  termsAndServices: boolean;
}

const Patterns = {
  numeric: /^[0-9]+/,
  stringLikeWithSpaces: /^[a-zA-Z0-9 ]*$/,
  email: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,
  phone: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
} as const;

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

@Component({
  selector: 'app-advance-form',
  templateUrl: './advance-form.component.html',
  styleUrls: ['./advance-form.component.css'],
})
export class AdvanceFormComponent {
  /* This is the List of Discount we iterate upon for the Occupation and Users */
  private readonly Users = ['Thomas', 'Jacob', 'Donald', 'Kim'];
  public readonly Occupations: string[] = [
    'Engineer',
    'Marketing',
    'Human Resources',
    'Sales Representative',
  ];

  constructor(private fb: FormBuilder) {}

  /* Constructring Form Builder Group */
  public form = this.fb.group(
    {
      name: this.getName(),
      email: this.getEmail(),
      password: this.getPassword(),
      confirmPassword: this.getConfirmPassword(),
      coupon: this.getCoupon(),
      occupation: this.getOcccupation(),
      termsAndServices: this.getTermsAndServices(),
    },
    { validators: Validation.match('password', 'confirmPassword') }
  );

  /* FormBuilder for Name*/
  private getName() {
    return this.fb.control(
      '',
      [Validators.required, Validators.pattern(Patterns.stringLikeWithSpaces)],
      [this.nameAsyncValidator()]
    );
  }

  /* FormBuilder for Email*/
  private getEmail() {
    return this.fb.control('', [
      Validators.required,
      Validators.pattern(Patterns.email),
    ]);
  }

  /* FormBuilder for Password*/
  private getPassword() {
    return this.fb.control('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(12),
    ]);
  }

  /* FormBuilder for Password Confirmation*/
  private getConfirmPassword() {
    return this.fb.control('', [Validators.required, Validators.min(4)]);
  }

  /* FormBuilder for Coupon*/
  private getCoupon() {
    return this.fb.control([false, []]);
  }

  /* FormBuilder for Occupation*/
  private getOcccupation() {
    return this.fb.control(['', []]);
  }

  /* FormBuilder for Terms And Services*/
  private getTermsAndServices() {
    return this.fb.control([false, [Validators.requiredTrue]]);
  }

  /* Accessor for easier targeting in the Controller and Template, for Name */
  public get name() {
    return this.form.get('name') as FormControl;
  }

  /* Accessor for easier targeting in the Controller and Template, for Email */
  public get email() {
    return this.form.get('email') as FormControl;
  }

  /* Accessor for easier targeting in the Controller and Template, for Password */
  get password() {
    return this.form.get('password');
  }

  /* Accessor for easier targeting in the Controller and Template, for Password Confirmation */
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  /* Accessor for easier targeting in the Controller and Template, for Coupon */
  public get coupon() {
    return this.form.get('coupon') as FormControl;
  }

  /* Accessor for easier targeting in the Controller and Template, for Occupation */
  public get occupation() {
    return this.form.get('occupation') as FormControl;
  }

  /* Accessor for easier targeting in the Controller and Template, for Terms And Services */
  get termsAndServices() {
    return this.form.get('termsAndServices');
  }

  /** This simulates an sync response. (i.e: APIs, State Updates etc.) */
  private userExists(name: string): Observable<boolean> {
    return of(this.Users.includes(name)).pipe(delay(750));
  }

  /** We can create AsyncValidators. It is a higher-order function. */
  private nameAsyncValidator(): AsyncValidatorFn {
    return (c: AbstractControl): Observable<ValidationErrors | null> => {
      return this.userExists(c.value).pipe(
        map((respone) => (respone ? { userExist: true } : null))
      );
    };
  }

  /* Method for Changing the Select */
  public onChange(event: Event) {
    if (event && event.target instanceof HTMLSelectElement) {
      this.occupation.setValue(event.target.value, {
        onlySelf: true,
      });
    }
  }

  /* Method for Resetting the Form */
  public onReset() {
    this.form.reset();
  }

  /* Method for Submitting the Form. (Imagine this does an HTTP Request) */
  public onSubmit() {
    return console.log(this.form.value);
  }
}
