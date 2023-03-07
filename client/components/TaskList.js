import React, {Component} from "react";
import gql from 'graphql-tag'
import {graphql} from "react-apollo";
import {hashHistory, Link} from "react-router";
import query from '../queries/fetchTasks';

class TaskList extends Component {
    constructor(props) {
        super(props);

        this.state = {title: ''};
    }

    onTaskDelete(id) {
        this.props.mutate({variables: {id}})
            .then(() => this.props.data.refetch())
    }

    renderTasks() {
        return this.props.data.tasks.map(({id, title}) => {
            return (
                <li key={id} className="collection-item">
                    <Link to={`/tasks/${id}`}>{title}</Link>
                    <i className="material-icons" onClick={() => this.onTaskDelete(id)}>delete</i>
                </li>
            );
        });
    }

    render() {
        if (this.props.data.loading) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <h3>Todo App</h3>
                <ul className="collection">
                    {this.renderTasks()}
                </ul>
                <Link
                    to="/tasks/new"
                    className="btn-floating btn-large red right"
                >
                    <i className="material-icons">add</i>
                </Link>
            </div>
        );
    }
}

const mutation = gql`
    mutation DeleteTask($id: ID){
        deleteTask(id: $id){
            id
        }
    }
`;

export default graphql(mutation)(
    graphql(query)(TaskList)
);