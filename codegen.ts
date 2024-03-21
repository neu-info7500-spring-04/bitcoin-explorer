import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: {
        ["https://bitcoin-grafbase-mahithchigurupati.grafbase.app/graphql"]: {
            headers: {
                'x-api-key': "process.env.GRAPHQL_API_GATEWAY_KEY!",
            },
        },
    },
    config: {
        skipTypename: true,
        enumsAsTypes: true,
        scalars: {
            numeric: "number",
        },
    },
    documents: "src/graphql/queries.graphql",
    generates: {
        "src/graphql/__generated__/": {
            preset: "client",
            config: {},
            plugins: [],
        },
    },
    ignoreNoDocuments: true,

}

export default config