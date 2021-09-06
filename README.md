# Guess the Lang
A Hello World game. Guess "Hello World" in different languages.

Created using create-react-app.

## Run
```bash
npm install
npm start
```

## Update language data
The language data is stored in `data/lang.csv`

After updating the csv file. run
```bash
go run ./cmd/generate.go
```

It will generate the `lang.json` file and place under `src/`