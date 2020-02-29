# Cloud Computing Project
## Secured Light-weight Tourism Application for Canada

### Developement Requirements

For development, you will only need Node.js and a node global package, Npm, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following commands.

    $ node --version
    v12.16.1

    $ npm --version
    6.13.4

If you need to update `npm`, just run the following command.

    $ npm install npm -g

###

## Install

    $ git clone https://git.cs.dal.ca/jogani/cc_project_back_end.git
    $ cd cc_project_back_end
    $ npm install

## Setting up the project

On the command line, in your project's root folder, create a .env file and place the key value pair in the this new file

    PORT=3000
       

## Running the project

    $ npm start
