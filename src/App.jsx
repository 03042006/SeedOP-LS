import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import { v4 as uuidv4 } from 'uuid';
import EditModal from "./components/EditModal";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css'


function App() {
  const [seedPhrase, setSeedPhrase] = useState(false);
  const [privateKey, setPrivateKey] = useState(false);
  const [Item, setItem] = useState([]);

  const [seedPhraseValues, setseedPhraseValues] = useState([]);
  const [privateKeyValue, setprivateKeyValue] = useState("");
  const [walletName, setwalletName] = useState("");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Edit Modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // Load items from local storage when the app loads
  useEffect(() => {
    const storedItems = localStorage.getItem("walletItems");
    if (storedItems) {
      setItem(JSON.parse(storedItems));
    }
  }, []);

  // Save items to local storage
  const saveToLocalStorage = (items) => {
    localStorage.setItem("walletItems", JSON.stringify(items));
  };

  const handleAddItem = () => {
    if (walletName) {
      let newItem = {};
      if (seedPhrase) {
        const inputValues = [];
        for (let i = 1; i <= 12; i++) {
          const inputValue = document.getElementById(`seed-input-${i}`).value;
          inputValues.push(inputValue);
        }
        newItem = { walletName, seedPhrase: inputValues, id: uuidv4() };
      } else if (privateKey) {
        newItem = { walletName, privateKey: privateKeyValue, id: uuidv4() };
      }
     else if (!privateKey || !seedPhrase || walletName) {
      notify("Missing");
      resetFields();
    }
    const updatedItems = [...Item, newItem];
    setItem(updatedItems);
    saveToLocalStorage(updatedItems);
    notify("Saved"); // Save to local storage
    resetFields();
  }
  };

  const handleDelete = (id) => {
    const newItems = Item.filter((item) => item.id !== id);
    setItem(newItems);
    saveToLocalStorage(newItems);
    notify("Deleted") // Save to local storage after deletion
  };

  const handleEdit = (id) => {
    const itemToEdit = Item.find((item) => item.id === id);
    if (itemToEdit) {
      setEditItem(itemToEdit);
      setIsEditModalOpen(true);
    }
  };

  const handleSave = (updatedItem) => {
    const updatedItems = Item.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setItem(updatedItems);
    saveToLocalStorage(updatedItems); // Save to local storage after editing
  };

  const resetFields = () => {
    setwalletName("");
    setprivateKeyValue("");
    setseedPhraseValues([]);
    document.querySelectorAll(".seedfields input").forEach((input) => (input.value = ""));
    setSeedPhrase(false);
    setPrivateKey(false);
  };

  const handleToggle = (e) => {
    if (e.target.id === "Seed") {
      setSeedPhrase(true);
      setPrivateKey(false);
    } else if (e.target.id === "Key") {
      setSeedPhrase(false);
      setPrivateKey(true);
    }
  };

  const handleSaveEditedItem = (updatedItem) => {
    const updatedItems = Item.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setItem(updatedItems);
    saveToLocalStorage(updatedItems);
    notify("Edited")
    handleCloseEditModal();
  };

  const handleShow = (id) => {
    const itemToShow = Item.find((item) => item.id === id);
    if (itemToShow) {
      setSelectedItem(itemToShow);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditItem(null);
  };

  const handleNameChange = (e) => {
    setwalletName(e.target.value);
  };

  const handleKeyChange = (e) => {
    setprivateKeyValue(e.target.value);
  };

  const notify = (state) => {
    if(state === "Saved"){
      toast.success("Item Added Succesfully");
    }
    else if(state === "Deleted"){
      toast.error("Item Deleted Succesfully");
    }
    else if(state === "Edited"){
      toast.success("Item Edited Succesfully")
    }
    else if(state === "Missing"){
      toast.warning("Missing Fields Required!")
    }
    else if(state === "Copied"){
      toast.success("Text Copied!")
    }
    
  };

  return (
    <>

    <div>
      {/* Toast container to display the toast notifications */}
      <ToastContainer 
      className={' antialiased '}
        position="top-right" 
        autoClose={2000} 
        hideProgressBar={false} 
        newestOnTop={true} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss
        pauseOnHover={false}
        draggable 
        theme="dark"
      />
    </div>

      <Navbar />
      
      <div className="bg-[#ddfedfbf] min-h-[90vh] flex flex-col items-center p-8">
        <div className="header flex flex-col items-center">
          <h1 className="text-[--primary-text] text-3xl font-semibold  ">
            <span className="text-[--buttons-secondary]">&lt;</span> Seed
            <span className="text-[--buttons-secondary]">OP</span>
            <span className="text-[--buttons-secondary]">/ &gt;</span>{" "}
          </h1>
          <p className="text-sm head ">Your Own Seed Phrase / Private Key Manager</p>
        </div>

        <div className="form flex flex-col mt-10 gap-4 w-[50vw] items-center">
          <input
            type="text"
            required
            className="w-[50vw] rounded-xl border px-2 py-1 text-sm "
            placeholder="Name of Your Wallet"
            id="walletname"
            value={walletName}
            onChange={handleNameChange}
          />
          <div className="checks flex flex-col items-center">
            <div className="checklabels flex gap-2 font-medium">
              <label htmlFor="Seed">Seed-Phrase</label>
              <label htmlFor="Key">Private-Key</label>
            </div>
            <div className="check flex gap-16">
              <input
                type="radio"
                name="toggle"
                checked={seedPhrase}
                onChange={handleToggle}
                id="Seed"
              />
              <input
                type="radio"
                name="toggle"
                checked={privateKey}
                onChange={handleToggle}
                id="Key"
              />
            </div>
          </div>
          {seedPhrase && (
            <div className="seedfields grid gap-2 place-items-center w-[100%] text-center ">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i + 1} className="flex items-center min-w-[33%]">
                  <span className="w-6">{i + 1}</span>
                  <input id={`seed-input-${i + 1}`} type="text" maxLength={4} className=" w-full" />
                </div>
              ))}
            </div>
          )}

          {privateKey && (
            <div className="keyfield text-center mt-4 w-[50vw]">
              <input
                className="w-[50vw] rounded-xl border px-2 py-1 text-sm "
                placeholder="Your Private Key"
                type="text"
                id="private-key-input"
                value={privateKeyValue}
                onChange={handleKeyChange}
              />
            </div>
          )}

          <button
          title="Save"
            className="bg-green-500 w-max p-3 px-4 text-lg font-medium text-center border border-black rounded-2xl flex items-center gap-1"
            onClick={handleAddItem}>
            <img width={'20px'} src="/save.svg" alt="Save" />
          </button>
        </div>

        <div className="main w-[75vw] px-6 mt-2">
          <h1 className="text-left text-xl font-bold">
            Your Seed Phrases / Private Keys
          </h1>
          {Item.length === 0 ? (
            <p>No Saved Items</p>
          ) : (
            <div className="content">
              <div className="main-header bg-green-700 text-white flex  font-medium py-2 px-10  border rounded-md w-[100%] ">
                <h2 className="text-left w-[33.33%]">
                  Wallet Name
                </h2>
                <h2 className="text-center w-[33.33%]">
                  Seed Phrase / Private Key
                </h2>
                <h2 className="text-right w-[33.33%]">Actions</h2>
              </div>

              <div className="main-content w-[100%]">
                <ul className="w-[100%]">
                  {Item.map((item) => (
                    <li
                      key={item.id}
                      className="bg-green-200 flex border rounded-md py-1  items-center  "
                    >
                      <p className=" walletname text-left px-14 w-[33.33%]">
                        {item.walletName}
                      </p>

                      <div className="text-center flex justify-center gap-2 w-[33.33%]">
                        {item.seedPhrase ? (
                          <p className="text-center">SeedPhrase</p>
                        ) : (
                          <p className="text-center">Private Key</p>
                        )}
                        <button title="Show" onClick={() => handleShow(item.id)}>
                          <img width={'32px'} src="/eye-off.svg" alt="Show" />
                        </button>
                      </div>

                      <div className="text-right actions flex gap-2 justify-end px-8 w-[33.33%]">
                        <button title="Edit" onClick={() => handleEdit(item.id)}>
                          <img width={'32px'} src="/pen.svg" alt="Edit" />
                        </button>
                        <button title="Delete" onClick={() => handleDelete(item.id)}>
                        <img width={'32px'} src="/del.svg" alt="Delete" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} item={selectedItem} notify={notify}/>

        <EditModal isOpen={isEditModalOpen} onClose={handleCloseEditModal} item={editItem} privateKeyValue={privateKeyValue} handleKeyChange={handleKeyChange} 
        setPrivateKeyValue={setprivateKeyValue} seedPhraseValues={seedPhraseValues} setSeedPhraseValues={setseedPhraseValues} onSave={handleSaveEditedItem}/>
        
      </div>
    </>
  );
}

export default App;
