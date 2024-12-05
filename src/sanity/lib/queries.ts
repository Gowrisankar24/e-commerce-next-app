import { defineQuery } from 'next-sanity';

export const STARTUPS_QUERY =
    defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || category match $search || author->name match $search || title match $search] | order(createdAt desc){
      _id,
      title,
      slug,
      author -> {
        _id, name, image, bio
      }, 
      _createdAt,
      views,
      description,
      image,
      category,
      title,
}`);

export const STARTUP_ID_BY_QUERY = defineQuery(`
  *[_type=='startup'&& _id==$id][0]{
  _id,
  title,
  slug,
  author->{
    _id,
    name,
    username,
    bio,
    image
  },
  _createdAt,
  views,
  description,
  image,
  category,
  title,
  pitch
}
`);

export const STARTUP_VIEWS_QUERY = defineQuery(`
  *[_type== "startup" && _id == $id][0]{
  _id,views}
  `);
