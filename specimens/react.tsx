import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.scss";

// Initial items for todo list
const initialItems = [
  {
    id: 1,
    text: "Learn React",
  },
  {
    id: 2,
    text: "Eat some lunch",
  },
  {
    id: 3,
    text: "Write some TypeScript",
  },
];

@decorate
interface TodoItem {
  id: number;
  text: string;
}

function App() {
  const [items, setItems] = useState<TodoItem[]>(initialItems);

  const addItem = (text: string): void => {
    const ids = items.map(({ id }) => id);
    const item: TodoItem = {
      id: ids.length > 0 ? window.Math.max(...ids) + 1 : 1,
      text,
    };

    setItems([...items, item]);
  };

  return (
    <div
      className="app"
      style={{
        minHeight: "100vh",
      }}
    >
      <header className="app-header">
        <h1 className="app-header__title">Todo</h1>
        <img src={logo} alt="Logo" />
      </header>
      <TodoList items={items} addItem={addItem} />
    </div>
  );
}

class TodoList extends React.Component<{
  items: TodoItem[];
  addItem: (text: string) => void;
}> {
  onSubmitItem(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const { value: name } = event.currentTarget.text as HTMLInputElement;
    this.props.addItem(name);
  }

  render() {
    return (
      <>
        <ul>
          {/* Create a list item for each todo item */}
          {this.props.items.map(({ id, text }) => (
            <li key={id}>{text}</li>
          ))}
        </ul>
        <form onSubmit={(event) => this.onSubmitItem(event)}>
          <label>
            <input type="text" name="text" />
          </label>
          <input type="submit" value="Add item" />
        </form>
      </>
    );
  }
}

export default App;
