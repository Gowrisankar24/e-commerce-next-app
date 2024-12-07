'use client';
import React, { useActionState, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Send } from 'lucide-react';
import { formSchemaCheck } from '@/lib/validation';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { createPitch } from '@/lib/action';

const CreateForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitchValue, setPitchValue] = useState('');
    const router = useRouter();
    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData?.get('title') as string,
                description: formData?.get('decscription') as string,
                category: formData?.get('category') as string,
                link: formData?.get('link') as string,
                pitchValue,
            };
            await formSchemaCheck.parseAsync(formValues);
            const result = await createPitch(prevState, formData, pitchValue);
            if (result.status == 'SUCCESS') {
                alert('startup created Successfully');
                router.push(`/startup/${result._id}`);
            }
            return result;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldsError = error.flatten().fieldErrors;
                setErrors(fieldsError as unknown as Record<string, string>);
                return { ...prevState, error: 'Validation Failed', status: 'ERROR' };
            }
            return {
                ...prevState,
                error: 'A Unknown error occurred',
                status: 'ERROR',
            };
        }
    };
    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        errors: '',
        status: 'INITIAL',
    });
    return (
        <>
            <form action={formAction} className="startup-form">
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
                    {errors?.pitch && <p className="startup-form_error">{errors?.pitch}</p>}
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
