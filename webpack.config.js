module.exports = {
    mode: 'development', // development or production
    entry: './src/ts/index.ts',
    output: {
        path: `${__dirname}/dest/assets/js`,
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