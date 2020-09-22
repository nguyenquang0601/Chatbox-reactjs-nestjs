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
  id: 'ecbda619-7809-4354-8e4f-dee9a095f3d7',
  room: 'Room 1',
  usersInRoom: []
},
{
  id: '4af8ea9-6da7-4bf0-8b33-933f6c2e0cde',
  room: 'Room 1',
  usersInRoom: []
}]
const messagesInRoom = [{
  id: '1',
  idRoom: 'ecbda619-7809-4354-8e4f-dee9a095f3d7',
  messages: []
},
{
  id: '2',
  idRoom: '4af8ea9-6da7-4bf0-8b33-933f6c2e0cde',
  messages: []
},

]
export { users, rooms, messagesInRoom }