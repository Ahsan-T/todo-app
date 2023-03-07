import React, {Component} from "react";
import gql from 'graphql-tag';
import {graphql} from "react-apollo";
import {hashHistory, Link} from 'react-router'
import query from '../queries/fetchTasks'

class TaskCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {title: ''};
    }

    onSubmit(event) {
        event.preventDefault();
        console.log(this.props)

        this.props.mutate({
            variables: {
                title: this.state.title
            },
            refetchQueries: [{query}]
        }).then(() => hashHistory.push('/'))
    }

    render() {
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>Create a New Task</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Task Title:</label>
                    <input
                        onChange={event => this.setState({title: event.target.value})}
                        value={this.state.title}
                    />
                </form>
            </div>
        );
    }
}

const mutation = gql`
    mutation AddTask($title: String){
        addTask(title: $title){
            title
        }
    }
`;

export default graphql(mutation)(TaskCreate);