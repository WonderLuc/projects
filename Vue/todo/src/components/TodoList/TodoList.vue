<template>
<div class="cards">
    <div v-for="todo in reverseTodo" :key="todo.id"  class="card">
        <h2 class="card-todo"><span>{{todo.text}}</span></h2>
        <button @click="toEdit" :id="todo.id" class="change-button">Изменить</button>
        <button @click="confrimDelete" :id="todo.id" class="delete-button">Удалить</button>
       <TaskComponent :id="todo.id" mode="show"></TaskComponent>
    </div>
    <ModalWindow v-if="isConfrim" type='delete' :id="confrimId" @doneConfrim="handleConfrim">
        Вы действительно хотите удалить заметку?
    </ModalWindow>
</div>
    
</template>

<script>
import TaskComponent from '../TasksComponent/TasksComponent';
import ModalWindow from '../ModalWindow/ModalWindow';

export default {
     components:{
        TaskComponent,
        ModalWindow
    },
    data(){
        return{
            store: this.$store.state,
            isConfrim: false,
            confrimId: null
        }
    },
    name:'todo-list',
    computed:{
        reverseTodo(){
            return Object.assign([],this.store.todos).reverse(); 
        }
    },
    methods:{
        deleteTodo(id){
            this.$store.commit('removeTodo',id)
        },
        toEdit(e){
            this.$router.push(`/edit/${e.target.id}`);
        },
        confrimDelete(e){
            this.isConfrim = !this.isConfrim;
            this.confrimId = e.target.id;
        },
        handleConfrim(result){
            if(result.answer ){
                this.deleteTodo(result.id);
            }
            this.isConfrim = !this.isConfrim;

        }
    },
    
}
</script>

<style>
.cards{
    margin:  20px 0 20px 20px;
    display: flex;
    flex-direction: column;
    
}
.card{
    margin:20px;
    display: grid;
    grid: 40px 1fr/repeat(11,1fr);
    column-gap: 5px;
}
.card-todo{
    grid-area: 1/1/2/8;
    padding:  0  0  5px 0;
    font-size: 2rem;
}
.card-todo span{
    background: white;
    color:black;
    padding: 0 5px;
    
}
.change-button, .delete-button{
    max-height: 40px;
    grid-area: 1/8/2/10;
    border: none;
    font-size: 1.1rem;
    background: rgb(253, 202, 32);
    letter-spacing: 1px;
}
.delete-button{
    grid-area: 1/10/2/12;
    background: rgb(248, 100, 100);
}
.change-button:hover{
    background:rgb(255, 166, 0);
    box-shadow: inset 0 0 2px black;
}
.delete-button:hover{
    background:rgb(252, 42, 42);
    box-shadow: inset 0 0 2px black;
}

@media (max-width: 760px){
    .cards{
    margin:  0;
    
    }

    .card{
    margin:0;
    display: grid;
    column-gap: 10px;
    }

    .card-todo{
        grid-area: 1/1/2/12;
    }

    .change-button{
        grid-area: 3/1/4/12;
        padding: 10px;
        margin-bottom: 10px;
    }

    .delete-button{
        grid-area: 4/1/5/12;
        padding: 10px;
        margin-bottom: 30px;
    }
}


</style>