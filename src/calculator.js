#!/usr/bin/env node

/**
 * Node.js CLI calculator
 * Supported operations:
 *  - addition: add, +
 *  - subtraction: sub, -
 *  - multiplication: mul, *, x, ×
 *  - division: div, /
 *
 * Usage examples:
 *  node src/calculator.js add 2 3    # outputs 5
 *  node src/calculator.js 2 + 3      # outputs 5
 *  node src/calculator.js            # interactive prompt
 */

const readline = require('readline');

function isNumber(n) {
  return !Number.isNaN(Number(n));
}

function add(a, b) { return a + b; }
function sub(a, b) { return a - b; }
function mul(a, b) { return a * b; }
function div(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}

function compute(op, a, b) {
  switch (op) {
    case 'add': case '+': return add(a, b);
    case 'sub': case '-': return sub(a, b);
    case 'mul': case '*': case 'x': case '×': return mul(a, b);
    case 'div': case '/': case '÷': return div(a, b);
    default: throw new Error('Unsupported operation: ' + op);
  }
}

function usage() {
  console.error('Usage: node src/calculator.js <op> <a> <b>\n   or: node src/calculator.js <a> <op> <b>\nOperations: add(+), sub(-), mul(* or x), div(/)');
}

function runFromArgs(argv) {
  if (argv.length === 0) {
    return runInteractive();
  }

  // Forms supported:
  // 1) op a b   e.g. add 2 3
  // 2) a op b   e.g. 2 + 3
  if (argv.length === 3) {
    let [p0, p1, p2] = argv;
    let op, aStr, bStr;

    if (isNumber(p0) && !isNumber(p1) && isNumber(p2)) {
      // a op b
      aStr = p0; op = p1; bStr = p2;
    } else if (!isNumber(p0) && isNumber(p1) && isNumber(p2)) {
      // op a b
      op = p0; aStr = p1; bStr = p2;
    } else {
      usage();
      process.exit(2);
    }

    const a = Number(aStr);
    const b = Number(bStr);
    try {
      const res = compute(op, a, b);
      console.log(res);
      process.exit(0);
    } catch (err) {
      console.error('Error:', err.message);
      process.exit(1);
    }
  }

  usage();
  process.exit(2);
}

function runInteractive() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question('Enter expression (e.g. 2 + 3 or add 2 3): ', answer => {
    const parts = answer.trim().split(/\s+/);
    try {
      if (parts.length === 3) {
        // reuse runFromArgs logic
        const [p0, p1, p2] = parts;
        if (isNumber(p0) && !isNumber(p1) && isNumber(p2)) {
          const res = compute(p1, Number(p0), Number(p2));
          console.log(res);
          rl.close();
          process.exit(0);
        } else if (!isNumber(p0) && isNumber(p1) && isNumber(p2)) {
          const res = compute(p0, Number(p1), Number(p2));
          console.log(res);
          rl.close();
          process.exit(0);
        }
      }
      console.error('Could not parse input.');
      rl.close();
      process.exit(2);
    } catch (err) {
      console.error('Error:', err.message);
      rl.close();
      process.exit(1);
    }
  });
}

if (require.main === module) {
  const argv = process.argv.slice(2);
  runFromArgs(argv);
}

module.exports = { add, sub, mul, div, compute };
