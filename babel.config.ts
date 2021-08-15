module.exports = function (api: { cache: (toSet: boolean) => void }) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo']
  }
}
