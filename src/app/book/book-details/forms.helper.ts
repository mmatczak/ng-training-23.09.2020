type FormValue<T> =
  | T
  | {
      value: T;
      disabled: boolean;
    };

export type FormModel<T> = {
  [P in keyof T]: FormValue<T[P]> | [FormValue<T[P]>, any?, any?];
}