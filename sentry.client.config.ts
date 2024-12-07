import * as Sentry from '@sentry/nextjs';

Sentry.init({
    dsn: 'https://a34382c78de90321e994c60efdad7a4a@o4508425254010880.ingest.us.sentry.io/4508425278455808',
    integrations: [
        Sentry.feedbackIntegration({
            // Additional SDK configuration goes in here, for example:
            colorScheme: 'system',
            isNameRequired: true,
            isEmailRequired: true,
        }),
    ],
});
