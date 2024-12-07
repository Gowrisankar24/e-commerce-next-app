import 'server-only';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, token } from '../env';

export const write_token = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
});

if (!write_token.config().token) {
    throw new Error('Token not found');
}
