export const Message = {
    PASSWORD_TOO_WEAK: 'Password too weak',
    USER_ROLES_INVALID: 'User must have at least one role',
    USER_EMAIL_INVALID: 'Please, introduce a valid email',
    MONGO_DUPLICATE_UNIQUE_FIELD: (field: string) =>
        `Error duplicate unique field ${field}`,
};
