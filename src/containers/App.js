import React from 'react';
import CardList from '../components/CardList';
import SearchField from '../components/SearchField';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';


class App extends React.Component {
    constructor(){
        super();
        this.state = {
            robots: [],
            searchfield: ''

        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots:users}));
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
        
    }


    render(){
        const {robots, searchfield} = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        if (!robots.length) {
            return <h1>LOADING...</h1>
        } else {
            return (
                <div className='tc'>
                    <h2 className='f2'>RoboFriends</h2>
                    <SearchField onSearchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
        }   
    } 
}

export default App;