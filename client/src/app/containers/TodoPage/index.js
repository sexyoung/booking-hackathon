import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TodoActions from 'actions/TodoActions';
import style from './todo-page.scss';

class TodoPage extends React.Component {
  static propTypes = {
    todoActions: PropTypes.object.isRequired,
    todos:       PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.todoActions.getTodos();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { todo } = this;
    if (todo.value) {
      this.props.todoActions.create({ todo: todo.value });
    }
    todo.value = '';
  }

  render() {
    const {
      todos,
    } = this.props;
    return (
      <div className={style['todo-page']}>
        <h1>Todo Page</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            ref={el => this.todo = el}
            placeholder="add todo..."
          />
          <button>送出</button>
        </form>
        <div className={style['todo-list']}>
          {todos.map((todo) => {
            return (
              <div key={todo.id} className={style.todo}>
                <div className={style.text}>{todo.todo}</div>
                <span className={style.time}>{todo.created_at}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos.toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    todoActions: bindActionCreators(TodoActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);
