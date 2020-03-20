import userService from "./user";
import ticketService from "./ticket";
import searchService from './search';

module.exports = (...params) => {
  userService(...params);
  ticketService(...params);
  searchService(...params);
};
