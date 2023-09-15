# We Hive

This project introduces our collaborative app idea, the ultimate solution for connecting users with like-minded individuals who can contribute their technical or artistic skills to your project. With a simple interface, users can easily navigate through a diverse range of project listings, finding the one that aligns with their interests and expertise. Say hello to productive collaborations and join our community of passionate creators!
Backend

# Description

The backend provides auth routes for login and sign-up and uses JWT token validation middleware.
Has 4 models: user, project, message and collabFinder.


# API Documentation

This document provides an overview of the available API routes and their functionality.

## Profile Routes

### Get User Profile

- **URL:** `/profile`
- **Method:** GET
- **Description:** Retrieve user profile information.
- **Parameters:** None.
- **Response:** JSON object containing user profile data.

## Authentication Routes

### User Authentication

- **URL:** `/auth`
- **Method:** POST
- **Description:** Authenticate a user.
- **Parameters:**
  - `username` (string, required): User's username.
  - `password` (string, required): User's password.
- **Response:** JSON object indicating successful authentication or an error message.



## Project Routes

### Get All Projects

- **URL:** `/api/projects`
- **Method:** GET
- **Description:** Retrieve all projects.
- **Parameters:** None.
- **Response:** JSON object containing a list of projects.

### Create a New Project

- **URL:** `/api/projects`
- **Method:** POST
- **Description:** Create a new project.
- **Parameters:**
  - `name` (string, required): Project name.
  - `description` (string): Project description.
- **Response:** JSON object containing the newly created project.

### Get Project by ID

- **URL:** `/api/projects/:id`
- **Method:** GET
- **Description:** Retrieve a project by its ID.
- **Parameters:**
  - `id` (string, required): Project ID.
- **Response:** JSON object containing project details or an error message.

### Update Project

- **URL:** `/api/projects/:id`
- **Method:** PUT
- **Description:** Update a project by its ID.
- **Parameters:**
  - `id` (string, required): Project ID.
  - `name` (string): New project name.
  - `description` (string): New project description.
- **Response:** JSON object indicating a successful update or an error message.

### Delete Project

- **URL:** `/api/projects/:id`
- **Method:** DELETE
- **Description:** Delete a project by its ID.
- **Parameters:**
  - `id` (string, required): Project ID.
- **Response:** JSON object indicating a successful deletion or an error message.



### Create a New Message

- **URL:** `/api/messages`
- **Method:** POST
- **Description:** Create a new message in the inbox.
- **Parameters:**
  - `subject` (string, required): Message subject.
  - `body` (string, required): Message body.
- **Response:** JSON object containing the newly created message.

### Get Message by ID

- **URL:** `/api/messages/:id`
- **Method:** GET
- **Description:** Retrieve a message by its ID from the inbox.
- **Parameters:**
  - `id` (string, required): Message ID.
- **Response:** JSON object containing message details or an error message.

### Delete Message

- **URL:** `/api/messages/:id`
- **Method:** DELETE
- **Description:** Delete a message by its ID from the inbox.
- **Parameters:**
  - `id` (string, required): Message ID.
- **Response:** JSON object indicating a successful deletion or an error message.


## Deployed project

https://we-hive.netlify.app
