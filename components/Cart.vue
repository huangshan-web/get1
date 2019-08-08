<template>
    <div class="mycart">
        <div class="draw-back">
            <a href="javascript:history.go(-1)"></a>
            <span>购物车</span>
        </div>
        <div class="product-item">
            <ul id="inputParent">
                <li v-for="(item,i) of proList" :key="i">
                    <div class="checked-position" >
                        <input type="checkbox" :id="`checkedone${i}`" class="checkChange" @click="oneChange" checked :data-index="i"><label :for="`checkedone${i}`"></label>
                    </div>
                    <div><img :src="item.product_image"></div>
                    <div>
                        <p v-text="item.title" class="item-title"></p>
                        <div class="item-price-counts">
                            <p v-text="`¥${item.price1.toFixed(2)}`" class="price-style"></p>
                            <p class="item-counts">
                                <span class="counts-reduce" @click="countsReduce" :data-pid="item.pid">-</span>
                                <input type="text" v-model="item.counts" class="input-counts">
                                <span class="counts-add" @click="countsAdd" :data-pid="item.pid">+</span>
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="tabbar">
            <div class="tabbar-left checked-position">
                <input type="checkbox" id="checkbox" @click="allChecked"><label for="checkbox" ></label><span class="all-price">总价:</span><span class="price-style" id="aa">¥{{total.toFixed(2)}}</span>
            </div>
            <div>
                <button>去结算</button>
            </div>
        </div>
    </div>
</template>
<script>
import { domainToUnicode } from 'url';
export default {
    data(){
        return {
            proList:[],
            counts:1,
        }
    },
    created(){
        this.getCart();
        
    },
    mounted(){
        this.oneChange(); 
    },
    methods:{
        getCart(){
            var uid=sessionStorage.getItem("uid")
            if(uid!=null){
                var input=document.getElementsByClassName("checkChange")
                this.axios.get('select-mycart',{params:{uid}}).then(result=>{
                    console.log(result)
                    for(var item of result.data){
                        item.checked=true
                    }
                    this.proList=result.data
                    // var num=0
                    // for(var item of this.proList){
                    //     num+=item.price1*item.counts
                    // }
                    // aa.innerHTML="¥"+num.toFixed(2)
                })
            }
        },
        countsAdd(e){
            e.target.previousElementSibling.value++
            var uid=sessionStorage.getItem("uid")
            var pid= e.target.getAttribute("data-pid")
            var cartCounts=e.target.previousElementSibling.value
            this.axios.get("update-cart",{params:{uid,pid,cartCounts}}).then(result=>{
                console.log(result)
                this.axios.get('select-mycart',{params:{uid}}).then(result=>{
                console.log(result)
                this.proList=result.data})
            })
            // this.getCart()
        },
        countsReduce(e){
            if( e.target.nextElementSibling.value>1){
                e.target.nextElementSibling.value--
            }else{
                e.target.nextElementSibling.value=1
            }
            var uid=sessionStorage.getItem("uid")
            var pid= e.target.getAttribute("data-pid")
            var cartCounts=e.target.nextElementSibling.value
            this.axios.get("update-cart",{params:{uid,pid,cartCounts}}).then(result=>{
                console.log(result)
                this.axios.get('select-mycart',{params:{uid}}).then(result=>{
                console.log(result)
                this.proList=result.data})
            })
            
            // this.getCart()
        },
        allChecked(){
            var inputParent=document.getElementById("inputParent")
            var input=inputParent.getElementsByClassName("checkChange")
            var allinput=document.getElementById("checkbox")
            var bool=allinput.checked
            console.log(bool)
            for(var item of input){
                var index=item.getAttribute("data-index")
                this.proList[index].checked=bool
                item.checked=bool
            }
        },
        oneChange(){
            var inputParent=document.getElementById("inputParent")
            var input=inputParent.querySelectorAll(".checkChange")
            var allinput=document.getElementById("checkbox")
            var num=0
            for(var item of input){
                var index=item.getAttribute("data-index")
                this.proList[index].checked=item.checked
                if(item.checked){
                    num++
                }
            }
            console.log(this.proList)
            if(num==input.length){
                allinput.checked=true;
            }else{
                allinput.checked=false;
            }
        },
    },
    computed:{
        total(){
            var sum=0;
            var arr=this.proList;
            console.log(arr)
            for(var item of arr){
                if(item.checked){
                    sum+=item.price1*item.counts
                }
            }
            console.log(sum)
            return sum
        },
    }
}
</script>
<style scoped>
.mycart{
    width: 100%;
    box-sizing: border-box;
}
.draw-back{
    width:100%;
    margin: 0 auto;
    padding-left:10px;
    padding-top:20px !important;
    padding-bottom:10px;
    background: #fff;
    display: flex;
    box-sizing: border-box;
    position: fixed;
    top:0;
    left:0;
    z-index: 9;
}
.draw-back a{
    display:block;
    width:22px;height:22px;
    background: url(../assets/topIco.png) -5px -5px no-repeat;
    background-size:150%;
}
.draw-back span{
    display: inline-block;
    margin: 0 auto;
    padding-bottom: 11px;
    font-size: 18px;
    text-align: center;
}
.product-item{
    width:100%;
    padding-left:10px;
    margin-bottom:60px;
    margin-top:65px;
    box-sizing: border-box;
}
.product-item li{
    display:flex;
    align-items: center;
    background: #fff;
    height:109px;
}
.product-item img{
    width:80px;
    height:80px;

}
.mycart input{
    width:20px;height:20px;
}
.product-item .item-title{
    width:236px;
    height:32px;
    margin-bottom:10px;
    text-align: left;
}
.product-item .item-price-counts{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.price-style{
    font-size:16px;
    color: #f03e3e;
    font-weight: bold;
    font-weight:700;
}
.product-item .item-counts{
    display:flex;
    justify-content: center;
    align-items: center;

}
.item-counts .input-counts{
    width:32px;height:20px;
    box-sizing: border-box;
    border:0;
    outline: none;
    text-align: center;
    border-top:1px solid #ddd;
    border-bottom:1px solid #ddd;
}
.item-counts .counts-reduce,.counts-add{
    display: inline-block;
    width:30px;
    height:20px;
    line-height: 20px;
    font-size:20px;
    text-align: center;
    border:1px solid #ddd;
    box-sizing: border-box;
} 
.item-counts .counts-reduce{
    border-bottom-left-radius:10px;
    border-top-left-radius:10px;
}
.item-counts .counts-add{
    border-bottom-right-radius:10px;
    border-top-right-radius:10px;
}
.tabbar{
    width: 100%;
    height:60px;
    padding:12px;
    background: #fff;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom:0;
    left:0;
    z-index: 9;
}
.tabbar .tabbar-left{
    display: flex;
    align-items: center;
}
.tabbar .all-price{
    padding-left:5px;
    color: #666;
    font-size: 16px;
}
.tabbar button{
    border:0;
    background: #f03e3e;
    border-radius: 5px;
    color:#fff;
    width: 80px;
    height: 35px;
    line-height: 35px;
}
.checked-position{
    position: relative;
}
label{

    display: block;
    width: 20px;
    height: 20px;
    border-radius:50%; 
    border:1px solid rgba(240, 84, 77, 1);
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 8;
}
input:checked +label::before{
    display: block;
    content: "\2714";
    text-align: center;
    font-size: 16px;
    color: white;
    border-radius:50%;
    background: rgba(240, 84, 77, 1)
}

input[type=checkbox]{
	visibility: hidden;
}
</style>


