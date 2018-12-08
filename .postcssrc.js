// https://github.com/michael-ciniawsky/postcss-load-config

/* module.exports = {
  "plugins": {
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    "postcss-import": {},
    "postcss-url": {},
    "postcss-write-svg":{
      utf8: false
    },
    "postcss-pxtorem":{
      rootValue: 75,
      propList: ['*'],
      selectorBlanckList:[
        '.selectClass'
      ]
    }
  }
} */
module.exports = {
  'plugins': [
    require('postcss-import')({}),
    require('postcss-url')({}),
    require('postcss-cssnext')({}),
    require('autoprefixer')({
      browsers: ['Android >= 4.0', 'iOS >= 7']
    }),
    require('postcss-pxtorem')({
      rootValue: 75,
      propList: ['*']
    })
  ]
};