import { UserTC } from './user.model';

// tipar la interfaz en gql
export const UserType = UserTC.getType();
export const UserTypeName = UserTC.getTypeName();
export const UserTypePlural = UserTC.getTypePlural().getTypeName();
export const UserTypeNotNull = UserTC.getTypeNonNull().getTypeName();
