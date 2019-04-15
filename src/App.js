import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    errors: {}
  };

  // myRef = React.createRef();
  textInput = React.createRef();
  nameInput = React.createRef();
  // ageInput = React.createRef()

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
    console.log(this.refs.age.value);
    console.log(this.petName.value);
    const name = this.nameInput.current.value;
    const from = this.textInput.value;
    const old = this.refs.age.value;
    const pet = this.petName.value;
    const errors = this.checkErrors(name, from, old, pet);
    console.log(errors);
    if (errors.pass === "you passed") {
      this.nameInput.current.value = "";
      this.textInput.value = "";
      this.refs.age.value = "";
      this.petName.value = "";
    }
    this.setState({
      errors: errors
    });
  };

  checkErrors = (name, from, old, pet) => {
    const errors = {};
    if (name.length === 0) {
      errors.name = "write your name";
    }

    if (from.length === 0) {
      errors["from"] = "write from where you are";
    }

    if (old.length === 0) {
      errors["old"] = "write your age";
    }

    if (pet.length === 0) {
      errors.pet = "write your pet name, if you have'nt have one the write no";
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

  onKeyUP = (target, e) => {
    if (e.keyCode === 13) {
      switch (target) {
        case "nameInput":
          this.textInput.focus();
          break;
        case "textInput":
          this.refs.age.focus();
          break;
        case "ageInput":
          this.petName.focus();
          break;
        case "petInput":
          this.nameInput.current.focus();
          break;
        default:
          break;
      }
    }
  };

  render() {
    const { name, from, old, age, pet, pass } = this.state.errors;
    return (
      <div className="app">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Write your name</label>
          {name && <p className="error">{name}</p>}
          <input
            type="text"
            ref={this.nameInput}
            name="name"
            onKeyUp={this.onKeyUP.bind(this, "nameInput")}
          />
          <label htmlFor="from">Where are you from</label>
          {from && <p className="error">{from}</p>}
          <input
            name="from"
            type="text"
            ref={this.setTextInputRef}
            onKeyUp={this.onKeyUP.bind(this, "textInput")}
          />
          <label htmlFor="oldref">How old are you</label>
          {age && <p className="error">{age}</p>}
          {old && <p className="error">{old}</p>}
          <input
            type="text"
            ref="age"
            name="oldref"
            onKeyUp={this.onKeyUP.bind(this, "ageInput")}
          />
          <label htmlFor="pet">What is your's first pet name?</label>
          {pet && <p className="error">{pet}</p>}

          <input
            type="text"
            ref={petInput => {
              this.petName = petInput;
            }}
            name="pet"
            onKeyUp={this.onKeyUP.bind(this, "petInput")}
          />
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
