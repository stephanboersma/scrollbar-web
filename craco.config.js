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
              '@btn-primary-color': '#171717',
              '@menu-dark-color': '#fff',
              '@layout-header-background': '#171717',
              '@menu-dark-inline-submenu-bg': '#171717',
              '@menu-dark-selected-item-icon-color': '#171717',
              '@menu-dark-selected-item-text-color': '#171717',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
