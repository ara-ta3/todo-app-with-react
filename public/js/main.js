(function() {
    "use strict";
    var TodoList = React.createClass({
        render: function() {
            var todos = this.props.todos.map((todo, idx) => {
                return (
                        <Todo key={idx + "-" + Date.now()} text={todo} />
                       )
            });
            return (
                    <div className="todolist">
                    <h2>Todo List</h2>
                    {todos}
                    </div>
                   );
        }
    });
    var Todo = React.createClass({
        handleTodo: function() {
            var checked = ReactDOM.findDOMNode(this.refs.checkbox).checked;
            ReactDOM.findDOMNode(this.refs.checkbox).checked = !checked;
            var textForm = ReactDOM.findDOMNode(this.refs.text);
            if(checked) {
                textForm.className = "text-primary";
                textForm.style.textDecoration = "";
            } else {
                textForm.className = "text-muted";
                textForm.style.textDecoration = "line-through";
            }
        },
        render: function() {
            return (
                    <div className="todo">
                    <label>
                    <input ref="checkbox" type="checkbox" className="todoCheckbox" />
                    </label>
                    <span ref="text" className="text-primary" onClick={this.handleTodo}>  {this.props.text}  </span>
                    </div>
                   );
        }
    });

    var TodoForm = React.createClass({
        handleSubmit: function(e) {
            e.preventDefault();
            var text = ReactDOM.findDOMNode(this.refs.text).value.trim();
            if(text) {
                this.props.onTodoSubmit(text);
                ReactDOM.findDOMNode(this.refs.text).value = "";
            }
        },
        render: function() {
            return (
                    <form className="todoForm" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                    <input type="text" className="form-control" placeholder="Todo content" ref="text"/>
                    </div>
                    <input type="submit" className="btn btn-primary" value="追加" />
                    </form>
                   );
        }
    });

    var TodoApp = React.createClass({
        getInitialState: function() {
            return {todos: []};
        },
        componentDidMount: function() {
            this.setState({todos: ["hogehoge"]});
        },
        onTodoSubmit: function(todo) {
            this.setState({todos: this.state.todos.concat([todo])});
        },
        render: function() {
            return (
                    <div>
                    <h1>Todo App</h1>
                    <TodoList todos={this.state.todos}/>
                    <hr />
                    <TodoForm onTodoSubmit={this.onTodoSubmit}/>
                    </div>
                   );
        }
    });

    ReactDOM.render(
            <TodoApp />,
            document.getElementById("content")
            );
})()

