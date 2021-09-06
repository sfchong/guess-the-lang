package main

import (
	"encoding/csv"
	"encoding/json"
	"log"
	"os"
)

type Lang struct {
	Lang  string `json:"lang"`
	Value string `json:"value"`
}

func main() {
	langs := []Lang{}

	// Read data from csv file
	f, err := os.Open("../data/lang.csv")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	// Convert data to struct array
	r := csv.NewReader(f)
	for {
		if parts, err := r.Read(); err == nil {
			lang := Lang{parts[0], parts[1]}
			langs = append(langs, lang)
		} else {
			break
		}
	}

	// Convert struct to json byte
	json, err := json.MarshalIndent(langs, "", "  ")
	if err != nil {
		log.Fatal(err)
	}

	// Write json to file
	os.WriteFile("../src/lang.json", json, 0644)
}
