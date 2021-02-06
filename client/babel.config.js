module.exports = {
  presets: [
    '@babel/preset-env',
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
  ],
}
