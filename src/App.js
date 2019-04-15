import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    errors: {}
  };

  // myRef = React.createRef();
  textInput = React.createRef();
  nameInput = React.createRef();

  focusTextInput = () => {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.focus();
  };

  focusNameInput = () => {
    this.nameInput.current.focus();
  };

  setTextInputRef = element => {
    this.textInput = element;
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.nameInput.current.value);
    console.log(this.textInput.value);
    console.log(this.refs.cat.value);
    const name = this.nameInput.current.value;
    const from = this.textInput.value;
    const old = this.refs.cat.value;
    const errors = this.checkErrors(name, from, old);
    // console.log(errors);
    this.setState({
      errors: errors
    });
  };

  checkErrors = (name, from, old) => {
    const errors = {};
    if (name.length === 0) {
      errors.name = "write your name";
    }

    if (from.length === 0) {
      errors["from"] = "write from where you are";
    }

    if (old.length === 0) {
      errors["old"] = "wpisz swoj wiek";
    }

    if (old < 18) {
      errors["age"] = "you need to be older than 18";
    }
    // return errors;
    if (Object.entries(errors).length === 0 && errors.constructor === Object) {
      console.log("pass");
      errors["pass"] = "you passed";
      return errors;
    } else {
      return errors;
    }
  };

  render() {
    const { name, from, old, age, pass } = this.state.errors;
    return (
      <div className="app">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Write your name</label>
          {name && <p className="error">{name}</p>}
          <input type="text" ref={this.nameInput} name="name" />
          <label htmlFor="from">Where are you from</label>
          {from && <p className="error">{from}</p>}
          <input name="from" type="text" ref={this.setTextInputRef} />
          <label htmlFor="oldref">How old are you</label>
          {age && <p className="error">{age}</p>}
          {old && <p className="error">{old}</p>}
          <input type="text" ref="cat" name="oldref" />
          <input
            type="button"
            value="Focus the name input"
            onClick={this.focusNameInput}
          />
          <input
            type="button"
            value="Focus the text input"
            onClick={this.focusTextInput}
          />
          <button>Submit</button>
        </form>
        {pass && <p className="pass">{pass}</p>}
      </div>
    );
  }
}

export default App;
