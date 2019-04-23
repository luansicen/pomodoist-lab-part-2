import React from 'react';
import Timer from './components/Timer';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import ClearButton from './components/ClearButton';
import EmptyState from './components/EmptyState';

import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.clearCompletedItems = this.clearCompletedItems.bind(this);
    this.startSession = this.startSession.bind(this);
    this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);
    this.toggleItemIsCompleted = this.toggleItemIsCompleted.bind(this);

    this.state = {
      items: [],
      nextItemId: 0,
      sessionIsRunning: false,
      itemIdRunning: null
    };
  }

  addItem(description) {
    const { nextItemId } = this.state;
    const newItem = {
      id:nextItemId,
      description,
      sessionsCompleted:0,
      isCompleted: false
    };
    this.setState((prevState => ({
      // TODO 2: append new items to list and increase nextItemId by 1
      items: prevState.items.concat(newItem),
      nextItemId: prevState.nextItemId + 1
    })));
  }

  clearCompletedItems() {
    this.setState({items: this.state.items.filter(item => !item.isCompleted)})
  }

  increaseSessionsCompleted(itemId) {
    var newItems = this.state.items;
    for (let i = 0; i < newItems.length; i++) {
      if (newItems[i].id == itemId) {
        newItems[i].sessionsCompleted += 1;
        this.setState({
          items: newItems
        });
        break;
      }
    }
  }

  toggleItemIsCompleted(itemId) {
    var newItems = this.state.items;
    var completed = false;
    for (let i = 0; i < newItems.length; i++) {
      if (newItems[i].id == itemId) {
        newItems[i].isCompleted = !newItems[i].isCompleted;
        this.setState({
          items: newItems
        });
      }
      if (newItems[i].isCompleted) {
        completed = true;
      }
    }
    this.setState({areItemsMarkedAsCompleted: completed});
  }

  startSession(id) {
    this.setState((prevState => ({
      // TODO 2: append new items to list and increase nextItemId by 1
      itemIdRunning: id,
      sessionIsRunning: true
    })));
  }

  render() {
    const {
      items,
      sessionIsRunning,
      itemIdRunning,
      areItemsMarkedAsCompleted,
    } = this.state;
    return (
      <div className="flex-wrapper">
        <div className="container">
          <header>
            <h1 className="heading">Today</h1>
            {areItemsMarkedAsCompleted&&<ClearButton onClick={this.clearCompletedItems}/>}
          </header>
          {/* TODO 4 */}
            {sessionIsRunning && <Timer
              mode="WORK"
              onSessionComplete={() => this.increaseSessionsCompleted(itemIdRunning)}
              autoPlays={true}
              key={itemIdRunning}
            /> }
            <div className="items-container">
            {this.state.items.length === 0? <EmptyState />:
              this.state.items.map((item) =>
              <TodoItem
              description={item.description}
              sessionsCompleted={item.sessionsCompleted}
              isCompleted={this.isCompleted}
              startSession = {() => this.startSession(item.id)}
              toggleIsCompleted = {() => this.toggleItemIsCompleted(item.id)}
              //toggleIsCompleted={(this.toggleIsCompleted)}
              key={item.id}
              />)
            }
            </div>
        </div>
        <footer>
          <TodoInput addItem={this.addItem} />
        </footer>
      </div>
    );
  }
}

export default App;
