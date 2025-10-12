import type z from 'zod';
import type { SchemaRegistrationForm } from '../schemas';

export type TRegistrationForm = z.infer<typeof SchemaRegistrationForm>;
