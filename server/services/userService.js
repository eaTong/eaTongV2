/**
 * Created by eatong on 18-2-10.
 */
const md5 = require('crypto-js/md5');
const {Op} = require('sequelize');
const {LogicError} = require('../framework/errors');
const User = require('../models/User');
const Role = require('../models/Role');

module.exports = {
  addUser: async (user) => {
    const usr = await User.findOne({where: {account: user.account}});
    if (usr) {
      throw new LogicError(`账号(${user.account})已存在`);
    }
    user.password = md5(user.password).toString();
    user.enable = true;
    return await User.create(user);
  },
  updateUsers: async (data) => {
    const usr = await User.findOne({where: {account: data.account, id: {[Op.ne]: data.id}}});
    if (usr) {
      throw new LogicError(`账号(${data.account})已存在`);
    }
    return await User.update(data, {where: {id: data.id}})
  },
  deleteUsers: async (ids) => {
    return await User.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  },
  getUsers: async () => {
    return await User.findAll({attributes: ['id', 'name', 'account'], where: {enable: true}, include: [{model: Role}]});
  },
  grantRole: async (data) => {
    const user = await User.findById(data.userId);
    user.setRoles(data.roles);
    return await user.save();
  },
  changePassword: async ({password, originPassword, account}) => {
    const user = await User.findOne({
      where: {account, enable: true, password: md5(originPassword).toString()}
    });
    if (!user) {
      throw new LogicError('原始密码错误');
    }
    user.password = md5(password).toString();
    return await user.save();
    // return await user.setPassword();

  },
  login: async ({account, password}) => {
    return await User.findOne({
      attributes: ['id', 'name', 'account'],
      where: {account, enable: true, password: md5(password).toString()}
    });
  }
};


