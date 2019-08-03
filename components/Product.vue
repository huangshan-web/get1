<template>
    <div>
        <!-- 头部 -->
        <div class="nav">
            <ul>
                <li><a href="javascript:;" class="draw-back" @click="drawBack" ></a></li>
                <li><span class="nav-title"><router-link to="">商品</router-link></span><span class="nav-title">详情</span><span class="nav-title">评论</span></li>
                <li><router-link to="" class="fotoplace"></router-link></li>
                <li><router-link to="" class="draw-back right"></router-link></li>
            </ul>
        </div>
        <!-- 轮播图 -->
        <div class="pro-swiper">
            <div>
                <!-- swiper -->
                <swiper :options="swiperOption">
                <swiper-slide v-for="(item,i) of productPic" :key="i"><img :src="item"></swiper-slide>
                <div class="swiper-pagination swiper-style" slot="pagination"></div>
                </swiper>
            </div>
            <div class="pro-title">
                <p v-text="productList.title"></p>
            </div>
            <div class="pro-price">
                <p>
                    <span v-text="`¥${(productList.price1*1).toFixed(2)}`" class="price1"></span>
                    <span v-text="`¥${(productList.price2*1).toFixed(2)}`" class="price2"></span>
                </p>
                <img src="../assets/quality_assurance.png">
            </div>
        </div>
        <!-- 规格数量 -->
        <div class="specs">
            <div class="space"></div>
            <p class="select">已选:</p>
            <div class="pro-specs">
                <span class="ps1">规格</span>
                <span class="ps2">12磅</span>
                <span class="ps2 active">4磅</span>
                <span class="ps2">1磅</span>
            </div>
            <div class="space"></div>
            <div class="counts">
                <span class="pro-counts">购买数量</span>
                <span class="counts-reduce" @click="countsReduce" >-</span><input type="text" v-model="counts"><span class="counts-add" @click="countsAdd">+</span>
            </div>
            <div class="space"></div>
            <p class="select">送至:</p>
            <div class="service">
                <ul>
                    <li>正品保证</li>
                    <li>99元包邮</li>
                    <li>30天包退</li>
                </ul>
            </div>
        </div>
        <!-- 加入购物车 -->
        <div class="add-cart">
            <ul>
                <li>
                    <span class="mycollect"><span class="cart-txt">收藏</span></span><span class="mycart"><span class="cart-txt">购物车</span></span>
                </li>
                <li>
                    <button class="cart-btn" @click="addCart">加入购物车</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            counts:1,
            pid:0,
            swiperOption: {
                pagination: {
                el: '.swiper-pagination',
                type: 'fraction'
                },
            },
            productList:{},
            productPic:[],
        }
    },
    created(){
        this.getPid()
        this.getProduct()
    },
    methods:{
        getPid:function(){
            let pid=location.hash.split("=")[1]
            this.pid=pid
            console.log(this.pid)
        },
        getProduct:function(){
            this.axios.get(
            "product_pic",
            {params:{pid:this.pid}}
            ).then(result=>{
                this.productPic=JSON.parse(result.data[0].pic)
                console.log(this.productPic)
            });
            this.axios.get(
            "product",
            {params:{pid:this.pid}}
            ).then(result=>{
                this.productList=result.data[0]
                console.log(this.productList)
            })
        },
        drawBack(e){
            e.preventDefault()
            history.go(-1)
        },
        countsAdd(){
            this.counts++
        },
        countsReduce(){
            if(this.counts>1){
                this.counts--
            }else{
                this.counts=1
            }
        },
        addCart(){
            var uid=sessionStorage.getItem("uid");
            var pid=this.productList.pid;
            var counts=this.counts;
            console.log(uid)
            if(uid!=null){
                console.log(this.productList)
                this.axios.get("select-cart",{params:{
                    uid,
                    pid,
                }}).then(result=>{
                    console.log(result,"chaxun")
                    if(result.data.length>0){
                        var cartCounts=counts+parseInt(result.data[0].counts);
                        this.axios.get("update-cart",{params:{
                            uid,
                            pid,
                            cartCounts,
                        }}).then(result=>{
                            console.log(result,"xiugai")
                            if(result.data.code>0){
                                this.$toast({
                                    message: '添加成功',
                                    position: 'center',
                                    duration: 1000
                                })
                            }else{
                                this.$toast({
                                    message: '网络故障，添加失败',
                                    position: 'center',
                                    duration: 1000
                                })  
                            };
                        })
                    }else{
                        this.axios.get("add-cart",{params:{
                            uid,
                            pid,
                            pic:this.productList.pic,
                            title:this.productList.title,
                            price1:this.productList.price1,
                            counts,
                        }}).then(result=>{
                            console.log(result,"ceshi")
                            if(result.data.code>0){
                                this.$toast({
                                    message: '添加成功',
                                    position: 'center',
                                    duration: 1000
                                })
                            }else{
                                this.$toast({
                                    message: '网络故障，添加失败',
                                    position: 'center',
                                    duration: 1000
                                })  
                            };
                        })
                    }
                });
            }else{
                this.$messagebox.confirm(
                    "还未登录,是否去登录"
                ).then(action=>{
                    this.$router.push("Login")
                }).catch(err=>{})    
            }
        }
    }
}
</script>

<style scoped src="./product.css">

</style>
