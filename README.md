# Online Code Editor

An interactive, full-featured online code editor built with the MERN stack. This application enables users to write, compile, and execute code directly in their browser, with support for multiple programming languages and themes.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Code Editor**: A user-friendly editor with syntax highlighting and customizable themes.
- **Multi-language Support**: Choose from multiple programming languages to compile and execute code.
- **Output Display**: View real-time output of your code after execution.
- **Project Management**: Save, update, and delete your code files.
- **Authentication**: Secure user authentication and authorization for managing files.

## Tech Stack

- **Frontend**: React, Sass, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Compiler API**: Custom API integration for code execution

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/hend-essam/Online-Code-Editor.git
   cd Online-Code-Editor
   ```
   
### Install Dependencies

For the client:

  ```bash
  cd frontend
  npm install
  ```

For the server:

```bash
cd backend
npm install
  ```

### Set up Environment Variables

  Create `.env` file in `client` directorie. Here are the required variables:
  
   ```plaintext
  REACT_APP_API_URL = 
  REACT_APP_API_HOST =
  REACT_APP_API_KEY = 
  REACT_APP_BACK_URL = http://localhost:5000/api
  ```

### Run the Application

Open two terminal windows to start both client and server:

- **Start client:**

  ```bash
  cd frontend
  npm start
  ```

- **Start server:**

  ```bash
  cd backend
  npm start
  ```

### Access the Application

The application will be available at [http://localhost:3000](http://localhost:3000).

## Usage

1. **Sign Up / Login**: Create an account or log in to manage your files.
2. **Create and Edit Code**: Write, edit, and save your code using the editor.
3. **Select Language and Theme**: Customize your editor experience.
4. **Execute Code**: Run your code and view the output in real-time.

## File Structure

  ```bash
  Online-Code-Editor/
  ├── client/             # Frontend files
  ├── server/             # Backend files
  └── README.md           # Project documentation
  ```
