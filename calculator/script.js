let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false

const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.getElementById('equalsBtn')
const clearButton = document.getElementById('clearBtn')
const deleteButton = document.getElementById('deleteBtn')
const pointButton = document.getElementById('pointBtn')
const lastOperationScreen = document.getElementById('lastOperationScreen')
const currentOperationScreen = document.getElementById('currentOperationScreen')

window.addEventListener('keydown', handleKeyboardInput)
equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNumber)
pointButton.addEventListener('click', appendPoint)

numberButtons.forEach(button =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach(button =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

function formatNumber(number) {
  // Check if the number is a decimal
  if (number.includes('.')) {
    const parts = number.split('.')
    return `${parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${parts[1]}`
  }
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function appendNumber(number) {
  if (currentOperationScreen.textContent === '0' || shouldResetScreen) resetScreen()

  // Remove commas before adding new number
  let currentValue = currentOperationScreen.textContent.replace(/,/g, '')
  currentValue += number

  // Format the number with commas
  currentOperationScreen.textContent = formatNumber(currentValue)
}

function resetScreen() {
  currentOperationScreen.textContent = ''
  shouldResetScreen = false
}

function clear() {
  currentOperationScreen.textContent = '0'
  lastOperationScreen.textContent = ''
  firstOperand = ''
  secondOperand = ''
  currentOperation = null
}

function appendPoint() {
  if (shouldResetScreen) resetScreen()

  // Remove commas for checking
  let currentValue = currentOperationScreen.textContent.replace(/,/g, '')

  if (currentValue === '') currentValue = '0'
  if (currentValue.includes('.')) return

  currentOperationScreen.textContent = formatNumber(currentValue + '.')
}

function deleteNumber() {
  // Remove last character (could be a digit or comma)
  let currentValue = currentOperationScreen.textContent.replace(/,/g, '')
  currentValue = currentValue.slice(0, -1)

  if (currentValue === '') {
    currentOperationScreen.textContent = '0'
  } else {
    currentOperationScreen.textContent = formatNumber(currentValue)
  }
}

function setOperation(operator) {
  if (currentOperation !== null) evaluate()

  // Remove commas before storing operand
  firstOperand = currentOperationScreen.textContent.replace(/,/g, '')
  currentOperation = operator
  lastOperationScreen.textContent = `${formatNumber(firstOperand)} ${currentOperation}`
  shouldResetScreen = true
}

function evaluate() {
  if (currentOperation === null || shouldResetScreen) return
  if (currentOperation === '÷' && currentOperationScreen.textContent.replace(/,/g, '') === '0') {
    alert("You can't divide by 0!")
    return
  }

  // Remove commas before calculation
  secondOperand = currentOperationScreen.textContent.replace(/,/g, '')
  const result = roundResult(operate(currentOperation, firstOperand, secondOperand))

  currentOperationScreen.textContent = formatNumber(result.toString())
  lastOperationScreen.textContent = `${formatNumber(
    firstOperand
  )} ${currentOperation} ${formatNumber(secondOperand)} =`
  currentOperation = null
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
  if (e.key === '.') appendPoint()
  if (e.key === '=' || e.key === 'Enter') evaluate()
  if (e.key === 'Backspace') deleteNumber()
  if (e.key === 'Escape') clear()
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    setOperation(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') return '÷'
  if (keyboardOperator === '*') return '×'
  if (keyboardOperator === '-') return '−'
  if (keyboardOperator === '+') return '+'
}

function add(a, b) {
  return a + b
}

function substract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  return a / b
}

function operate(operator, a, b) {
  a = Number(a)
  b = Number(b)
  switch (operator) {
    case '+':
      return add(a, b)
    case '−':
      return substract(a, b)
    case '×':
      return multiply(a, b)
    case '÷':
      if (b === 0) return null
      else return divide(a, b)
    default:
      return null
  }
}
