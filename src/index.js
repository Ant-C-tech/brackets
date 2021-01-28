module.exports = function check(str, bracketsConfig) {
     const taskArray = str.split("");
    const openBrackets = [];
    const closedBrackets = [];
    const pairBrackets = [];
    const expectBracketsArray = [];

    let isCorrectExpression = true;

    bracketsConfig.forEach((bracketsGroup) => {
        if (bracketsGroup[0] !== bracketsGroup[1]) {
            openBrackets.push(bracketsGroup[0]);
            closedBrackets.push(bracketsGroup[1]);
        } else {
            pairBrackets.push([bracketsGroup[0], "close"]);
        }
    });

    if (closedBrackets.indexOf(taskArray[0]) > 0 && taskArray[0] !== "|") {
        return false;
    }

    taskArray.forEach((taskBracket) => {
        let isPairBracket = false;

        pairBrackets.forEach((pairBracketsType) => {
            if (
                taskBracket === pairBracketsType[0] &&
                pairBracketsType[1] === "close"
            ) {
                isPairBracket = true;
                pairBracketsType[1] = "open";
                expectBracketsArray.push(taskBracket);
            } else if (
                taskBracket === pairBracketsType[0] &&
                pairBracketsType[1] === "open"
            ) {
                isPairBracket = true;
                pairBracketsType[1] = "close";
                taskBracket ===
                expectBracketsArray[expectBracketsArray.length - 1]
                    ? expectBracketsArray.pop()
                    : (isCorrectExpression = false);
            }
        });

        if (isPairBracket === false) {
            if (openBrackets.indexOf(taskBracket) >= 0) {
                expectBracketsArray.push(
                    closedBrackets[openBrackets.indexOf(taskBracket)]
                );
            } else if (openBrackets.indexOf(taskBracket) < 0) {
                taskBracket ===
                expectBracketsArray[expectBracketsArray.length - 1]
                    ? expectBracketsArray.pop()
                    : (isCorrectExpression = false);
            }
        }

    });

    if (expectBracketsArray.length !== 0) {
        isCorrectExpression = false;
    }

    return isCorrectExpression;
}
