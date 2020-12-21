module.exports = {
    mode: 'production', // development or production
    entry: './src/ts/index.ts',
    output: {
        path: `${__dirname}/dest/js`,
        filename: "main.js"
      },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
        },
      ],
    },
    resolve: {
      extensions: [
        '.ts', '.js',
      ],
    },
  };