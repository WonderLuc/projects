<template>
    <div class="add-todo-wrapper">
        <input 
            v-if="this.$route.path === '/'"
            class="todo-name" 
            placeholder="Название заметки"
            type="text" 
            v-model="text" />
        <input 
            placeholder="Название задачи"
            class="task-name"
            type="text"
            v-model="task" 
            @keypress.enter="addTask"/>
        <button 
            @click="addTask" 
            class="confrim-task">
            Добавить задачу
        </button>
        <button     
            @click="handleNewTodo"
            v-if="this.$route.path === '/'"
            class="confrim-todo">
            Создать заметку
        </button>
        <button
            @click="cancelNewTodo"
            v-if="this.$route.path === '/'"
            class="cancel-todo">
            Отменить создание
        </button>
        <ul 
            v-if="this.$route.path === '/'"
            class="added-tasks">
            <li v-for="task in tasks" :key="task.id">{{task.text}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name:'AddTodoComponent',
    data(){
        return{
            taskId: 0,
            task: null,
            tasks:[],
            text:null,
            store: this.$store
        }
    },
    methods:{
        handleNewTodo(){
            if(!this.text){
                return;
            }
            this.store.commit('addTodo',{text:this.text, tasks:this.tasks});
            this.text = null;
            this.tasks = [];
            this.$emit('done');
        },
        addTask(){
            if(!this.task){
                return;
            }
            if(this.$route.path === '/'){
                let id = this.store.state.id;
                this.tasks.push({id:id+'-'+this.taskId, text:this.task, completed: false});
                this.taskId++;
                
            }else{
                this.$emit('newTask', {text:this.task, completed: false});
            } 
            this.task = null;
        },
        cancelNewTodo(){
            this.text = null;
            this.tasks = [];
            this.$emit('done');
        }
    }
}  
</script>

<style>
.add-todo-wrapper{
    margin: 20px 0;
    height: 100%;
    width:100%;
    display:grid;
    grid-gap: 10px;
    
}
.todo-name{
    grid-area: 1/1/2/12;
    padding: 10px;
    font-size: 1.1rem;
    border:none;
    border-radius: 2px;
    border-bottom: 1px solid rgb(253, 202, 32);
    background-color:  rgb(24, 24, 24);
    color:white;
}
.task-name{
    grid-area: 2/1/3/7;
    font-size: 1.1rem;
    padding: 10px;
    border:none;
    border-radius: 2px;
    border-bottom: 1px solid rgb(253, 202, 32);
    background-color:  rgb(24, 24, 24);
    color:white;
}
.confrim-task{
    grid-area: 2/7/3/10;
    font-size: 1.1rem;
    padding:10px;
    background: #b640ec;
    border: none;
    letter-spacing: 1px;
}
.confrim-task:hover{
    background:#931cf5;
    box-shadow: inset 0 0 2px black;
}
.confrim-todo, .cancel-todo{
    grid-area: 4/4/5/7;
    font-size: 1.1rem;
    border: none;
    padding: 10px;
    background: rgb(253, 202, 32);
    letter-spacing: 1px;
}
.confrim-todo:hover{
    background:rgb(255, 166, 0);
    box-shadow: inset 0 0 2px black;
}
.cancel-todo{
    grid-area: 4/7/5/10;
    background: rgb(248, 100, 100);
}
.cancel-todo:hover{
    background:rgb(252, 42, 42);
    box-shadow: inset 0 0 2px black;
}
.added-tasks{
    margin: 20px 0;
    grid-area: 3/2/4/12;
    font-size: 1.1rem;
    list-style-type: disclosure-closed;
}

@media (max-width: 760px){
    .task-name{
        grid-area: 2/1/3/12;
    }
    .confrim-task{
        grid-area: 3/1/4/12;
        
    }
    .confrim-todo{
         grid-area: 5/1/6/12;
    }
    .cancel-todo{
        grid-area: 6/1/7/12;
    }
    .added-tasks{
        grid-area: 4/2/5/12;
    }
}

</style>