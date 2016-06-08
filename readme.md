#Spell Checker

Thanks for checking out this project. We are breaking dictionary files line by line (the format of /usr/share/dict/words) into an object with keys representing correctable patterns. The final correction is determined using Levenshtein distances and checks on string length to ensure no characters from the input are removed.

##Instructions
* run `npm install`.
* set env variable `SC_DICT_PATH` to set the dictionary file to be used.
* `npm run spellchecker` will run spell checker with no automatic input.
* `npm run wrongify` will run the wrongifier, which generates 1 wrong spelling per second.
* `npm run project` will pipe wrongify into spellchecker for never-ending fun.

##Key Generation
Keys for the dictionary object are generated from generalizations made on the nature of possible spelling mistakes. Everything is lowercased, duplicate characters are removed and blocks of vowels are replaced with 'V', representing an arbitrary length of vowels. Misspelled words and dictionary words share the same generated key.

## Issues
* Levenshtein distances aren't effective for determining if characters are duplicated. `miiten` should not correct to `mitten`, although it does due to the short LD and the pattern match mVtVns.
* At worst case, if we had a strange dictionary where each entry translated to the same key, lookup would take O(n). Examples of this are dictionaries with only vowels and dictionaries with each entry containing the same consonants with the same vowel separation. I.E. `[maps, mips, meeps, mops, moeps]` would all map to `mVps`. That being said, a dictionary is unlikely to contain only these items.


##Some Good Generated Mistakes
```
> crRrROZIlLy
crazily
```
```
> tttttHhhHHHHaaRMoTtTtyYyPEEe
thermotype
```

```
> SsSaIiILllluRrR
sailer
```
