const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const Task = mongoose.model('task');
const TaskType = require('./task_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTask: {
      type: TaskType,
      args: {
        title: { type: GraphQLString }
      },
      resolve(parentValue, { title }) {
        return (new Task({ title })).save()
      }
    },
    deleteSong: {
      type: TaskType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Task.findOneAndRemove(id);
      }
    }
  }
});

module.exports = mutation;
