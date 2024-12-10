import StartupCard, { StartupTypeCard } from '@/components/StartupCard';
import InputSearch from '../../components/InputSearch';
// import { client } from '@/sanity/lib/client';
import { STARTUPS_QUERY } from '@/sanity/lib/queries';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
// import { auth } from '../../../auth';

export default async function Home({ searchParams }: { searchParams: { query?: string } }) {
    const resolvedSearchParams = await searchParams;
    const query = resolvedSearchParams.query;

    // const session = await auth();
    const params = { search: query || null };
    const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });
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
