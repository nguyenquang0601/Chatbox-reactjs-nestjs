const users = [
  {
    id: 1,
    name: 'admin',
    password: '$2b$10$kpRdsucsCf9LoDWfYrAOpO2bad9J2GYe9Kf0k.6NKQPxwstathZS2',
    room: []
  },
  {
    id: 2,
    name: 'admin2',
    password: '$2b$10$kpRdsucsCf9LoDWfYrAOpO2bad9J2GYe9Kf0k.6NKQPxwstathZS2',
    room: []
  }
];
const rooms = [{
  id: 1,
  room: 'room 1',
  usersInRoom: []
}]
const messagesInRoom = [{
  id: '1',
  idRoom: '1',
  messages: []
}]
export { users, rooms, messagesInRoom }