# MyCalculator
Web-based scientific calculator of the sort I'd want to use regularly, coded with React.js.

## Getting Started
```
[placeholder: don't know]
```

### Prerequisites
```
[placeholder]
```

### Installing
After cloning the repository to a local directory, open a terminal window in the top-level directory of the repository and execute the command 'npm install'.

Once the libraries have finished installing, execute the command 'npm start' in the terminal window. The application should appear in its own browser window, shortly, at the address 'localhost:3000'.

### Usage
Most of the buttons, when clicked, will cause a function/operator/value to appear in the input field, allowing you to construct expressions. Clicking the up-arrow by the input field or pressing 'Enter' on a keyboard will evaluate the expression and show the result in the bottom-most row of the display pane above the input field.

The yellow buttons perform various actions:
* 2nd - shows alternate functions in place of the default function buttons
* mode - shows popup, allows toggling of angles as radians vs. degrees, results shown as decimals vs. fractions
* stat - shows popup, allows access to statistical functions
* mat - shows popup, allows access to matrix/vector operations/functions
* ⌫ - deletes all character(s) selected in the input field, or the character directly to the left of the cursor position
* ans - fills the input field with the result of the most recent evaluation
* ↦ - shows popup, assign current contents of input field to a variable name of your choosing
* C - clears all text from the input field

### Built With
* [create-react-app](https://github.com/facebook/create-react-app) - Provided initial app configuration
* [Material-UI](https://material-ui.com/) - Basis for nearly all components used
* [nerdamer](https://nerdamer.com/) - Math interpreter
* [react-katex](https://www.npmjs.com/package/react-katex) - Renders symbolic math in LaTeX
* [Google Firebase](https://firebase.google.com/) - Hosts the compiled app for public use

### Author
Andrew M. Lee

### License
MyCalculator is open source software [placeholder]
