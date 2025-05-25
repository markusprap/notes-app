// webpack.dev.js
import { merge } from 'webpack-merge';
import path from 'path';
import common from './webpack.common.js';

export default merge(common, {
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(process.cwd(), 'dist'),
    },
    watchFiles: ['index.html', 'src/**/*'],
    open: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
});
