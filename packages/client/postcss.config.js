module.exports = {
  plugins: [
    require('@fullhuman/postcss-purgecss')({
      content: ['src/**'],
      variables: true
    }),
    require('postcss-combine-media-query')
  ]
}