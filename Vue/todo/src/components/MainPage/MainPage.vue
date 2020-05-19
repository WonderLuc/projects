<template>
    <div class="main-page-wrapper">
        <AddTodoComponent v-if="isNew" @done="toggleTodoCreation"></AddTodoComponent>
        <button v-else @click="toggleTodoCreation" class="main-add-button">Добавить заметку</button>
        <TodoList></TodoList>
    </div>
</template>

<script>
import TodoList from '../TodoList/TodoList';
import AddTodoComponent from '../AddTodoComponent/AddTodoComponent';
export default {
    name:'MainPage',
    components:{
        TodoList,
        AddTodoComponent
    },
    data(){
        return{
            isNew: false,
        }
    },
    methods:{
        toggleTodoCreation(){
            this.isNew=!this.isNew;
        }
    },
       
}

</script>
<style>
.main-page-wrapper{
    max-width: 1200px;
    width:100%;
    height: 100%;
    margin: 0 auto;
    background-color: rgb(24, 24, 24);
    color:white;
    display:flex;
    flex-direction: column;
}
.main-add-button{
    width:300px;
    margin: 20px;
    align-self:flex-end;
    border: none;
    padding: 10px;
    font-size: 1.1rem;
    background: rgb(253, 202, 32);
    letter-spacing: 1px;
    
    
}
.main-add-button:hover{ 
    background:rgb(255, 166, 0);
    box-shadow: inset 0 0 2px black;
}

@media (max-width: 760px) {
    .main-add-button{
        width: 100%;
        align-self: stretch;
        margin: 30px 0;
    }
}
</style>