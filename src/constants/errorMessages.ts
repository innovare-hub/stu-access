export const validationErrors = {
  fieldIsRequired(field: string) {
    return `The field "${field}" is required.`;
  },
  shortLength(field: string, length: number) {
    return `The "${field}" field must be at least of ${length} length.`;
  },
  invalidType(field: string, type: string) {
    return `The "${field}" field must be of ${type} type.`;
  },
  noEmailPassword: 'Both Email and Password must be provided',
  notValidEmail: 'Provided string is not a valid email',
  passwordsNoMatch: 'The passwords do not match',
  noUser: 'User not found',
};
