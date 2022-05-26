#!/bin/sh

urls=(
    https://www.val.se/download/18.29e9cb2617d171257e63ecf/kandidaturer.csv
    https://www.val.se/download/18.75995f7b17f5a986a4eebb/deltagande-partier.csv
)

datadir=./data

for url in ${urls[@]}; do
    curl ${url} | sed 's/\r/\n/g' | iconv -f iso-8859-1 -t utf-8 | (read -r; printf "%s\n" "$REPLY"; sort) > ${datadir}/${url##*/}
done
