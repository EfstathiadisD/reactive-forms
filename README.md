# Reactive Forms - Angular Zero 2 Hero

## The case for Reactive Forms

Forms in Angular can be used with one of 2 Paradigms. `Template Driven` and `Reactive`. We will discuss only `Reactive Forms` for a few reasons:

- Templates in Angular are NOT easy to follow. Unlike JSX, they have very little type safety and even Lib abstraction aren't meant to allow the reader to follow logic through them.
- Custom Validators, must be used as Directives. And since `TDF` as async, we need to ensure existance in several situations. (i.e: Dependant Forms)
- Several more reasons from 2 Way Binding. Difficulty to Tests(Need another component) and Magical Access to the Form controls.

## Basic Building Blocks

We have 4 Basic Building Blocks in Angular Forms. We will focus on the first 3, as the last one, will only be used when abstacting form elements. (i.e: Libs)

- `FormControl` tracks the value and validation status of an individual form control.
- `FormGroup` tracks the same values and status for a collection of form controls.
- `FormArray` tracks the same values and status for an array of form controls.
- `ControlValueAccessor` creates a bridge between Angular FormControl instances and built-in DOM elements.

The Hierarchy, is close to `FormArray <-> FormGroup -> FormControl`. FormGroups, can contain FormArray and vice-versa but FormControl, cannot. It is the simplest unit.

## How to use Reactive Forms

The package `@angular/forms` exposes the `ngModule` called `ReactiveFormsModule`. It needs to be imported and used at the `app.module.ts`.

```typescript
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    // other imports ...
    ReactiveFormsModule,
  ],
})
export class AppModule {}
```

Then in the component controller, we can import and use the previously mentioned building blocks:

```typescript
import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
 ...
})
export class NameEditorComponent {
  name = new FormControl("");
}
```

Accessing it, is as simple as associating the control on the template:

```html
<input id="name" type="text" [formControl]="name" />
```

The `FormControl` as well as the other blocks, has a set of methods accessible to them. Review the definitions for complete usages. For example:

```typescript
updateName() {
  /* Setter to programatically change the value from outside */
  this.name.setValue('Nancy');
}
```

## Validation

Unlike React, Angular provides a set of `Validators`. The Validator Class exposes, methods such as `required`, `min`, `max`, `minLength` but also more advance ones, like `email`, `pattern`, `nullValidator` and `compose` which let's you use multiple sync or async validators together as one.

In case you want to use something, that is not provided, you can create your own Validaotrs. Sync or Async. The only thing you need to do is return either `ValidatorFn` or an `AsyncValidatorFn`.

```typescript
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}
```

In case you want to validate 2 fields inside the same formGroup, you can use the third parameters, in a `FormGroup`.

```typescript
const heroForm = new FormGroup({
  name: new FormControl(),
  alterEgo: new FormControl(),
  power: new FormControl()
}, { validators: /*Some Validator that compares the fields*/ });
```
