import { defineQuery } from 'next-sanity';

export const STARTUPS_QUERY = defineQuery(`
  *[_type == "startup" && defined(slug.current) && !defined($search) || category match $search || author->name match $search || title match $search] | order(_createdAt desc){
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
  _id,views
  }
`);

export const AUTHOR_FIND_PROVIDER_BY_ID = defineQuery(
    `*[ _type=='author'&& id==$id][0]{
       _id,
       id,
       name,
       email,
       username,
       image,
       bio
     }`
);

export const AUTHOR_BY_USERID = defineQuery(`
  *[_type == 'author' && _id == $id][0]{
    _id,
    id,
    name,
    email,
    username,
    image,
    bio
  }
`);

export const STARTUPS_BY_USER_QUERY = defineQuery(`
  *[_type == "startup" &&  author._ref == $id] | order(_createdAt desc){
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

export const PLAYLIST_USER_BY_ID = defineQuery(`
  *[_type == "playlist" && slug.current == $slug.current | order(_createdAt desc)][0]{
    _id,
    title,
    slug,
    select[]->{
      _id,
      _createdAt,
      title,
      slug,
      author->{
        _id,
        name,
        slug,
        image,
        bio
      },
      views,
      description,
      category,
      image,
      pitch
  }
  }`);
