import Logger from '@/infra/logger';
import createOperationError from './OperationError';

export { InvalidDataError } from './InvalidDataError';
export { NotAuthorizedError } from './NotAuthorizedError';
export { NotFoundError } from './NotFoundError';

export const OperationError = createOperationError(Logger('infra'));
