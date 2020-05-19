<template>
  <div class="modal-window-blackout">
    <div class="modal-window">
      <h3 class="answer">
          <slot></slot>
      </h3>
      <button @click="$emit('doneConfrim',{ answer:true ,type, id})" class="confrim-yes">Да </button>
      <button @click="$emit('doneConfrim',{ answer:false ,type, id})" class="confrim-no">Нет </button>
    </div>
  </div>
</template>

<script>
export default {
  props:['type', 'id'],
  data(){
    return {
      
    }
  }
}
</script>

<style>
 .modal-window-blackout{
   position: fixed;
   top:0;
   left: 0;
   right:0;
   bottom: 0;
   background: rgba(0,0,0,.7);
   z-index: 998;
 }
 .modal-window{
   position: fixed;
   background: white;
   top:30%;
   left: 17%;
   width: 70%;
   height: 50%;
   display: grid;
   grid: 1fr 1fr 1fr 2fr/repeat(11,1fr);
 }
 .answer{
   padding-top: 20px;
   grid-area: 1/2/2/11;
   color:black;
   font-size: 2rem;
 }
 .confrim-yes, .confrim-no{
    border: none;
    font-size: 1.1rem;
    padding: 10px;
    background: rgb(253, 202, 32);
    letter-spacing: 1px;
    margin-right: 10px;
 }
 .confrim-yes{
   grid-area: 3/4/4/6;
 }
.confrim-no{
   grid-area: 3/7/4/9;
   background: rgb(248, 100, 100);
 }
 .confrim-no:hover{
    background:rgb(252, 42, 42);
    box-shadow: inset 0 0 2px black;
 }
 .confrim-yes:hover{
    background:rgb(255, 166, 0);
    box-shadow: inset 0 0 2px black;
 }
 @media (max-width: 760px){
   .modal-window{
      top:10px;
      left: 10px;
      width:94%;
      height: 96%;
      grid: 1fr 1fr 1fr /repeat(11,1fr);
      row-gap: 20px;
   }
   .confrim-yes{
      margin: 0;
      grid-area: 2/1/3/12;
    }
   .confrim-no{
      grid-area: 3/1/4/12;
      margin: 0;
      margin-bottom: 20px;
    }
 }

</style>