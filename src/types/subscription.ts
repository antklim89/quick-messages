import { z } from 'zod';
import { subscriptionSchema } from '../schemas/subscriptionSchema';


export type ISubscription = z.infer<typeof subscriptionSchema>;
