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

type Toast = {
  id: string
  message: string
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
  const [toasts, setToasts] = useState<Toast[]>([]);

  const renderItem = (item: Item) => {
    return (<p key={item.id}>{statusMessages[item.status]}: {item.description}</p>);
  }

  const renderList = () => {
    if (items.length === 0) {
      return (<p>Woohoo! You todo list is empty</p>)
    }

    return items.map(renderItem);
  }

  const removeToast = (id: string) => {
    setToasts(
      toasts.filter(toast => toast.id !== id)
    )
  }

  const createToast = (message: string) => {
    const newToast = {
      id: getRandomId(),
      message
    }

    setToasts([
      ...toasts,
      newToast
    ])

    setTimeout(() => {
      removeToast(newToast.id)
    }, 5000);
  }

  const handleSubmit = (e: SyntheticEvent) => {
    // prevent page reload
    e.preventDefault();

    const form = e.target as typeof e.target & {
      description: { value: string}
    }

    const description = form.description.value;

    setItems([
      { id: getRandomId(), description , status: Status.TODO },
      ...items
    ])

    setNewDesc("")

    let shortDescription = description.length > 10 ?
       description.slice(0, 10) + "..." : description

    createToast(`Todo created to "${shortDescription}"`);
  }

  const renderToast = (toast: Toast) => {
    return (<div key={toast.id} className='toast'>{toast.message}</div>)
  }

  const renderToaster = () => {
    if (toasts.length === 0) {
      return null;
    }

    return toasts.map(renderToast)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>New item: </label>
        <input name="description" placeholder='Enter a new item' value={newDesc} onChange={e => setNewDesc(e.target.value)} />
        <button type="submit">Add</button>
      </form>

      <div>
        {renderList()}
      </div>

      <div className="toaster">
        {renderToaster()}
      </div>
    </>
  )
}

export default App
