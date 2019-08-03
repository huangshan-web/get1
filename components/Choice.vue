
<template>
    <div>
        <!-- 轮播图 -->
        <div id="swipe">
            <mt-swipe :auto="3000">
                <mt-swipe-item><img src="../assets/swipe1.png"></mt-swipe-item>
                <mt-swipe-item><img src="../assets/swipe2.jpg"></mt-swipe-item>
                <mt-swipe-item><img src="../assets/swipe3.jpg"></mt-swipe-item>
                <mt-swipe-item><img src="../assets/swipe4.jpg"></mt-swipe-item>
                <mt-swipe-item><img src="../assets/swipe5.png"></mt-swipe-item>
                <mt-swipe-item><img src="../assets/swipe6.jpg"></mt-swipe-item>
            </mt-swipe>
        </div>
        <!-- 导航搜索 -->
        <div class="nav-top">
            <div class="search">
                <router-link to="Search" class="left-search">
                    <span><input type="text" placeholder="请输入搜索内容"></span>
                </router-link>
                <span :class="Sclass"></span>
            </div>
            <div class="nav">
                <ul>
                    <li>精选</li>
                    <li>进口狗粮</li>
                    <li>国产狗粮</li>
                    <li>内外驱虫</li>
                    <li>五官护理</li>
                </ul>
            </div>
        </div>
        <!-- 录播图下导航条 -->
        <div class="nav-buttom">
            <ul>
                <li><router-link to=""><img src="../assets/a1.png"></router-link></li>
                <li><router-link to=""><img src="../assets/a2.png"></router-link></li>
                <li><router-link to=""><img src="../assets/a3.png"></router-link></li>
                <li><router-link to=""><img src="../assets/a4.png"></router-link></li>
                <li><router-link to=""><img src="../assets/a5.png"></router-link></li>
            </ul>
        </div>
        <!-- 新人专享 -->
        <div class="newcomers">
            <ul>
                <li><router-link to=""><img src="../assets/b1.jpg"></router-link></li>
                <li><router-link to=""><img src="../assets/b2.jpg"></router-link></li>
            </ul>
        </div>
        <!--  -->
        <div class="gifimage">
            <div>
                <img src="../assets/c1.gif">
            </div>
        </div>
        <!-- 每日抢购 -->
        <div class="daily-discount">
            <div>
                <div class="discount-img">
                    <p><img src="../assets/d1.png"></p>
                </div>
                <div class="discount-pro">
                    <div id="container">
                        <p><router-link to=""><img v-lazy="'http://127.0.0.1:3000/src/assets/d2.jpg'"></router-link></p>
                        <p>¥22.90</p>
                        <p>¥229.00</p>
                    </div>
                    <div>
                        <p><router-link to=""><img v-lazy="'http://127.0.0.1:3000/src/assets/d4.jpg'"></router-link></p>
                        <p>¥22.90</p>
                        <p>¥229.00</p>
                    </div>
                </div>
            </div>
            <div>
                <div class="discount-img">
                    <p><img src="../assets/d5.png"></p>
                </div>
                <div class="discount-pro">
                    <div>
                        <p><router-link to=""><img src="../assets/d6.jpg"></router-link></p>
                        <p>¥22.90</p>
                        <p>¥229.00</p>
                    </div>
                    <div>
                        <p><router-link to=""><img src="../assets/d7.jpg"></router-link></p>
                        <p>¥22.90</p>
                        <p>¥229.00</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 国产狗粮 -->
        <div class="dog-food">
            <span class="df1">国产狗粮</span><span><router-link to="">进入>></router-link></span>
        </div>
        <div class="food-pro">
            <div class="food-add">
                <div>
                    <img class="food-img" src="../assets/food.png">
                </div>
                <div class="foos-swrip">
                    <!-- <ul class="food" >
                        <li v-for="(item,i) of foodlist" :key="i">
                            <router-link to=""><img :src="item.pic"></router-link>
                            <p class="pricestyle1">¥<span v-text="item.price1.toFixed(2)" ></span></p>
                            <p class="pricestyle2">¥<span v-text="item.price2.toFixed(2)"></span></p>   
                        </li>
                    </ul> -->
                    <swiper :options="swiperOption" class="food">
                        <swiper-slide v-for="(item,i) of foodlist" :key="i" class="food-item">
                            <router-link to=""><img :src="item.pic"></router-link>
                            <p class="pricestyle1">¥<span v-text="item.price1.toFixed(2)" ></span></p>
                            <p class="pricestyle2">¥<span v-text="item.price2.toFixed(2)"></span></p>  
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
        </div>
        <!-- 猜你喜欢 -->
        <div class="dog-food">
            <span class="df1">猜你喜欢</span>
        </div>
        <div class="you-like">
            <div id="container">
                <ul>
                    <li v-for="(item,i) of foodlist" :key="i">
                        <p><router-link :to="`Product?pid=${item.pid}`"><img v-lazy="item.pic"></router-link></p>
                        <p v-text="item.title" class="titlestyle"></p>
                        <p class="pricestyle1">
                            <span v-text="`¥${item.price1.toFixed(2)}`"></span>
                            <span><router-link to=""><img src="../assets/cart.png"></router-link></span>
                        </p>
                    </li>
                </ul>
                    
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            Sclass:{change:false},
            foodlist:[],
            swiperOption: {
                slidesPerView: 3.5,
                spaceBetween: 30,
                freeMode: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            }
        }
    },
    created() {
        this.getProduct();
    },
    mounted(){  
        this.Scroll();
    },
    methods:{
        Scroll:function(){
            window.addEventListener('scroll', this.handleScroll, true);  // 监听（绑定）滚轮滚动事件
        },
        handleScroll: function () {
            let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            // 找到改变的元素
            let navLi=document.querySelector(".nav ul")
            let navDiv=document.querySelector(".nav-top") 
            let navSpan=document.querySelector(".nav-top .search>span") 
            // 设备/屏幕高度
            let scrollObj = document.getElementById("swipe"); // 滚动区域
            if(scrollObj!=null){
            let scrollTop = scrollObj.getBoundingClientRect().top; // div 到头部的距离
            // let scrollBottom = scrollObj.getBoundingClientRect().bottom; // div 到底部的距离
            // console.log(scrollTop,scrollBottom)
            // let scrollHeight = scrollObj.scrollHeight; // 滚动条的总高度
            //滚动条到底部的条件
            if(scrollTop<-20){
                navDiv.style.background="#fff"
                navLi.style.color="#333"
                this.Sclass.change=true
            }else{
                navDiv.style.background="transparent"
                navLi.style.color="#fff"
                this.Sclass.change=false
            }
            }  
        },
        getProduct:function(){
            this.axios.get("index").then(result=>{
            this.foodlist=result.data
            })
        },
    }
}
</script>
<style scoped>
.mint-swipe-item img{ 
    width: 100%;
}
.mint-swipe{
    border-bottom-right-radius:5%;
    border-bottom-left-radius:5%;
    overflow: hidden;
    height: 290px;
}
/* 头部搜索栏 */
.nav-top{
    width:100%;
    height:99px;
    background: transparent;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
}
.nav-top .search{
    width:345px;height:30px;
    padding:0 15px;
    margin-top:25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.nav-top .search .left-search{
    width:305px;height:30px;
    border-radius:25px;
    outline: none;
    border: none;
    background: #f7f7f7; 
}
.nav-top .search input{
    width:305px;height:30px;
    border-radius:25px;
    outline: none;
    border: none;

    background: url("../assets/search.png") left center no-repeat;
    background-size:10px 10px; 
    background-position-x: 15px;
}
.nav-top .search input::placeholder{
    font-size:12px;
    padding-left:30px;
}
.nav-top .search>span{
    display: inline-block;
    width:25px;height:25px;
    background: url("../assets/call1.png") center center no-repeat;
    background-size:100% 100% ;
}
.change{
    background-image: url("../assets/call.png") !important;
}
.nav-top .nav ul{
    height:44px;
    color:#fff;
    display: flex;
    justify-content: space-around;
    align-items: center
}
.nav-top .nav ul li{
    
    list-style: none;
    font-size: 14px;
}
.nav-top .nav ul li:first-child{
    font-size: 20px;
    font-weight: 700;
}

/* 轮播图下方导航条 */
.nav-buttom{
    position: relative;
    top:-20px;left:0px;
    z-index: 2;
}
.nav-buttom ul{
    width:100%;height:115px;
    display:flex;
    margin: 0 auto;
}
.nav-buttom ul li{
    width:75px;
}
.nav-buttom ul li img{
    width:100%;
}
/* 新人专享 */
.newcomers{margin-bottom: 20px}
.newcomers ul{
    width:100%;height:210px;
    display:flex;
    margin: 0 auto;
}
.newcomers ul li{
    width:187.5px;
}
.newcomers ul li img{width:100%}

/*  */
.gifimage{
    width:100%;height:80px;
    margin:0 auto;
}
.gifimage img{
    height:80px;
}

/* 每日抢购 */
.daily-discount{
    border-radius:15px;
    margin:0 10px;
    padding:20px 0;
    box-shadow: 0px 0px 10px 15px #f7f7f7;
}
.daily-discount img{
    width:100%;
}
.daily-discount,.discount-pro{
    display:flex;
    justify-content: center
}
.daily-discount>div{
    width:170.5px;height:162px;
}
.daily-discount .discount-pro div{
    width:80px;height:92px;
}
.daily-discount .discount-img{
    width:145.5px;height:25px;
    padding-left:15px;
    padding-bottom:10px;
    text-align: left;

}
.daily-discount .discount-img img{width:50%;}
.daily-discount .discount-pro>div p:nth-child(2){
    font-size: 14px;
    color: #ff5757;
    font-weight: 700;
}
.daily-discount .discount-pro>div p:nth-child(3){
    font-size: 12px;
    color: #999;
    text-decoration: line-through;
}
/* 国产狗粮 */
.dog-food{
    width:375px;height:24px;
    box-sizing: border-box;
    margin:20px auto;
    
    padding:0 10px;
    line-height: 24px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
}
.dog-food .df1{
    font-size: 20px;
    font-weight:700;
}
.food-pro{
    width: 100%;height:287.17px;
    padding:0 10px;
    margin:0 auto;
    
    margin-bottom:15px; 
    box-sizing: border-box;
}
.food-pro .food-add{
    width: 100%;height:287.17px;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px 15px #f7f7f7;
    border-radius: 15px;
    overflow: hidden;
}
.food-pro .food-img{
    width:100%;
    border-bottom-right-radius: 50%;
    border-bottom-left-radius: 50%;
}
.food-pro .foos-swrip{
    width:100%;
}
.food-pro .food{
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
    margin-top:10px;
}
.food-pro .food .food-item{
    width:98.5px !important;
    height:119.5px !important;
    margin-right:0 !important;
}
.food-pro .food img{
    width:85%;
}
.pricestyle1{
    font-size: 16px;
    color: #ff5757;
    font-weight: 700;
}
.food-pro .food .pricestyle2{
    font-size: 14px;
    color: #999;
    text-decoration: line-through;
}
/* 猜你喜欢 */
image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
}
.you-like{
    width: 100%;
    padding:0 10px;
    /* margin: 0 10px; */
    box-sizing: border-box;
}
.you-like ul{
    width:100%;
    box-sizing: border-box;

}
.you-like ul li{
    width: 46%;
    float: left;
    padding: 0 5px;
    margin: 0 1%;
    margin-bottom: 10px;
    border:1px solid #ddd;
    border-radius:5px;
    box-sizing: border-box;
}
.you-like ul li img{
    width:104.5px;
    margin-top:10px;
}
.you-like .titlestyle{
    height:32px;
    font-size: 12px;
    margin:10px 0;
    padding:0px 10px;
    text-align: justify;   
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
.you-like .pricestyle1{
    margin-bottom:20px;
    padding:0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.you-like .pricestyle1 img{
    margin: 0;
    width:26px;
    display: block;
}
</style>

