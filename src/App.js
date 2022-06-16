import { Component } from 'react';
import './App.css';


class Clock extends Component {
  constructor(props) {
    super(props);
    // Create the state, which would hold a date object we can continue to update
    this.state = {date: new Date(), counter: 0};

    // Must bind "this" since method is being passed by ref. and loses it's this from the class
    // could optionally define handleClick() as an arrow function but, weird and ugly
    this.handleClick = this.handleClick.bind(this);
  }

  // lifecycle mount
  componentDidMount() {
    // every one second, call tick which will update the state Date
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  // Lifecycle unmount
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    // set state to now!
    // always use setState, never assign state directly (except in constructor)
    this.setState({
      date: new Date()
    });
  }

  handleClick() {
    this.setState((state, props) => ({
      counter: state.counter + 1
    }));
  }

  render() {
    return (
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        <button onClick={this.handleClick}>Clicked {this.state.counter}</button>
      </div>
    );
  }
}

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {username: '', password: ''};

    // im BIIIINDIIIIIIIING
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('Submitted ' + this.state.username);
    // Prevent default form submission behavior
    event.preventDefault();
  }

  handleUpdate(event) {
    this.setState({
      // Yeah this is kinda sick
      // use the name prop to determine state value to update
      [event.target.name]: event.target.value
    })
  }

  // username props for inputs sets the event.target.name value so we can determine later which state value to update
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={this.state.username} onChange={this.handleUpdate} />
        </label>
        <label>
          Password:
          <input type="text" name="password" value={this.state.password} onChange={this.handleUpdate} />
        </label>
        <button>Submit</button>
      </form>
    )
  }
}

function App() {
  return (
    <div className="App">
      <p>
        <Clock />
      </p>
      <LoginForm />
    </div>
  );
}

export default App;
