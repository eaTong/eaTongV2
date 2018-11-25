/**
 * Created by eatong on 18-2-20.
 */
const MenuService = require('../services/MenuService');
const BaseApi = require('../framework/BaseApi');


class MenuApi extends BaseApi {

  static async getMenus() {
    return await MenuService.getMenus();
  }

  static async getAuthorisedMenu(ctx) {
    // if(ctx.session.loginUser)
    return await MenuService.getAuthorisedMenu(ctx.session.loginUser.id);
  }
}

module.exports = MenuApi;
