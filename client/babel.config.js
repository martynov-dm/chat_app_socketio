module.exports = {
  presets: [
    ['@babel/preset-env', { modules: false }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
    [
      '@emotion/babel-preset-css-prop',
      {
        autoLabel: 'dev-only',
        labelFormat: '[local]',
      },
    ],
  ],

  plugins: [
    [
      '@emotion',
      {
        autoLabel: 'dev-only',
        labelFormat: '[local]',
      },
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
    '@babel/plugin-syntax-dynamic-import',
  ],
}
