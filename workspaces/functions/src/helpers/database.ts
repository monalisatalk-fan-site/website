import * as admin from 'firebase-admin';
import { TypedDatabase } from '../../../shared/types/database';

export const database = (admin.database() as unknown) as TypedDatabase;
