import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'match', async: false })
export class MatchValidator implements ValidatorConstraintInterface {
  public validate(value: string, args: ValidationArguments): boolean {
    const [relatedProperty] = args.constraints;
    const relatedValue = (args.object as any)[relatedProperty];
    return (
      `${value || ''}`.trim().length === 0 ||
      `${relatedValue || ''}`.trim().length === 0 ||
      value === relatedValue
    );
  }

  public defaultMessage?(args: ValidationArguments): string {
    const [relatedProperty] = args.constraints;
    return `${args.property}  must match ${relatedProperty} exactly`;
  }
}
