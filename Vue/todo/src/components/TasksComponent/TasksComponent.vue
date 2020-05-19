<template>
    <ul class="tasks">
        <li 
            v-for="task in tasks" 
            :key="task.id" 
            :id="task.id" 
            
            class="task"
            >
            <input 
                @click="toggleChild"
                type="checkbox" 
                :disabled="mode != 'edit'" 
                :checked="task.completed"
                class="task-checkbox"
                />
            
            <input 
                type="text" 
                :value="task.text" 
                disabled="true" 
                :class="{completed: task.completed}"
                class="task-text">
            <button v-if="mode == 'edit'" @click="editTaskText" class="edit-task-button">Редактировать</button>
            <button v-if="mode == 'edit'" @click="deleteChild" class="delete-task-button">Удалить</button>

        </li>
        <li v-if="mode == 'show'" class="ellipsis"> <span>...</span> </li>
    </ul>
</template>

<script>
export default {
    name:"TasksComponent",
    props:[
        'id'
        ,'mode'
    ],
    data(){
        return {
            store: this.$store,

        }
    },
    methods:{
        toggleChild(e){
            if(this.mode != 'edit'){
                return;
            }
            this.$store.commit('toggleCompleted',e.target.parentElement.id) 
        },
        deleteChild(e){
            console.log(e.target.parentElement.id)
            this.$store.commit('deleteTask',e.target.parentElement.id)
        },
        editTaskText(e){
            if(e.target.innerText == 'Сохранить'){
                this.$store.commit('changeTaskText',{
                    id: e.target.parentElement.id,
                    text: e.target.previousElementSibling.value
                })
            }
            e.target.previousElementSibling.disabled = !e.target.previousElementSibling.disabled;
            e.target.previousElementSibling.classList.toggle('task-text_active');
            e.target.innerText == 'Редактировать'? e.target.innerText = 'Сохранить': e.target.innerText = 'Редактировать';
        }
    },
    computed:{
        tasks(){
            let tasks = this.store.state.tasks.filter(task=>{
                return  task.id.match(/\d+/)[0] == this.id });
                if(this.mode == 'show'){
                    return tasks.slice(0,3)
                }
                return tasks;
        }
    },
    
}
</script>

<style>
.completed{
    text-decoration: line-through;
}

.tasks{
    background: white;
    grid-area: 2/1/3/12;
    list-style: none;
    padding:5px;
    display: flex;
    flex-direction: column;
    align-items: center;  
}
.task{
    padding:5px;
    display: flex; 
    
}
.task-checkbox{
    margin-right: 10px;
}
input{
    text-decoration: inherit;
}
.task-text{
    font-size: 1.1rem;
    border: none;
    background: white;
    margin-right: 10px;
    width:500px;

}
.task-text_active{
    border-bottom: 1px solid gray;
}
.edit-task-button, .delete-task-button{
    border: none;
    font-size: 1.1rem;
    padding: 10px;
    background: rgb(253, 202, 32);
    letter-spacing: 1px;
    margin-right: 10px;
}

.delete-task-button{
    background: rgb(248, 100, 100);
}
.edit-task-button:hover{
    background:rgb(255, 166, 0);
    box-shadow: inset 0 0 2px black;
}
.delete-task-button:hover{
    background:rgb(252, 42, 42);
    box-shadow: inset 0 0 2px black;
}
.ellipsis{
    font-size: 2rem;
    color:black;
}

@media (max-width: 760px){
    .tasks{
        align-items: stretch;
    }
    .task{
        flex-direction: column;
        position: relative;
    }
    .task-checkbox{
        position: absolute;
        top: 24px;
        left: 14px;
    }
    .task-text{
        font-size: 1.5rem;
        width:90%;
        align-self: flex-end;
        margin: 10px 0;
    }
    .edit-task-button, .delete-task-button{
        margin:0;
        align-self: stretch;
    }
}

</style>