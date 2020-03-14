import userService from "./user";
import ticketService from "./ticket";

module.exports = (...params) => {
  userService(...params);
  ticketService(...params);
};
