'use client';
import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Send } from 'lucide-react';
import { formSchemaCheck } from '@/lib/validation';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { createPitch } from '@/lib/action';
import { useToast } from '@/hooks/use-toast';

const CreateForm = () => {
    const { toast } = useToast();
    const [errors, setErrors] = useState<Record<string, string>>({
        errors: '',
        status: 'INITIAL',
    });
    const [isPending, setIspendling] = useState(false);
    const [pitchValue, setPitchValue] = useState('');
    const router = useRouter();
    const handleFormSubmit = async (formData: FormData) => {
        setIspendling(true);
        try {
            const formValues = {
                title: formData?.get('title') as string,
                description: formData?.get('decscription') as string,
                category: formData?.get('category') as string,
                link: formData?.get('link') as string,
                pitchValue,
            };
            await formSchemaCheck.parseAsync(formValues);
            const result = await createPitch(formValues);
            if (result?.status == 'SUCCESS') {
                toast({
                    title: 'Success',
                    description: 'Your startup pitch has been created successfully',
                });
                router.push(`/startup/${result._id}`);
            }
            setIspendling(false);
            // return result;
        } catch (error) {
            console.log('catch', error);
            setIspendling(false);
            if (error instanceof z.ZodError) {
                const fieldsError = error.flatten().fieldErrors;
                setErrors(fieldsError as unknown as Record<string, string>);
            } else {
                console.error('Unknown error:', error);
            }
        }
    };
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        handleFormSubmit(formData);
    };
    // const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    //     errors: '',
    //     status: 'INITIAL',
    // });
    return (
        <>
            <form onSubmit={onSubmit} className="startup-form">
                <div>
                    <label htmlFor="title" className="startup-form_label">
                        Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        className="startup-form_input ms-2"
                        required
                        placeholder="Startup Title"
                    />
                    {errors?.title && <p className="startup-form_error">{errors?.title}</p>}
                </div>
                <div>
                    <label htmlFor="decscription" className="startup-form_label">
                        Description
                    </label>
                    <textarea
                        id="decscription"
                        name="decscription"
                        className="startup-form_textarea ms-2"
                        required
                        placeholder="Startup Description"
                    />
                    {errors?.decscription && (
                        <p className="startup-form_error">{errors?.decscription}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="category" className="startup-form_label">
                        Category
                    </label>
                    <input
                        id="category"
                        name="category"
                        className="startup-form_input ms-2"
                        required
                        placeholder="Startup Category (Tech,Education,Sports...etc)"
                    />
                    {errors?.category && <p className="startup-form_error">{errors?.category}</p>}
                </div>
                <div>
                    <label htmlFor="link" className="startup-form_label">
                        Image URL
                    </label>
                    <input
                        id="link"
                        name="link"
                        className="startup-form_input ms-2"
                        required
                        placeholder="Startup Image URL"
                    />
                    {errors?.link && <p className="startup-form_error">{errors?.link}</p>}
                </div>
                <div data-color-mode="light">
                    <label htmlFor="pitch" className="startup-form_label">
                        Pitch
                    </label>
                    <MDEditor
                        value={pitchValue}
                        onChange={value => setPitchValue(value as string)}
                        id="pitch"
                        preview="edit"
                        height={300}
                        style={{
                            borderRadius: 20,
                            overflow: 'hidden',
                            marginInlineStart: '0.5rem',
                            marginTop: '0.75rem',
                        }}
                        textareaProps={{
                            placeholder: 'Breifly describe your idea',
                        }}
                        previewOptions={{
                            disallowedElements: ['style'],
                        }}
                    />
                    {errors?.pitchValue && (
                        <p className="startup-form_error">{errors?.pitchValue}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="startup-form_btn text-white flex justify-center"
                    disabled={isPending}
                >
                    {isPending ? 'Submitting...' : 'Submit your Pitch'}
                    <Send className="size-5 ml-2 mt-1" />
                </button>
            </form>
        </>
    );
};
export default CreateForm;
