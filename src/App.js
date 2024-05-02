import React, { Component } from "react";
import "./App.css";

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const ops = ["/", "*", "-", "+"];
const ids = {
  7: "seven",
  8: "eight",
  9: "nine",
  4: "four",
  5: "five",
  6: "six",
  1: "one",
  2: "two",
  3: "three",
  0: "zero",
  "/": "divide",
  "*": "multiply",
  "-": "subtract",
  "+": "add",
};

class App extends Component {
  state = {
    lastPressed: undefined,
    calc: "0",
    operation: undefined,
  };

  handleClick = (e) => {
    const { calc, lastPressed } = this.state;
    const { innerText } = e.target;

    switch (innerText) {
      case "AC":
        this.setState({
          calc: "0",
        });
        break;

      case "=":
        const evaluated = eval(calc);
        this.setState({
          calc: evaluated,
        });
        break;

      case ".":
        const splitted = calc.split(/[\+\-\*\/]/);
        const last = splitted.slice(-1)[0];

        if (!last.includes(".")) {
          this.setState({
            calc: calc + ".",
          });
        }
        break;

      default:
        let e = undefined;
        if (ops.includes(innerText)) {
          if (ops.includes(lastPressed) && innerText !== "-") {
            const lastNumberIdx = calc
              .split("")
              .reverse()
              .findIndex((char) => char !== " " && nums.includes(+char));
            e = calc.slice(0, calc.length - lastNumberIdx) + ` ${innerText} `;
          } else {
            e = ` ${calc} ${innerText} `;
          }
        } else {
          e = calc === "0" ? innerText : calc + innerText;
        }
        this.setState({
          calc: e,
        });
    }
    this.setState({
      lastPressed: innerText,
    });
  };
  render() {
    const { calc } = this.state;

    return (
      <div class="calculator">
        <p style={{ position: "absolute", top: 0 }}>
          {JSON.stringify(this.state, null, 2)}
        </p>

        <div id="display" class="display">
          {calc}
        </div>

        <div class="nums-container">
          <button
            class=" big-h light-gray ac"
            onClick={this.handleClick}
            id="clear"
          >
            AC
          </button>
          {nums.map((num) => (
            <button
              class={`dark-gray ${num === 0 && "big-h"}`}
              onClick={this.handleClick}
              key={num}
              id={ids[num]}
            >
              {num}
            </button>
          ))}
          <button class="light-gray" onClick={this.handleClick} id="decimal">
            .
          </button>
        </div>

        <div class="ops-container">
          {ops.map((op) => (
            <button
              class="orange"
              onClick={this.handleClick}
              key={op}
              id={ids[op]}
            >
              {op}
            </button>
          ))}
          <button class="orange" onClick={this.handleClick} id="equals">
            =
          </button>
        </div>
      </div>
    );
  }
}

export default App;
