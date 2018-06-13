function createEmptyGrid() {
    var newGrid = [];
    for (let index = 0; index < 10; index++) {
        for (let secondIndex = 0; secondIndex < 10; secondIndex++) {
            newGrid.push({ xAxis: index, yAxis: secondIndex, status: 'dead' })
        }
    }
    return newGrid;
}
function toBeDisplayedGrid(aliveCells) {
    var onlyAliveCell = aliveCells;
    var emptyGrid = createEmptyGrid();
    var aliveAndDeadGrid = [];
    for (let index = 0; index < aliveCells.length; index++) {
        var cellFound = emptyGrid.find(item => item.xAxis === aliveCells[index].xAxis && item.yAxis === aliveCells[index].yAxis);
        emptyGrid[emptyGrid.indexOf(cellFound)].status = "alive"
    }
    return emptyGrid;
}
function generateNextGeneration(aliveCells) {
    var gridToBeUsedForGen = [];
    var nextGenOfAlive = [];
    var lowestAndHighestOfBoth = findLowestAndHighest(aliveCells);
    for (let index = lowestAndHighestOfBoth.lowestX - 2; index < lowestAndHighestOfBoth.highestX + 2; index++) {
        for (let secondIndex = lowestAndHighestOfBoth.lowestY - 2; secondIndex < lowestAndHighestOfBoth.highestY + 2; secondIndex++) {
            gridToBeUsedForGen.push({ xAxis: index, yAxis: secondIndex, status: 'dead' })
        }
    }
    for (let index = 0; index < aliveCells.length; index++) {
        var cellFound = gridToBeUsedForGen.find(item => item.xAxis === aliveCells[index].xAxis && item.yAxis === aliveCells[index].yAxis);
        gridToBeUsedForGen[gridToBeUsedForGen.indexOf(cellFound)].status = "alive"
    }
    gridToBeUsedForGen.forEach(element => {
        var neighbors = getAllNeighbors(element);
        neighbors = neighbors.map(item => { return gridToBeUsedForGen.find(eachItem => eachItem.xAxis === item[0] && eachItem.yAxis === item[1]) }).filter(leave => leave && leave.status === "alive");
        if (element.status === "dead" && neighbors.length === 3) {
            let cell = { ...element, status: "alive" };
            if (nextGenOfAlive.indexOf(cell) === -1) {
                nextGenOfAlive.push(cell);
            }
        } else if (element.status === "alive" && (neighbors.length === 2 || neighbors.length === 3)) {
            if (nextGenOfAlive.indexOf(element) === -1) {
                nextGenOfAlive.push(element);
            }
        }
    })
    return nextGenOfAlive;
}
function findLowestAndHighest(aliveCells) {
    var onlyXAxis = [];
    var onlyYAxis = [];
    aliveCells.forEach(element => {
        onlyXAxis.push(element.xAxis);
        onlyYAxis.push(element.yAxis);
    });
    var highestX = onlyXAxis.sort((a, b) => b - a)[0];
    var lowestX = onlyXAxis.sort((a, b) => a - b)[0];
    var highestY = onlyYAxis.sort((a, b) => b - a)[0];
    var lowestY = onlyYAxis.sort((a, b) => a - b)[0];
    return { highestX: highestX, highestY: highestY, lowestX: lowestX, lowestY: lowestY }
}
function getAllNeighbors(cell) {
    var allItsNeighbors = [
        [cell.xAxis - 1, cell.yAxis - 1],
        [cell.xAxis - 1, cell.yAxis + 1],
        [cell.xAxis - 1, cell.yAxis],
        [cell.xAxis + 1, cell.yAxis],
        [cell.xAxis + 1, cell.yAxis - 1],
        [cell.xAxis + 1, cell.yAxis + 1],
        [cell.xAxis, cell.yAxis - 1],
        [cell.xAxis, cell.yAxis + 1]];
    return allItsNeighbors;
}
module.exports = { createEmptyGrid, toBeDisplayedGrid, generateNextGeneration }