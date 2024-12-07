import { type SchemaTypeDefinition } from 'sanity';
import { author } from './author';
import { Startups } from './startups';
import { playlist } from './palylist';

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [author, Startups, playlist],
};
