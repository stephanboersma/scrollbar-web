const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#fff319',
              '@menu-dark-color': '#fff',
              '@layout-header-background': '#171717',
              '@menu-dark-selected-item-icon-color': '#000',
              '@menu-dark-selected-item-text-color': '#000',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
