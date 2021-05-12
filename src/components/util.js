const { shuffle } = require('lodash');

const stringToSslug = function (str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
    var to = 'aaaaeeeeiiiioooouuuunc------';
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str
        .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
};

exports.getRoute = function ({ slug, internal }) {
    const escapedSlug = stringToSslug(slug);

    switch (internal.type) {
        case 'ContentfulFragmentText':
        case 'ContentfulFragmentVideo':
        case 'ContentfulFragmentAudio':
            return `/fragment/${escapedSlug}`;
        case 'ContentfulProject':
            return `/projekt/${escapedSlug}`;
        case 'ContentfulPerson':
            return `/person/${escapedSlug}`;
        default:
            return `/${escapedSlug}`;
    }
};

const tagStyles = [
    ['#fec4fc', '#2c99e4'],
    ['#ffff3b', '#2c99e4'],
    ['#f81955', '#ffff3b'],
    ['#f81955', '#fec4fc'],
];

exports.getRandomTagColors = function () {
    const style = tagStyles[Math.floor(Math.random() * tagStyles.length)];

    return shuffle(style);
};
