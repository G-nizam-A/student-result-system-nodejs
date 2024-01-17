# Student Result System

The Student Result System is a web application developed for managing student information, subjects, and marks. It provides a user-friendly interface for administrators to efficiently handle academic data.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Screenshots](#screenshots)

## Introduction

This project aims to streamline the process of managing student-related data within an educational institution. It facilitates the addition, updating, and retrieval of student details, subject information, and marks obtained.

## Features

- **Student Management:**
  - Add new students with unique USNs and names.
  - Update existing student information.
  - Delete student information.

- **Subject Management:**
  - Add new subjects with unique subject codes, names, and department associations.
  - Update existing subject details.
  - Delete subject details.

- **Marks Management:**
  - Add, delete and update student marks for specific subjects and semesters.
  - View and analyze results based on student USN and semester.

## Prerequisites

Before you begin, ensure you have the following prerequisites:

- Node.js installed on your machine (above v16.0).
- MySQL database configured.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/G-nizam-A/student-result-system-nodejs
    ```

2. **Navigate to the project directory:**

    ```bash
    cd student-result-system-nodejs
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **MySQL database configuration:**

    - Create a MySQL database. The SQL commands can be found in [sql.txt](sql.txt).
    - Update the database configuration in `server.js` with your database details.
    ```javascript
    // server.js

    const pool = mysql.createPool({
      host: 'your-hostname',
      user: 'your-username',
      password: 'your-password',
      database: 'your-database',
    });
    ```

5. **Start the application:**

    ```bash
    npx nodemon server.js
    ```

    The application will be accessible at `http://localhost:3000`.

## Usage

1. **Access the application:**

   Open your web browser and go to `http://localhost:3000`.

2. **Navigate through the pages:**

   - Use the navigation links to manage student data, subjects, and marks.
   - Fill out forms to add, update or delete information.

## Project Structure

The project follows a modular structure:

- `public/`: Contains static assets (CSS, client-side JavaScript).
- `server.js`: Server-side.
- `app.js`: Main application file.

## Technologies Used

- **Frontend:**
  - HTML, CSS, JavaScript
  - [Font Awesome](https://fontawesome.com/) for icons

- **Backend:**
  - [Node.js](https://nodejs.org/)
  - [Express.js](https://expressjs.com/) for the web application framework

- **Database:**
  - [MySQL](https://www.mysql.com/)

- **Other Tools:**
  - [Nodemon](https://nodemon.io/) for automatic server restarts during development

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to enhance the functionality or fix bugs.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

If you have any questions or suggestions, please feel free to reach out:

- Nizam
- Email: nizamcs10@gmail.com
- Project Repository: [GitHub Repository](https://github.com/G-nizam-A)

## Screenshots

![Screenshot 1](/screenshots/ss1.png)
![Screenshot 1](/screenshots/ss2.png)
![Screenshot 1](/screenshots/ss3.png)
![Screenshot 1](/screenshots/ss4.png)
![Screenshot 1](/screenshots/ss5.png)
