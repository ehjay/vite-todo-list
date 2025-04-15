import { useState } from 'react';
import './App.css'

enum Status { TODO, IN_PROGRESS, DONE }

const statusMessages = {
  [Status.TODO]: "Todo",
  [Status.IN_PROGRESS]: "In progress",
  [Status.DONE]: "Done"
}

type Item = {
  description: string
  status: Status
}

const defaultItems: Item[] = [
  { description: "Mow the lawn", status: Status.DONE },
  { description: "Pick up the kids", status: Status.IN_PROGRESS },
  { description: "Get milk", status: Status.TODO },
];

function App() {
  const [ items, setItems ] = useState<Item[]>(defaultItems);

  const renderItem = (item: Item) => {
    return (<p>{statusMessages[item.status]}: {item.description}</p>);
  }

  const renderList = () => {
    if (items.length === 0) {
      return (<p>Woohoo! You todo list is empty</p>)
    }

    return items.map(renderItem);
  }

  return (
    <>
      <div>
        {renderList()}
      </div>
    </>
  )
}

export default App
