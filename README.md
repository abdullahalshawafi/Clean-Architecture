# Clean-Architecture

Simple REST API using Express with TypeScript, PostgreSQL, and MySQL to practice the Clean Architecture by Uncle Bob.

## About

This REST API application implements the Clean Architecture in such a way that you can easily migrate between two RDBMS (PostgreSQL and MySQL) smoothly using a single environment variable **`DB_TYPE`** which can be toggled between **`pg`** and **`mysql`** in either `.env` file or `docker-compose.yml` depending on how are you running the application.

## Installation

**1. Clone the repo:**

```shell
git clone https://github.com/abdullahalshawafi/Clean-Architecture.git
```

**2. Move the project's directory:**

```shell
cd Clean-Architecture/
```

**3. Copy `.env.example` file into `.env` file and fill it with your environment variables:**

```shell
cp .env.example .env
```

### Using npm

**_Make sure you have Node.js, PostgreSQL, and MySQL installed_**

```shell
node -v
npm -v
psql -V
mysql -V
```

**4. Install the needed npm packages:**

```shell
npm install
```

**5. Build the application:**

```shell
npm run build
```

**6. Start the application:**

```shell
npm start
```

### Using Docker and Docker Compose

**_Make sure you have docker and docker-compose installed on your UNIX based machine:_**

```shell
docker -v
docker-compose -v
```

**4. Build the API's docker image:**

```shell
docker build . -t employees
```

**5. Run the application:**

```shell
docker-compose up
```

**6. Don't forget the stop the containers after you close the application:**

```shell
docker-compose down
```

In either ways, the application should start and be running on http://localhost:8080

## API Documentation

To generate the documentation use `npm run docs`. Then go to http://localhost:8080/api/v1 to view the generated documentation.
