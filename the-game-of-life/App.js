import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import { createEmptyGrid, toBeDisplayedGrid, generateNextGeneration } from './game-of-life-functions';
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      grid: createEmptyGrid(),
      onlyAliveCells: [{ xAxis: 3, yAxis: 0 }, { xAxis: 3, yAxis: 1 }, { xAxis: 3, yAxis: 2 }],
      generationNumber: 0,
      gameStatus: "off"
    }
  }
  start() {
    var count = this.state.generationNumber;
    var generationLoop = setInterval(() => {
      var nextGenOfAlive = generateNextGeneration(this.state.onlyAliveCells);
      var nextGenGrid = toBeDisplayedGrid(nextGenOfAlive);
      count += 1;
      this.setState({ grid: nextGenGrid, onlyAliveCells: nextGenOfAlive, generationNumber: count })
      if (this.state.gameStatus === "paused" || this.state.gameStatus === "game over") {
        clearInterval(generationLoop)
      } else if (count <= 0) {
        clearInterval(generationLoop)
      } else if (this.state.onlyAliveCells.length === 0) {
        clearInterval(generationLoop);
      }
    }, 1000);
  }
  pause() {
    this.setState({ gameStatus: "paused" })
  }
  clear() {
    this.setState({ grid: createEmptyGrid(), onlyAliveCells: [], generationNumber: 0, gameStatus: "game over" })
  }
  bringToLife(cell) {
    var allAliveCells = this.state.onlyAliveCells;
    var displayedGrid = this.state.grid;
    if (cell.status === "dead") {
      allAliveCells.push({ ...cell, status: "alive" })
      displayedGrid[displayedGrid.indexOf(cell)].status = "alive";
    } else {
      allAliveCells = allAliveCells.splice(allAliveCells.indexOf(cell), allAliveCells.indexOf(cell) + 1);
      displayedGrid[displayedGrid.indexOf(cell)].status = "dead";
    }
    console.log("grid", allAliveCells)
    this.setState({ grid: displayedGrid, onlyAliveCells: allAliveCells })
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content" />
        <Text>The Game of life!</Text>
        <View style={styles.grid}>
          {this.state.grid.map(element => {
            let displayForStyling = element.status === "alive" ? "#cd5c5c" : "#9370db";
            return <Button title={element.status} color={displayForStyling} key={this.state.grid.indexOf(element)} onPress={() => this.bringToLife(element)} />
          })}
        </View>
        <View style={styles.buttonsContainer}>
          <Button title="Start" onPress={this.start.bind(this)} />
          <Button title="pause" color="orange" onPress={this.pause.bind(this)} />
          <Button title="clear" color="red" onPress={this.clear.bind(this)} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  }
});
