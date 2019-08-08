<template>
    <div>
        <div class="classity-nav">
            产品分类
        </div>
        <van-sidebar v-model="activeKey" class="left-nav">
            <van-sidebar-item v-for="(item,i) of this.list" :key="i" :title="item" />
        </van-sidebar>
        <div class="div">
            <div v-if="this.activeKey==0">
                <div class="pro-tips">为你推荐</div>
                <ul>
                    <li><img src="../assets/c1_1.jpg"><p>磨牙洁齿</p></li>
                    <li><img src="../assets/c1_2.jpg"><p>体内驱虫</p></li>
                    <li><img src="../assets/c1_3.jpg"><p>进口狗粮</p></li>
                    <li><img src="../assets/c1_4.jpg"><p>国产狗粮</p></li>
                    <li><img src="../assets/c1_5.jpg"><p>肠胃护理</p></li>
                </ul>
            </div>   
            <div v-else-if="this.activeKey==1">
                <div class="pro-tips">狗狗主粮</div>
                <ul>
                    <li><img src="../assets/product1-1.jpg"><p>幼犬粮</p></li>
                    <li><img src="../assets/product2-2.jpg"><p>成犬粮</p></li>
                    <li><img src="../assets/product3-1.jpg"><p>全犬粮</p></li>
                    <li><img src="../assets/product4-1.jpg"><p>老犬粮</p></li>
                    <li><img src="../assets/product5-1.jpg"><p>处方粮</p></li>
                    <li><img src="../assets/product6-1.jpg"><p>冻干粮</p></li>
                </ul>
            </div>   
            <div v-else>
                <div class="pro-tips">为你推荐</div>
                <ul>
                    <li><img src="../assets/c1_1.jpg"><p>磨牙洁齿</p></li>
                    <li><img src="../assets/c1_2.jpg"><p>体内驱虫</p></li>
                    <li><img src="../assets/c1_3.jpg"><p>进口狗粮</p></li>
                    <li><img src="../assets/c1_4.jpg"><p>国产狗粮</p></li>
                    <li><img src="../assets/c1_5.jpg"><p>肠胃护理</p></li>
                </ul>
            </div>   
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            activeKey: 0,
            list:["为你推荐","E宠国际","出游洗澡","清凉消暑","狗狗主粮","狗狗零食","狗狗玩具","狗狗清洁","狗狗保健","狗狗护理","狗狗生活","狗狗美容","狗狗服饰"]
        }
    },
    methods:{

    }
}
</script>

<style scoped>
.classity-nav{
    width:100%;
    height:40px;
    line-height: 40px;
    color:#333;
    font-size:16px;
    font-weight: bold;
    border-bottom:1px solid #ddd;
}
.div{
    width:290px;
    float: right;
    padding: 5px;
    box-sizing: border-box;
}
.left-nav{
    float: left;
    margin-bottom: 90px;
}
.div .pro-tips{
    width:100%;
    height:20px;
    padding:5px;
    margin-top: 10px;
    color:#ddd;
    height:20px;
    text-align: left;
}
.div ul{
    display: flex;
    flex-flow: row wrap;
}
.div ul li{
    width:33.33%;
    padding:5px;
    box-sizing: border-box;
}
.div ul img{
    width:100%;
}
</style>
