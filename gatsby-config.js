require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    plugins: [
        `gatsby-plugin-image`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        'gatsby-plugin-react-helmet',
        {
            resolve: `gatsby-plugin-typegen`,
            options: {
                emitSchema: {
                    'src/__generated__/gatsby-introspection.json': true,
                },
                emitPluginDocuments: {
                    'src/__generated__/gatsby-plugin-documents.graphql': true,
                },
            },
        },
        {
            resolve: `gatsby-source-contentful`,
            options: {
                spaceId: 'u0ztoekrenxw',
                accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
                useNameForId: false,
            },
        },
        {
            resolve: 'gatsby-plugin-react-svg',
            options: {
                rule: {
                    include: /\.inline\.svg$/,
                },
            },
        },
    ],
};
