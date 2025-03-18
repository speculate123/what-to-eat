import ReactDOM from "react-dom";
import React, { Component } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import shuffle from "lodash.shuffle";
import Card from "./Card";
import data from "./Data";
import "./styles.css";
import "sanitize.css";

class List extends Component {
    state = {
      filteredOptions: [],
      stagger: "forward",
      spring: "wobbly",
      options: ["燒肉", "火鍋", "便當", "韓式", "拉麵", "港式", "牛肉麵"]
    };
  
    addToFilteredOptions = option => {
      this.setState(prevState => {
        console.log(prevState.filteredOptions.concat(option));
        return {
            filteredOptions: prevState.filteredOptions.concat(option)
        };
      });
    };

    addOptions = option => {
        this.setState(prevState => {
            var value = document.getElementById("option").value;
            console.log(value);
            if (value) {
                return {
                    options: prevState.options.concat(value)
                }
            }
        });
    }

    shuffleList = () => this.setState(prevState => {
        var shuf = shuffle(prevState.options);
        console.log(shuf);
        this.setState({
            options: shuf
        })
    });
  
    render() {
      return (
        <div className="fm-example">
          <Flipper
            flipKey={`${this.state.type}-${this.state.sort}-${JSON.stringify(
                this.state.options.join(""))}-${JSON.stringify(this.state.stagger)}`}
            spring={this.state.spring}
            staggerConfig={{
              default: {
                reverse: this.state.stagger !== "forward",
                speed: 1
              }
            }}
            decisionData={this.state}
          >
            <button onClick={this.shuffleList}> shuffle</button>
            <div>
                <input type="text" id="option" name="option" />
                <button onClick={this.addOptions}>add</button>
            </div>
            <div>
              {!!this.state.filteredOptions.length && (
                <button
                  className="fm-show-all"
                  onClick={() => {
                    this.setState({
                        filteredOptions: []
                    });
                  }}
                >
                  show all cards
                </button>
              )}
            </div>
  
            <Flipped flipId="list">
              <div className="fm-grid">
                <Flipped inverseFlipId="list">
                  <ul className="list-contents">
                    {this.state.options
                      .filter(o => !this.state.filteredOptions.includes(o))
                      .map(o => (
                        <Card
                          id={o}
                          title={o}
                          stagger={["forward", "reverse"].includes(
                            this.state.stagger
                          )}
                          type={this.state.type}
                          key={o}
                          addToFilteredIds={this.addToFilteredOptions}
                        />
                      ))}
                      
                  </ul>
                </Flipped>
              </div>
            </Flipped>
          </Flipper>
        </div>
      );
    }
  }

  export default List;