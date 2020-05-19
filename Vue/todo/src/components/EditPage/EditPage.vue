<template>
<div>
    <div v-if="isEdit" class="show-todo-name">
        <h2>{{todo.text}}</h2>
        <button @click="toggleEdit" class="edit-button">Редактировать</button>
    </div> 
    <div v-else  class="edit-todo-name">
        <input 
            :value='currentText' 
            type='text' 
            @input="handleChanges" 
            @keydown.ctrl.90.prevent="getBack"
            @keydown.ctrl.89.prevent="repeat"
            class="name-input"
            />
        <div>
            <button :disabled="!previousChanges.length" @click="repeat" class="repeat-button">Повторить</button>
            <button @click="getBack" class="cancel-button">Отменить</button>
        </div>
        <div class="button-container">
            <button @click="saveChanges" class="confrim-changes">Сохранить изменения</button>
            <button @click="confrimCancel" class="confrim-cancel">Отменить Изменения</button>
        </div>
    </div>
    <AddTodoComponent @newTask="handleTask"></AddTodoComponent>
    <TaskComponent :id="id" mode="edit" ></TaskComponent>
    <div class='local-footer'>
        <a @click.prevent="toMain" class="back-to-main">К главной</a>
        <button @click="confrimDelete" class="confrim-delete">Удалить заметку</button>
    </div>
    <ModalWindow v-if="isConfrim" :type='type.action' :id="id" @doneConfrim="handleConfrim">
        Вы действительно хотите {{type.text}}?
    </ModalWindow>
</div>
</template>

<script>
import TaskComponent from '../TasksComponent/TasksComponent';
import AddTodoComponent from '../AddTodoComponent/AddTodoComponent';
import ModalWindow from '../ModalWindow/ModalWindow';

export default {
    name:'EditPage',
    components:{
        TaskComponent,
        AddTodoComponent,
        ModalWindow
    },
    data(){
        return{
            store: this.$store,
            isEdit: true,
            id:this.$route.params.id,
            changes:[],
            previousChanges:[],
            isConfrim: false,
            type:{}
        }
    },
    methods:{
        toMain(){
            this.$router.push('/')
        },
        handleTask(task){
            task.id  = this.id +"-"+ document.body.getElementsByClassName('task').length;
            this.$store.commit('addTask',task)
        },
        toggleEdit(){
            this.isEdit = !this.isEdit;
        },
        findInputText(e){
            let elem = e.target;
            let newText = null;
            while(!newText){
                if(elem.previousElementSibling === null){
                        elem = elem.parentElement
                    }
                if(elem.previousElementSibling.tagName == 'INPUT'){
                    newText = elem.previousElementSibling.value;
                }else{
                    
                    elem = elem.previousElementSibling
                    continue;
                }
            }
            return newText;

        },

        saveChanges(e){
            let newText = this.findInputText(e).trim();
            this.changes= [];
            this.previousChanges = [];
            this.$store.commit('saveChangedText',{text:newText, id: this.id})
           this.toggleEdit()
        },
        handleChanges(e){
            if(this.previousChanges){
                this.previousChanges = [];
            }
            this.changes.push(e.target.value);
        },
        getBack(){
            if(this.changes.length){
                this.previousChanges.push(this.changes.pop())
            }
            return ;
            
        },
        repeat(){
            if(this.previousChanges.length){
                this.changes.push(this.previousChanges.pop());
            }
            return ;
        },
        cancelEditText(){
            this.changes= [];
            this.previousChanges = [];
            this.toggleEdit()
        },
        confrimCancel(){
            this.type ={
                action:'cancel',
                text: 'отменить изменения'
            };
            this.isConfrim = !this.isConfrim;
        },
        confrimDelete(){
            this.type ={
                action:'delete',
                text: 'удалить заметку'
            };
            this.isConfrim = !this.isConfrim;
        },
        handleConfrim(result){
            if(result.answer){
                switch(result.type){
                    case 'delete':
                        this.$store.commit('removeTodo',this.id);
                        this.$router.push('/');
                        break;
                    case 'cancel':
                        this.cancelEditText();
                        break;
                }
            }
            this.type = {};
            this.isConfrim = !this.isConfrim;
        }

    },
    computed:{
        todo(){
            return this.store.state.todos.filter(todo =>{ 
                    return todo.id == this.id })[0];
        },
        currentText(){
            return this.changes.length? this.changes[this.changes.length - 1]: this.todo.text;
        }
    },
    
}

</script>
<style>
.show-todo-name, .edit-todo-name{
    display: flex;
    padding: 20px;
}
.edit-todo-name{
    flex-direction: column;
}

.show-todo-name h2{
    font-size: 2rem;
    background: white;
    margin-right: 10px;
    padding: 0 10px;
}

.button-container{
    align-self: center;
}

.edit-button, .repeat-button, .cancel-button, .confrim-changes,.confrim-cancel, .back-to-main, .confrim-delete {
    max-height: 40px;
    border: none;
    font-size: 1.1rem;
    background: rgb(253, 202, 32);
    letter-spacing: 1px;
    padding: 10px;
}
.repeat-button, .cancel-button{
    margin: 5px 5px 5px 0;
    background: rgb(75, 250, 206);
    font-size: 0.7rem;
}
.repeat-button:hover, .cancel-button:hover{
    background: rgb(63, 209, 173);
    box-shadow: inset 0 0 2px black;
}
.confrim-changes{
    margin-right: 10px;
}
.confrim-cancel{
    background: rgb(248, 100, 100);
}
.confrim-changes:hover{
    background:rgb(255, 166, 0);
    box-shadow: inset 0 0 2px black;
}
.confrim-cancel:hover{
    background:rgb(252, 42, 42);
    box-shadow: inset 0 0 2px black;
}
.name-input{
    font-size: 1.5rem;
    border:none;
}
.local-footer{
    display: flex;
}
.back-to-main, .confrim-delete{
    margin: 10px;
}
.back-to-main{
    background: rgb(159, 248, 100);
}
.confrim-delete{
    background:rgb(252, 42, 42);
}
.back-to-main:hover{
    background:rgb(139, 250, 64);
    box-shadow: inset 0 0 2px black;
}
.confrim-delete:hover{
    background:rgb(250, 8, 8);
    box-shadow: inset 0 0 2px black;
}

@media (max-width: 760px){
    .show-todo-name{
        flex-direction: column;
    }
    .show-todo-name h2{
        margin: 0 0 10px 0;
    }
    .edit-button, .repeat-button, .cancel-button, .confrim-changes,.confrim-cancel, .back-to-main, .confrim-delete{
        width: 100%;
        margin: 5px 0;
        font-size: 1.1rem;
    }
    .local-footer{
        flex-direction: column;
    }
    .back-to-main{
        text-align: center;
    }

}

</style>
