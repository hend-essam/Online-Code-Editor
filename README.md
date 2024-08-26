# Online-Code-Editor
Online Code Editor is a web-based Judge0 IDE built with React, allowing users to write, run, and test code in multiple programming languages directly in their browser. It features customizable themes, file management, and a user-friendly interface.

![App](https://github.com/user-attachments/assets/aa87816a-311e-4a57-ba7d-a3643403b340)

## Features
- **Code Editor**: Powered by Monaco Editor with customizable themes.
- **Language Selection**: Supports multiple programming languages with easy switching.
- **Theme Toggle**: Switch between light and dark themes.
- **File Upload and Download**: Upload files directly into the editor and download your code.
- **Run Code**: Compile and run code with a single click or a shortcut (F9).
- **Input and Output Management**: Manage user input and view detailed output, including memory and time stats.
- **IDE Layout Toggle**: Switch between vertical and horizontal IDE layouts.

## Getting Started

After following the installation steps, open your browser and navigate to `http://localhost:3000`. You can start writing and running code right away. Choose a programming language, write your code in the editor, and click the "Run" button or press `F9` to see the output.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/hend-essam/Online-Code-Editor.git
    cd Online-Code-Editor
    ```
    
2. Install the dependencies:

    ```bash
    npm install
    ```

3. Register on <a href="https://rapidapi.com/judge0-official/api/judge0-ce/pricing" target="__blank">RapidAPI</a> and get your API keys.

4. Create a .env file in the root directory with the following variables:

    ```bash
    REACT_APP_API_URL=https://your-api-url.com/compile
    REACT_APP_API_HOST=your-api-host
    REACT_APP_API_KEY=your-api-key
    ```

5. Start the development server:

    ```bash
    npm start
    ```

## Acknowledgments

- [Judge0 API](https://judge0.com) for the execution backend.
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for the code editor.

   
