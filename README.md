# Undefeated Account Generator
> Forked from https://github.com/sharkmigue/undefeatedaccountgen

It basically generates accounts for **undefeated.com**


## Installation

In order to use this application , you will need to clone this directory and install the necessary dependencies. You can do that by entering the following commands into your preferred terminal application.

```shell
git clone https://github.com/boxpositron/undefeatedaccountgen

cd undefeatedaccountgen

npm install
```

## Account Generation

To begin account generation, navigate to the project directory with your preferred terminal application and enter the following command.

```shell
npm run generate
```

By default, the accounts generated will be in the accounts.txt file present in the project directory.

## Default Browser

The browser used will default to Chromium.

If you wish to run this with an existing installation of Google Chrome instead of Chromium,
navigate to the address below in Google Chrome

``` 
 chrome://version/
 ```

 Copy the value of  **Executable Path** and paste it in the **CHROME_PATH** provided in the **app.js** file.

