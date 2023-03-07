import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export type SwaggerUIOptions = {
    OAS_ENABLED: boolean;
    OAS_PATH: string;
    APP_NAME: string;
    APP_VERSION: string;
    API_URL: string;
    APP_ENV: string;
};

export const SWAGGER_OPTIONS_FIELS = [
    'OAS_ENABLED',
    'OAS_PATH',
    'APP_NAME',
    'APP_VERSION',
    'API_URL',
    'APP_ENV',
] as const;
export type SwaggerUIOptionsField = typeof SWAGGER_OPTIONS_FIELS;

export function configureSwaggerUI(
    nestApp: INestApplication,
    options: SwaggerUIOptions,
) {
    if (!options.OAS_ENABLED) {
        return `SwaggerUI not enabled`;
    }

    // configure OpenAPI spec document
    const docBuilder = new DocumentBuilder()
        .setTitle(options.APP_NAME)
        .setVersion(options.APP_VERSION)
        .addBearerAuth(
            { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
            'JWT',
        );

    // add the appropriate server entry
    docBuilder.addServer(options.API_URL, options.APP_ENV);

    // build OpenAPI spec document
    const config = docBuilder.build();
    const document = SwaggerModule.createDocument(nestApp, config);

    // configure SwaggerUI
    SwaggerModule.setup(options.OAS_PATH, nestApp, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
        customSiteTitle: options.APP_NAME,
    });
    return `${options.API_URL}${options.OAS_PATH}`;
}
