<template>
    <div>
        <div class="me-nav">
            我的E宠
        </div>
        <div class="userinfo">
            <div class="userinfo-nav">
                <div>
                    <router-link to="#"><img src="../assets/set.png"></router-link>
                </div>
                <div>
                    <router-link to="#"><img src="../assets/call1.png"></router-link>
                </div>
            </div>
            <div class="userinfo-login">
                <img src="../assets/dog.png">
                <router-link to="Login" class="user-login" v-show="uname==null">登录</router-link>
                <span v-show="uname==null">│</span>
                <router-link to="" class="user-reg" v-show="uname==null">注册</router-link>
                <router-link to="" v-text="uname" class="user-name" v-show="uname!=null"></router-link>
            </div>
            <div class="userinfo-footer">
                <div>
                    <img src="../assets/f1.png">
                    <img src="../assets/f2.png">
                    <img src="../assets/f3.png">
                    <img src="../assets/f4.png">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            uname:null,
        }
    },
    created(){
        this.getNmae();
    },
    methods:{
        getNmae(){
            var name=sessionStorage.getItem("username")
            console.log(name)
            this.uname=name
        }
    }
}
</script>

<style scoped>
.me-nav{
    width:100%;
    height:49px;
    line-height: 49px;
    color:#333;
    font-size:16px;
    font-weight: bold;
    border-bottom:1px solid #ddd;
}
.userinfo{
    width:100%;
    height:207px;
    box-sizing: border-box;
    background: url("../assets/me-bg.jpg") center center no-repeat;
    background-size: 100%; 
}
.userinfo::before{
    content: "";
    display: table;
}
.userinfo .userinfo-nav{
    width:100%;
    height:27px;
    padding:0px 10px;
    margin-top:15px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
}
.userinfo .userinfo-nav img{
    display: block;
    width:24px;
    height:24px;
}
.userinfo .userinfo-login{
    width:100%;
    height:70px;
    padding:0 10px;
    margin:30px 0;
    color:#fff;
    box-sizing:border-box;
    display: flex;
    align-items: center;
}
.userinfo .userinfo-login img{
    width:70px;
    height: 70px;
}
.userinfo .userinfo-login .user-login,.user-reg,.user-name{
    display: block;
    padding:0 10px;
    color:#fff;
    font-size: 16px;
    font-weight:400;
}
.userinfo .userinfo-login span{
    display: block;
    font-weight:400;
}
.userinfo .userinfo-footer{
    width:100%;
    height:35px;
    padding:0 10px;
    box-sizing: border-box;
}
.userinfo .userinfo-footer>div{
    width:100%;
    height:35px;
    background: #252525;
    border-radius: 15px 15px 0px 0px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.userinfo .userinfo-footer img{
    width:64px;
}
</style>
