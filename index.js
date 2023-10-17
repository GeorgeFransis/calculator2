function clearResult() {
   document.getElementById("result").value = "0";
}

function display(value) {
    document.getElementById("result").value += value;
}

function calculateResult() {
    const expression = document.getElementById("result").value;
    try {
        const result = evaluateExpression(expression);
        document.getElementById("result").value = result;
    } catch (error) {
        document.getElementById("result").value = 'Error';
    }
 }

function evaluateExpression(expression) {
   const tokens = expression.split(/([\+\-\*\/])/);
   const stack = [];
   let currentOperator = null;

   tokens.forEach(token => {
       if (token === '+' || token === '-' || token === '*' || token === '/') {
           currentOperator = token;
       } else {
           const number = parseFloat(token);
           if (!isNaN(number)) {
               if (currentOperator === null) {
                stack.pop();
                stack.push(number);
               } else {
                   const previousNumber = stack.pop();
                   if (currentOperator === '+') {
                       stack.push(previousNumber + number);
                   } else if (currentOperator === '-') {
                       stack.push(previousNumber - number);
                   } else if (currentOperator === '*') {
                       stack.push(previousNumber * number);
                   } else if (currentOperator === '/') {
                       stack.push(previousNumber / number);
                   }
               }
           }
       }
   });

   if (stack.length === 1) {
       return stack[0];
   } else {
       throw new Error('Invalid expression');
   }
}