# TO-DO Backend Project

## Description

This is a backend project for a TO-DO application. It is built with Node.js, Express.js, MongoDB, pnpm and Mongoose. It is a REST API that provides data to the frontend.

## Table of Contents

- [Description](#description)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [File Structure](#file-structure)
- [Plans for Future](#plans-for-future)
- [License](#license)
- [Contact](#contact)

## Installation

1. Clone the repo

```sh
git clone
```

2. Install NPM packages

```sh
pnpm install
```

3. Create a .env file in the root directory and add the following variables

```sh
PORT=3000
MONGO_URI=mongodb://localhost:27017/todo
JWT_SECRET=your_jwt_secret
```

4. Run the server on development mode

```sh
pnpm run dev
```

## Usage

5. Run the server on production mode

```sh
pnpm run start
```

6. Run the tests

```sh
pnpm run test
```

## API Documentation

- [API Documentation](https://documenter.getpostman.com/view/) (Not available yet)

## File Structure

```
├── .gitignore
├── LICENSE
├── README.md
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── config
│   └── dbconnection.js
├── controllers
│   └── projectController.js
│   └── userController.js
│   └── taskController.js
├── helpers
│   └── createId.js
│   └── generateJWT.js
├── middlewares
│   └── checkAuth.js
├── models
│   └── ProjectModel.js
│   └── TaskModel.js
│   └── UserModel.js
├── routes
│   └── projectRoutes.js
│   └── taskRoutes.js
│   └── userRoutes.js
├── scripts
│   └── start.js
├── utils
│   └── errorHandler.js
│   └── responseHandler.js
└── tests
    └── project.test.js
    └── task.test.js
    └── user.test.js
```

## Plans for Future

- [ ] Add more routes
- [ ] Add more tests
- [ ] Add more models
- [ ] Add more controllers
- [ ] Add more middlewares
- [ ] Add more utils
- [ ] Add more config
- [ ] Add more workflows
- [ ] Add more scripts
- [ ] Add more documentation
- [ ] Add more comments
- [ ] Add more examples
- [ ] Add more features

## License

MIT License

- Copyright (c) 2023 Ricardo Cáceres

## Contact

- GitHub: [@Ricardo-Caceres](https://github.com/Ricardo-Caceres)

- LinkedIn: [@Ricardo Cáceres](https://www.linkedin.com/in/ricardocaceres95/)

- Email: [Gmail](mailto:rick.caceres@gmail.com)

- Website: [C.V.](https://rick-caceres.vercel.app)
