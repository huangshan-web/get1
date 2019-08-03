<template>
    <div>
        <div class="draw-back">
            <a href="javascript:history.go(-1)"></a>
        </div>
        <div>
            <ul>
                <li v-for="(item,i) of proList" :key="i">
                     
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            proList:[],
        }
    },
    created(){
        this.getCart();
    },
    methods:{
        getCart(){
            var uid=sessionStorage.getItem("uid")
            if(uid!=null){
                this.axios.get('select-mycart',{params:{uid}}).then(result=>{
                    console.log(result)
                    this.proList=result.data
                })
            }
        }
    }
}
</script>
<style scoped>
.draw-back{
    width:100%;
    margin: 0 auto;
    padding-left:25px;
    margin-top:20px !important;
    padding-bottom:10px;
    box-sizing: border-box;
}
.draw-back a{
    display:block;
    width:22px;height:22px;
    background: url(../assets/topIco.png) -5px -5px no-repeat;
    background-size:150%;
}
</style>


