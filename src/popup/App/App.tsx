import { useEffect, useState } from 'react';
import './App.css';
import { getCurrentTab } from '../../helpers/tabs';
import { storage } from 'webextension-polyfill';

function App() {
  const [value, setValue] = useState()
  
  useEffect(() => {
    const readBackgroundMessage = async () => {
      const tab = await getCurrentTab()
      const tabId = tab.id

      if (tabId) {
        const data = await storage.local.get(tabId.toString())
        const currentValue = data?.[tabId] ?? 0

        setValue(currentValue)
      }
    }

    readBackgroundMessage()
  }, [])

  return (
    <div className="App">
      {value}
    </div>
  );
}

export default App;
