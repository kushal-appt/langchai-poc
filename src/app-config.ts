export const loadConfiguration = () => ({
    port: process.env.PORT,
    host: process.env.HOST,
    graphqlPath: process.env.GRAPHQL_PATH,
    aiUrl: process.env.AI_URL,
    aiPassword: process.env.AI_PASSWORD,
    aiUsername: process.env.AI_USER_NAME
})