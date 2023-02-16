import "./App.css";
import { useState, useEffect } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  console.log("rendered");

  //THIS below code will do infinate re-rendering because react sees it as a new array even if
  //its a same value because its from a foreign source. We're essentially saying to this useEffect, Hey,
  //the only time you should ever call this function is on mount because if nay of dependanceis change,
  //useEffect is going to call this function.
  useEffect(() => {
    fetch("http://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
    //we need to stop fetching after one fetching. needing to use sideeffect
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
        className="monsters-search-box"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

// class App extends Component {
//   //local state : only availabe within here
//   //the order these might run is
//   //1.constructor runs first before any class
//   constructor() {
//     //callling component class
//     super();
//     // console.log("constructor");
//     //2.The only thing to do is initial value of state
//     this.state = {
//       monsters: [],
//       searchField: "",
//     };
//   }

//   //4. after render(initial UI),
//   componentDidMount() {
//     // console.log("didmount");
//     fetch("http://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((users) =>
//         this.setState(() => {
//           return { monsters: users };
//         })
//       );
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();

//     this.setState(() => {
//       return {
//         searchField,
//       };
//     });
//   };

//   //3. running the initial monster's value. Determins what to show. Templates of html
//   //5. after state change above, react re-renders
//   render() {
//     console.log("render from App JS");
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });

//     return (
//       <div className="App">
//         <h1 className="app-title">Monsters Rolodex</h1>
//         <SearchBox
//           onChangeHandler={onSearchChange}
//           placeholder="search monsters"
//           className="monsters-search-box"
//         />
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

export default App;
