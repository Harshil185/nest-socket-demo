<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

---

## 🚀 Description

A **real-time chat application** that uses **NestJS WebSockets** for instant communication between users.  
Users can:
- Join chat rooms with a **username**.
- Send and receive **real-time messages**.
- See who is **online in the room**.
- Get notified when users **join or leave**.

---

## 🛠️ Installation

Clone the repository and install dependencies:

```bash
$ git clone https://github.com/your-repo/chat-app-nestjs.git
$ cd chat-app-nestjs
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

Nest is [MIT licensed](LICENSE).

Real-Time Chat Application with NestJS & WebSockets 🚀
A real-time chat application built using NestJS WebSockets on the backend and HTML, JavaScript, and Socket.io on the frontend. This project demonstrates real-time communication, room-based chat, user presence tracking, and persistent storage of data.

📌 Features

✅ Join a Chat Room → Users enter a username and room name to join.

✅ Real-time Messaging → Messages appear instantly in the room.

✅ User Presence Tracking → See who is in the room at any time.

✅ User Join & Leave Notifications → All users see updates when someone joins or leaves.

✅ Modern UI → Fully responsive and professional design.

✅ Data Persistence → Users and messages are stored in MongoDB.

🛠️ Tech Stack

Backend (NestJS WebSocket Server)

NestJS (with @nestjs/websockets)

Socket.io (for real-time communication)

MongoDB (for storing users and messages)

Frontend (HTML + JavaScript Client)

HTML + CSS (Styled for a professional look)

JavaScript (Client-side Socket.io for WebSockets)
