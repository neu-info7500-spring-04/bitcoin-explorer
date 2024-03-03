import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: {
        [process.env.GRAPHQL_API_GATEWAY_URL!]: {
            headers: {
                'x-api-key': process.env.GRAPHQL_API_GATEWAY_KEY!,
            },
        },
    },
    generates: {
        'src/lib/graphql/': {
            preset: 'client',
            plugins: [],
        },
    },
    ignoreNoDocuments: true,
}

export default config