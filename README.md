# Web3 Wallet Seed Phrase / Private Key Manager

A simple React-based application to manage wallet seed phrases and private keys, using Local Storage to store data. This application allows you to add, edit, delete, and view wallet details securely in the browser.

## Features

- **Add Wallet**: You can add a new wallet with either a seed phrase or a private key.
- **Edit Wallet**: Edit existing wallets' seed phrases or private keys.
- **Delete Wallet**: Remove wallets from the list.
- **Show/Hide Sensitive Data**: The ability to show or hide sensitive data (like private keys or seed phrases).
- **Local Storage**: All data is stored locally in the browser using Local Storage.
- **Responsive Design**: Mobile-friendly user interface built with Tailwind CSS.
- **Toast Notifications**: Informative feedback for actions using `react-toastify`.

## Installation

To run the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/03042006/SeedOP-LS.git

2. **Navigate into the Project Folder:**
    ```bash
    cd SeedOP-LS

3. **Install the dependencies:**
    ```bash
    npm install

4. **Start the development server:**
    ```bash
    npm run dev

5. **Open your browser and navigate to http://localhost:3000 to use the app.**

# Usage
**Adding a Wallet**
1. Enter the **Name of Your Wallet** in the input field.

2. Select either **Seed Phrase** or **Private Key** by toggling the radio buttons.

3. If you choose **Seed Phrase**, enter 12 words in the provided input fields.

4. If you choose **Private Key**, input the private key in the corresponding field.

5. Click **Save** to add the wallet to the list.

**Managing Wallets**

- View Wallets: All added wallets will be displayed in the list below the form.

- Show Details: Click the Show button to reveal the seed phrase or private key for the selected wallet.

- Edit Wallet: Click the Edit button to update the wallet’s seed phrase or private key.

- Delete Wallet: Click the Delete button to remove the wallet from Local Storage.

**Local Storage**

- The wallets are stored locally in the browser's Local Storage, which means they will persist even after refreshing the page. However, they will not be accessible across devices or browsers.

**Notifications**

- Using react-toastify, the app provides feedback for actions such as saving, editing, and deleting wallets. Notifications are displayed at the top-right of the screen and automatically disappear after 3 seconds.

# Customization

**Toastify Customization**

You can customize the Toast notifications in the App.js file. The current ToastContainer is configured as:
```bash
    <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    />
```

To modify the colors or styles, visit the official react-toastify documentation.

**TailwindCSS Customization**

- The app is styled with TailwindCSS. You can modify the styling in the component files or tailwind.config.js to change colors, spacing, typography, etc.

# Technologies Used
- **React**: Frontend library for building UI.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **uuid**: For generating unique IDs for the wallets.
- **react-toastify**: For toast notifications.
- **Local Storage**: Browser API for persisting data.

# Future Enhancements
- Integration with a backend service (e.g., MongoDB) to store wallet data securely.
- User authentication for better data security.
- Option to encrypt private keys/seed phrases before saving them in Local Storage.
- Support for multiple languages.


**Note: This project is for educational purposes only. Please be cautious when handling sensitive information such as seed phrases and private keys. Do not use this app for managing real wallet data.**

```
This README provides clear instructions on how to install, use, and customize your local storage-based wallet manager app. Let me know if you want to add or modify any section!
