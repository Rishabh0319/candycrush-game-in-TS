# Candy Crush Game README

## 1. Create a 9x9 Grid Board:
   - Construct a grid board with 9 rows and 9 columns. **[Done]**
   - Set the dimensions of the board to 450px by 450px. **[Done]**
   - Each candy tile within the board should measure 50px by 50px. **[Done]**

## 2. Include 6 Different Colored Candies:
   - Include six different colors of candies: blue, orange, green, yellow, red, and purple. **[Done]**
   - Ensure all candy images are stored in the assets/images folder. **[Done]**

## 3. Randomly Load Candy Images:
   - Load candy images onto the board randomly, row by row. **[Done]**

## 4. Assign Unique IDs to Each Candy Tile:
   - Assign a unique ID to each candy tile in the format "Row-Column" (e.g., "0-1"). **[Done]**
   - The ID should be of string type. **[Done]**

## 5. Implement startGame() Functionality:
   - Define a startGame() function to initialize the game board. **[Done]**
   - Call this function on the onLoad event. **[Done]**

## 6. Drag and Drop Feature:
   - Implement drag and drop functionality for each candy tile. **[Done]**
   - Ensure that tiles can only be swapped if they are adjacent to each other and move in the directions: TOP, DOWN, BOTTOM, and LEFT. **[Done]**

## 7. Swap Tiles for Matches:
   - Automatically crush 3 or 4 or 5 candy row/column wise if they match (4,5 is optional). **[Done]**
   - Allow swapping of tiles only if it results in three candies of the same color being aligned in a row or column. **[Done]**
   - Do not allow swapping with blank tiles. **[Done]**

## 8. Slide Down Candies:
   - After matches are made, slide down candies row by row to fill empty spaces. **[Done]**

## 9. Generate New Candies:
   - Generate new random candies row by row to fill any empty spaces at the top of the board. **[Done]**

## 10. Increase Score for Candy Crush:
   - In every row or column where candies are crushed, increase the player's score by 30 points. **[Done]**
