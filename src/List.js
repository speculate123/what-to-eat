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

    queryCallback = (event) => {
        this.props.queryCallback(event.target.innerText);
    }
  
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
            if (value && prevState.options.includes(value) === false) {
                return {
                    options: prevState.options.concat(value)
                }
            }
        });
    }

    shuffleList = () => this.setState(prevState => {
        var shuf = shuffle(prevState.options);
        document.getElementsByClassName("fm-item")[0].style.backgroundColor = "white";
        this.setState({
            options: shuf
        })
        setTimeout(() => {
            document.getElementsByClassName("fm-item")[0].style.backgroundColor = "lightgreen";
            console.log(document.getElementsByClassName("fm-item")[0]);
            document.getElementsByClassName("fm-item")[0].click();
        }
        , 10);
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
            <div>
                <input type="text" id="option" name="option" />
                <button onClick={this.addOptions}>add</button>
            </div>
            <br></br>
            <div>
                {!!this.state.filteredOptions.length && (
                    <button
                    className="fm-show-all"
                    style={{
                        float: "right"
                    }}
                    onClick={() => {
                        this.setState({
                            filteredOptions: []
                        });
                    }}
                    >
                    reset
                    </button>
                )}
            </div>
            <Flipped flipId="list">
              <div className="fm-grid">
                <Flipped inverseFlipId="list">
                  <ul className="list-contents" onClick={this.queryCallback}>
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
            <div style={{"text-align": "center"}}>
                <button id="shuffle" onClick={this.shuffleList}> shuffle</button>
            </div>
          </Flipper>
        </div>
      );
    }
  }

  export default List;