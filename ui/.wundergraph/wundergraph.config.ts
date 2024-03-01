import { authProviders, configureWunderGraphApplication, cors, introspect, templates } from '@wundergraph/sdk';
import { NextJsTemplate } from '@wundergraph/nextjs/dist/template';
import server from '../../wundergraph.server';
import operations from '../../wundergraph.operations';
import {undefined} from "zod";

const BitQueryV1 = introspect.graphql({
    apiNamespace: 'BitQueryV1',
    url: 'https://graphql.bitquery.io',
    introspection: {
        disableCache: true,
    },
    headers: (builder) =>
        builder
            .addStaticHeader('X-API-KEY', 'BQYgH7SeAK4AEs7Q34jYoMTSSbNec3C3'),
});

configureWunderGraphApplication({
    apis: [BitQueryV1],
    server,
    operations,
    generate: {
        codeGenerators: [
            {
                templates: [new NextJsTemplate()],
                path: '../components/generated',
            },
        ],
    },
});