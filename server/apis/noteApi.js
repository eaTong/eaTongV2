
/**
 * Created by eaTong on 2019-11-08 .
 * Description: auto generated in  2019-11-08
 */

const {LogicError} = require("../framework/errors");
const noteService = require('../services/noteService');

module.exports = {
  addNote: async (ctx) => {
    return await noteService.addNote(ctx.request.body);
  },
  updateNotes: async (ctx) => {
    return await noteService.updateNotes(ctx.request.body);
  },
  deleteNotes: async (ctx) => {
    return await noteService.deleteNotes(ctx.request.body.ids);
  },
  getNotes: async (ctx) => {
    return await noteService.getNotes(ctx.request.body);
  },
  getNoteDetail: async (ctx) => {
    return await noteService.getNoteDetail(ctx.request.body);
  }
};
  