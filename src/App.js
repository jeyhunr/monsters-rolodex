
import React, { Component } from "react";
import "./App.css";
import CardList from './components/component-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      seaerchField: ""
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((users) => {
        this.setState(
          () => {
            return { monsters: users };
          }
        );
      });
  }

  onSearchChange = (event) => {
    const seaerchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { seaerchField };
    });
  }

  render() {
    const { monsters, seaerchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(seaerchField);
    });

    return (
      <div className="App">
        <h1 className="app-title">Monster Rolodex</h1>
        <SearchBox onSearchHandler={onSearchChange} class="search-monster" placeholder="search monster" />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
