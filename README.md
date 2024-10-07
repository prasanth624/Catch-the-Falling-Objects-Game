```markdown
# Catch the Falling Objects Game

## Overview
"Catch the Falling Objects" is a simple browser-based game built with Flask and JavaScript. The objective of the game is to catch falling objects using a basket. The game features a night mode with stars and a moon, and the player wins by reaching a score of 50.

## Features
- Catch falling objects represented by colorful shapes (triangles, circles, and hexagons).
- Responsive design for desktop browsers.
- Simple scoring system with a winning score of 50.
- Game over and win screens with messages.
- Pause and restart functionality.

## Technologies Used
- **Flask**: A lightweight WSGI web application framework in Python.
- **JavaScript**: For game logic and interactivity.
- **HTML/CSS**: For structure and styling.

## Installation

### Without Docker
1. **Clone the repository:**
   ```bash
   git clone https://github.com/prasanth624/Catch-the-Falling-Objects-Game.git
   cd Catch-the-Falling-Objects-Game
   ```

2. **Install Flask:**
   Make sure you have Python installed, then install Flask using pip:
   ```bash
   pip install Flask
   ```

3. **Run the Application:**
   Start the Flask server:
   ```bash
   python app.py
   ```

   The application will be accessible at `http://<your-server-ip>:5000`.

### With Docker
1. **Clone the repository:**
   ```bash
   git clone https://github.com/prasanth624/Catch-the-Falling-Objects-Game.git
   cd Catch-the-Falling-Objects-Game
   ```

2. **Build the Docker image:**
   ```bash
   docker build -t catch-the-falling-objects .
   ```

3. **Run the Docker container:**
   ```bash
   docker run -itd -p 5000:5000 catch-the-falling-objects
   ```

   The application will be accessible at `http://<your-server-ip>:5000`.

## Usage
- Move your mouse to position the basket.
- Catch the falling objects to increase your score.
- If you miss three objects, the game is over.
- Try to reach a score of 50 to win!

## Controls
- **Mouse Move**: Move the basket left and right.
- **Restart Button**: Click to restart the game at any time.
- **Pause Button**: Click to pause or resume the game.

## Contributing
Feel free to fork the repository and submit pull requests for any improvements or features you'd like to add!

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
