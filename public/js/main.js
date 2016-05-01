(function() {
    "use strict";

    class TodoList extends React.Component {
        render() {
            const todos = this.props.todos.map((todo, idx) => {
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
    }
    class Todo extends React.Component {
        handleTodo() {
            const checked = ReactDOM.findDOMNode(this.refs.checkbox).checked;
            const textForm = ReactDOM.findDOMNode(this.refs.text);

            ReactDOM.findDOMNode(this.refs.checkbox).checked = !checked;
            if(checked) {
                textForm.className = "text-primary";
                textForm.style.textDecoration = "";
            } else {
                textForm.className = "text-muted";
                textForm.style.textDecoration = "line-through";
            }
        }
        render() {
            return (
                    <div className="todo">
                    <label>
                    <input ref="checkbox" type="checkbox" className="todoCheckbox" />
                    </label>
                    <span ref="text" className="text-primary" onClick={this.handleTodo.bind(this)}>  {this.props.text}  </span>
                    </div>
                   );
        }
    }

    class TodoForm extends React.Component {
        handleSubmit(e) {
            e.preventDefault();

            const text = ReactDOM.findDOMNode(this.refs.text).value.trim();
            text && this.props.onTodoSubmit(text);
            ReactDOM.findDOMNode(this.refs.text).value = "";
        }
        render() {
            return (
                    <form className="todoForm" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                    <input type="text" className="form-control" placeholder="Todo content" ref="text"/>
                    </div>
                    <input type="submit" className="btn btn-primary" value="追加" />
                    </form>
                   );
        }
    }

    class TodoApp extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                todos: []
            }
        }

        componentDidMount() {
            this.setState({todos: ["ReactでTodoAppを作ってみる"]});
        }

        onTodoSubmit(todo) {
            this.setState({todos: this.state.todos.concat([todo])});
        }

        render() {
            return (
                    <div>
                    <h1>Todo App</h1>
                    <TodoList todos={this.state.todos}/>
                    <hr />
                    <TodoForm onTodoSubmit={this.onTodoSubmit.bind(this)}/>
                    </div>
                   );
        }
    }

    ReactDOM.render(
            <TodoApp />,
            document.getElementById("content")
            );
})()

