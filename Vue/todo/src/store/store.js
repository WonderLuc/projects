

let initialState = {
    state: JSON.parse(localStorage.getItem('state'))||{
        todos:[],
        id:0,
        tasks:[]
    },
    mutations:{
        addTodo(state, todo ){

            state.todos.push({
                id: state.id,
                text: todo.text,
            });
            todo.tasks.forEach(task=>{
                state.tasks.push(task)
            })
            state.id++
        },
        addTask(state, task){
            state.tasks.push(task)
        },
        removeTodo(state, id){
            state.todos = state.todos.filter(todo=>{return todo.id != id});
            state.tasks = state.tasks.filter(task=>{
                    return task.id.match(/\d+/)[0] != id
            });
        },
        toggleCompleted(state, id){
            state.tasks.map(task=>{
                if(task.id != id) return task;
                task.completed = !task.completed;
                return task
            })
        },
        saveChangedText(state, info){
            state.todos.map(todo=>{
                if(todo.id != info.id){
                    return todo;
                }else{
                    todo.text = info.text;
                    return todo;
                }
            })
        },
        deleteTask(state, id){
            state.tasks = state.tasks.filter(task =>{
                return task.id != id;
            })
        },
        changeTaskText(state, info){
            state.tasks.map(task=>{
                if(task.id != info.id){
                    return task;
                }else{
                    task.text = info.text;
                    return task;
                }
            })
        }
    }
    
  };


export default initialState;
  