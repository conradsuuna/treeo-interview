# treeo-interview

A brief description.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Endpoints](#endpoints)
    - [Postman](#postman)

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine.

### Prerequisites

- Node.js and npm installed
- Nest
- Your preferred code editor (e.g., Visual Studio Code)

### Installation

1. Clone the repository:
   `git clone https://github.com/conradsuuna/treeo-interview.git`

## Usage
- Install dependencies 
    `npm i`
- configure `.env` environment file based off `.env.example`
- Run the project
    `npm run start:dev`

## Deployment
This project's image is hosted on docker hub. <br>
The image registry can be found <a href="https://hub.docker.com/repository/docker/conrad747/treeo-interview/general">here.</a>


## Endpoints
- The available endpoints for testing are;
1. User registration - `http://localhost:3003/api/v1/user/register`
2. User authentication - `http://localhost:3003/api/v1/auth/login`
3. Posts creation - `http://localhost:3003/api/v1/posts/create-post`
4. Toggle post view (make post public/private) - `http://localhost:3003/api/v1/posts/toggle-post-view-status/5`
5. Get public posts - `http://localhost:3003/api/v1/posts/get-public-posts`
6. Get personal posts - `http://localhost:3003/api/v1/posts/get-user-posts`
7. Delete a post - `http://localhost:3003/api/v1/posts/delete-post/6`
8. Retrieve a deleted post - `http://localhost:3003/api/v1/posts/retrieve-deleted-post/6`
9. Get user deleted posts - `http://localhost:3003/api/v1/posts/get-user-deleted-posts`

### Postman
Postman collections can be accessed <a href='https://www.postman.com/restless-meteor-105028/workspace/treeo-interview/collection/6379157-f515d70a-41e2-482c-84b8-f1d70ab567c1?action=share&creator=6379157'>here.</a>;
