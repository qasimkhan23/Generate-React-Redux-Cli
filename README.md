# Generate-React-Redux-Cli

### A simple CLI to generate react components and create redux store, actions, and reducers

## Install

```bash
npm i -g generate-react-redux-cli
```

## Usage

### Note: create reducer before creating store.

| Flags |       Description       |    Value Type    |
| ----- | :---------------------: | :--------------: |
| c     |   to create component   |                  |
| r     |   to create a reducer   |                  |
| s     | to create a redux store |                  |
| a     |   to create an action   |                  |
| -p    |    to specify a path    |                  |
| -t    |   type of a component   | functional/class |

## To create a component

```bash
generate-react-redux c Example
```

#### Example of the component files structure

```
|-- /src
    |-- /components
        |-- /Example.jsx

```

## To create a reducer

```bash
generate-react-redux e ExampleReducer
```

#### Example of the component files structure

```
|-- /src
    |-- /reducers
        |-- /ExampleReducer.js
        |-- /rootReducer.js

```

## To create a store

```bash
generate-react-redux s
```

#### Example of the component files structure

```
|-- /src
    |-- /store
        |-- /index.js

```

## To create an action

```bash
generate-react-redux a ExampleAction
```

#### Example of the component files structure

```
|-- /src
    |-- /actions
        |-- /ExampleAction.js

```

### Options

#### path e.g src/components

```bash
generate-react-redux c Example -p src/pages/components
```

#### Example of the component files structure

```
|-- /src
    |-- /pages
        |-- /components
            |-- /Example.jsx

```

```bash
generate-react-redux c Example -p src/pages/components
```

#### Example of the component

```bash
generate-react-redux c Example -p src/pages/components -t class
```

## License

[MIT](LICENSE.md)
