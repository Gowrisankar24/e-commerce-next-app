/* eslint-disable @next/next/no-img-element */
import React, { Suspense } from 'react';
import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { PLAYLIST_USER_BY_ID, STARTUP_ID_BY_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import markdownit from 'markdown-it';
import { LoaderIcon } from 'lucide-react';
import View from '@/components/View';
import StartupCard, { StartupTypeCard } from '@/components/StartupCard';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const md = markdownit();
    const id = (await params).id;

    const [get_id_data, editorPosts] = await Promise.all([
        client.fetch(STARTUP_ID_BY_QUERY, { id }),
        client.fetch(PLAYLIST_USER_BY_ID, {
            slug: 'editor-picks-new',
        }),
    ]);

    const parsedPitchContent = md.render(get_id_data?.pitch || '');

    if (!get_id_data) return notFound();

    return (
        <>
            <section className="pink_container !min-h-[230px]">
                <p className="tag">{formatDate(get_id_data?._createdAt)}</p>
                <h1 className="heading">{get_id_data?.title}</h1>
                <p className="sub-heading !max-w-5xl">{get_id_data?.description}</p>
            </section>

            <section className="section_container">
                <img
                    src={get_id_data?.image!}
                    alt={get_id_data?.author?.name!}
                    className="w-full h-auto rounded-xl"
                />
                <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                    <div className="flex-between gap-5">
                        <Link
                            href={`/user/${get_id_data?.author?._id}`}
                            className="flex gap-2 items-center mb-3"
                        >
                            {get_id_data && (
                                <Image
                                    src={get_id_data?.author?.image!}
                                    alt="avatar"
                                    width={64}
                                    height={64}
                                    className="rounded-full drop-shadow-lg"
                                />
                            )}

                            <div>
                                <p className="text-20-medium">{get_id_data?.author?.name}</p>
                                <p className="text-16-medium !text-black-300">
                                    @{get_id_data?.author?.username}
                                </p>
                            </div>
                        </Link>
                        <p className="category-tag">{get_id_data?.category}</p>
                    </div>
                    <h3 className="text-30-bold">Pitch Details</h3>
                    {parsedPitchContent ? (
                        <article
                            className="prose max-w-4xl font-work-sans break-all"
                            dangerouslySetInnerHTML={{ __html: parsedPitchContent }}
                        />
                    ) : (
                        <p className="no-result">No details Provided</p>
                    )}
                </div>
                <hr className="divider" />
                {editorPosts?.length > 0 && (
                    <div className="max-w-4xl mx-auto">
                        <p className="text-30-semibold">Editor Picks</p>

                        <ul className="mt-7 card_grid-sm">
                            {editorPosts?.map((post: StartupTypeCard) => {
                                <StartupCard key={post?._id} post={post} />;
                            })}
                        </ul>
                    </div>
                )}

                <Suspense fallback={<LoaderIcon className="view_skeleton" />}>
                    <View id={id} />
                </Suspense>
            </section>
        </>
    );
};

export default page;
