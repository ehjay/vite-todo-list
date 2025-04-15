import { SyntheticEvent, useState } from 'react';
import './App.css'

enum Status { TODO, IN_PROGRESS, DONE }

const statusMessages = {
  [Status.TODO]: "Todo",
  [Status.IN_PROGRESS]: "In progress",
  [Status.DONE]: "Done"
}

type Item = {
  id: string
  description: string
  status: Status
}

const getRandomId = () => {
  let randomChars = [],
  count = 0;

  while (count < 20) {
    const newHexChar = Math.floor(Math.random() * 16).toString(16)
    randomChars.push(newHexChar)
    count++
  }

  return randomChars.join('');
}

const defaultItems: Item[] = [
  { id: getRandomId(), description: "Mow the lawn", status: Status.DONE },
  { id: getRandomId(), description: "Pick up the kids", status: Status.IN_PROGRESS },
  { id: getRandomId(), description: "Get milk", status: Status.TODO },
];

function App() {
  const [items, setItems] = useState<Item[]>(defaultItems);
  const [newDesc, setNewDesc] = useState<string>("");

  const renderItem = (item: Item) => {
    return (<p key={item.id}>{statusMessages[item.status]}: {item.description}</p>);
  }

  const renderList = () => {
    if (items.length === 0) {
      return (<p>Woohoo! You todo list is empty</p>)
    }

    return items.map(renderItem);
  }

  const handleSubmit = (e: SyntheticEvent) => {
    // prevent page reload
    e.preventDefault();

    const form = e.target as typeof e.target & {
      description: { value: string}
    }

    setItems([
      { id: getRandomId(), description: form.description.value , status: Status.TODO },
      ...items
    ])

    setNewDesc("")
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>New item: </label>
        <input name="description" value={newDesc} onChange={e => setNewDesc(e.target.value)} />
        <button type="submit">Add</button>
      </form>

      <div>
        {renderList()}
      </div>
    </>
  )
}

export default App
