#!/bin/bash

sentence="

Welcome to challenge_3 !!!! 

OK, congratulations, you've made it this far, now you need to find the Mr.Robot file, read it, and do what it says! remember that black can be white and white can be black !!

GOOD LUCK"
delay=0.05

animate_sentence() {
    local i=0
    local len=${#sentence}
    while [ $i -lt $len ]; do
        echo -n "${sentence:$i:1}"
        sleep $delay
        ((i++))
    done
    echo
}

animate_sentence