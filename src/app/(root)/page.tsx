import StartupCard, { StartupTypeCard } from '@/components/StartupCard';
import InputSearch from '../../components/InputSearch';
// import { client } from '@/sanity/lib/client';
import { STARTUPS_QUERY } from '@/sanity/lib/queries';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { auth } from '../../../auth';

export default async function Home({ searchParams }: { searchParams: { query?: string } }) {
    const resolvedSearchParams = await searchParams;
    const query = resolvedSearchParams.query;
    // let posts;
    // try {
    //     posts = await client?.fetch(STARTUPS_QUERY);
    // } catch (err) {
    //     console.log('posterr', err);
    // }
    const session = await auth();
    const params = { search: query || null };
    const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });
    // const posts = [
    //     {
    //         createdAt: new Date(),
    //         views: 55,
    //         author: { id: 1, name: 'Amen' },
    //         id: 1,
    //         description: 'This is a description',
    //         image: 'data:image/jpeg;base64,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',
    //         category: 'Best Car',
    //         title: 'Cars in India',
    //     },
    // ];
    return (
        <>
            <section className="pink_container">
                <h1 className="heading">
                    Pitch Yout StartUp, <br />
                    Connect With Entrepreneurs
                </h1>
                <p className="sub-heading">
                    Submit Ideas,Vote on Pitches, and Get Noticed in Virutual Competitions.
                </p>

                {/* input search */}
                <InputSearch query={query} />
            </section>

            <section className="section_container">
                <p className="text-30-semibold">
                    {query ? `Search results for "${query}"` : 'All Results'}
                </p>
                <ul className=" mt-7 card_grid">
                    {posts?.length > 0 ? (
                        posts?.map((post: StartupTypeCard) => (
                            <StartupCard key={post?._id} post={post} />
                        ))
                    ) : (
                        <p className="no-result">No Startups Available</p>
                    )}
                </ul>
            </section>

            <SanityLive />
        </>
    );
}
