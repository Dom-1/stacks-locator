#!/bin/sh

mongoimport --type csv -d locator -c locations --headerline --drop integrated.csv
