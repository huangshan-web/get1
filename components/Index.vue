<template>
    <div>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="choice">
                <myChoice></myChoice>
            </mt-tab-container-item>
            <mt-tab-container-item id="classity">
                分类界面
            </mt-tab-container-item>
            <mt-tab-container-item id="book">
                小萌书界面
            </mt-tab-container-item>
            <mt-tab-container-item id="cart">
                
            </mt-tab-container-item>
            <mt-tab-container-item id="me">
                我的界面
            </mt-tab-container-item>
        </mt-tab-container>
        <mt-tabbar v-model="selected" fixed>
            <mt-tab-item id="choice">
                <span class="one" :class="bclass1" @click="span2Click"></span>
            </mt-tab-item>
            <mt-tab-item id="classity">
                <span class="two" :class="bclass2" @click="span2Click"></span>
            </mt-tab-item>
            <mt-tab-item id="book">
                <span class="there" :class="bclass3" @click="span2Click" ></span>
            </mt-tab-item>
            <mt-tab-item id="cart">
                <span class="four" :class="bclass4" @click="span2Click"></span>
            </mt-tab-item>
            <mt-tab-item id="me">
                <span class="five" :class="bclass5" @click="span2Click"></span>
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>
<script>
import myChoice from './Choice'
export default {
    data(){
        return {
            selected:"choice",
            bclass1:{one1:false,},
            bclass2:{two1:false,},
            bclass3:{there:false},
            bclass4:{four1:false},
            bclass5:{five1:false},
        }
    },
    methods:{
        span2Click(e){
            if(e.target.className=="one one1"){
                console.log(11)
                this.bclass1.one1=false
                this.bclass2.two1=false
                this.bclass3.there1=false
                this.bclass4.four1=false
                this.bclass5.five1=false
            }else if(e.target.className=="two"){
                this.bclass1.one1=true
                this.bclass2.two1=true
                this.bclass3.there1=false
                this.bclass4.four1=false
                this.bclass5.five1=false
            }else if(e.target.className=="there"){
                this.bclass1.one1=true
                this.bclass2.two1=false
                this.bclass3.there1=true
                this.bclass4.four1=false
                this.bclass5.five1=false
            }else if(e.target.className=="four"){
                this.bclass1.one1=true
                this.bclass2.two1=false
                this.bclass3.there1=false
                this.bclass4.four1=true
                this.bclass5.five1=false
            }else if(e.target.className=="five"){
                this.bclass1.one1=true
                this.bclass2.two1=false
                this.bclass3.there1=false
                this.bclass4.four1=false
                this.bclass5.five1=true
            }  
            console.log(e.target.className)
        },
    },
    components:{
        myChoice,
    }
}
</script>
<style scoped>
.mint-tab-item-label span{
    display:block;
    width:45px;height:45px;
    margin:0 auto;
    background: url("../assets/tabbar.png") 0 0 no-repeat;
    background-size: 385px auto;
}
.mint-tab-item-label .one{background-position:0px -58px;}
.mint-tab-item-label .one1{background-position:0px 0px;}
.mint-tab-item-label .two{background-position:-54px 0px;}
.mint-tab-item-label .two1{background-position:-54px -58px;}
.mint-tab-item-label .there{background-position:-180px 0px;}
.mint-tab-item-label .there1{background-position:-180px -58px;}
.mint-tab-item-label .four{background-position:-112px 0px;}
.mint-tab-item-label .four1{background-position:-112px -58px;}
.mint-tab-item-label .five{background-position:-256px 0px;}
.mint-tab-item-label .five1{background-position:-256px -58px;}
</style>
