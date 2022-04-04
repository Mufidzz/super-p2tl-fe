import React, { Fragment, useState, useEffect } from 'react';
import { firebase_app } from '../../../Config/Config';
import { deleteList, creatTodoList, updateTask } from '../../../Services/TodoFirebase.service';
import { toast } from 'react-toastify';
import { AddNewTask, AddTask, Close } from '../../../Constant';
import TodoMark from './TodoMark';
import { Check, Trash2 } from 'react-feather';
import { Btn, H4, LI, UL } from '../../../AbstractElements';

const TodoData = () => {
    const border_danger = useState('');
    const [addTask, setAddTask] = useState('');
    const [task, setTask] = useState('');
    const [todoList, setTodoList] = useState([]);
    const handleRemoveTodo = (todoId) => {
        deleteList(todoId);
        toast.success('Deleted Task !');
    };
    useEffect(() => {
        const unsubscribe = firebase_app.firestore().collection('todo').onSnapshot((snapshot) => {
            const newItem = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setTodoList(newItem);
        });
        return () => unsubscribe();
    }, []);
    const openTaskWrapper = () => {
        setAddTask(' visible');
        document.querySelector('.add-task-btn').classList.add('hide');
    };
    const addNewTask = () => {
        if (task === '') {
            document.getElementById('newtask').classList.remove('border-danger');
            document.getElementById('newtask').classList.add('border-danger');
        } else {
            creatTodoList(task);
            setAddTask(' visible');
            setTask('');
            document.getElementById('newtask').value = '';
            document.getElementById('newtask').classList.add('taskmag-hide');
            document.getElementById('newtask').classList.remove('taskmag-show');
            document.getElementById('addTaskBtn').classList.add('hide');
        }
        // if (task === '') {
        //     document.querySelector('.ng-valid').classList.remove('border-danger');
        //     document.querySelector('.ng-valid').classList.add('border-danger');
        // } else {
        //     creatTodoList(task);
        //     setAddTask(' visible');
        //     setTask('');
        //     document.getElementById('newtask').value = '';
        //     document.querySelector('.ng-valid').classList.add('taskmag-hide');
        //     document.querySelector('.ng-valid').classList.remove('taskmag-show');
        //     document.querySelector('.add-task-btn').classList.remove('hide');
        // }
    };
    const handleMarkedTodo = (index, todo) => {
        if (todo.completed === false) {
            toast.success('Task Completed !');
        }
        if (todo.completed === true) {
            toast.error('Task In-completed !');
        }
        todo.completed = !todo.completed;
        updateTask(todo);
    };
    const closeTaskWrapper = () => {
        setAddTask('');
        document.getElementById("addTaskBtn").classList.remove('hide');
    };
    const onTaskChanged = (e) => {
        setTask(e.currentTarget.value);
    };
    return (
        <Fragment>
            <TodoMark />
            <div className="todo-list-body">
                <UL attrUL={{ className: 'simple-list', id: 'todo-list' }} >
                    {todoList &&
                        todoList.map((todoData) =>
                            <LI attrLI={{ className: 'task ' + (todoData.completed ? 'completed' : '') }} key={todoData.id}>
                                <div className="task-container">
                                    <H4 attrH4={{ className: 'task-label' }}>{todoData.task}</H4>
                                    <span className="task-action-btn">
                                        <span className="action-box large delete-btn" title="Delete Task" onClick={() => handleRemoveTodo(todoData.id)} >
                                            <Trash2 className="icon icon-check" /> </span>
                                        <span className="action-box large complete-btn" title="Mark Complete" onClick={() => handleMarkedTodo(todoData.id, todoData)} >
                                            <Check className="icon icon-check" />
                                        </span>
                                    </span>
                                </div>
                            </LI>
                        )}
                </UL>
            </div>
            <div className="todo-list-footer">
                <div className="add-task-btn-wrapper"><span className="add-task-btn" id="addTaskBtn">
                    <Btn attrBtn={{ color: 'primary', onClick: openTaskWrapper }} > {AddNewTask}</Btn></span></div>
                <div className={'new-task-wrapper' + addTask}>
                    <textarea className={'ng-untouched ng-pristine ng-valid' + border_danger} id="newtask"
                        placeholder="Enter new task here. . ."
                        defaultValue={task} onChange={onTaskChanged} ></textarea>
                    <Btn attrBtn={{ color: 'danger', className: 'cancel-btn', id: 'close-task-panel', onClick: closeTaskWrapper }} >{Close}</Btn>
                    <Btn attrBtn={{ color: 'success', className: 'ms-3 add-new-task-btn', id: 'add-task', onClick: addNewTask }} >{AddTask}</Btn>
                </div>
            </div>
        </Fragment>
    );
};
export default TodoData;