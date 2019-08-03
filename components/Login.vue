<template>
    <div>
        <div class="draw-back">
            <a href="javascript:history.go(-1)"></a>
        </div>
        <div class="nav">
            <div  class="welcome">
                <p>欢迎登录</p>
            </div>
            <div class="user-name">
                <input type="text" v-model="username" placeholder="请输入你的用户名"  @blur="nameTest">
            </div>
            <div class="user-pwd">
                <input type="passwork" v-model="userupwd" placeholder="请输入你的密码" @blur="upwdTest">
            </div>
            <div class="user-login">
                <button @click="login">登录</button>
            </div>
            <div class="user-tips">
                <p><span>忘记密码</span><span>新用户注册</span></p>
            </div>
        </div>
        <div class="other-login">
            <p class="other-img"></p>
            <div class="qq_zhifubao">
                <a href=""><img src="../assets/newother2.png"></a><a href=""><img src="../assets/newother3.png"></a>
            </div>
            <p class="login-tips"><span>登录代表您阅读并同意</span><a href="https://wap.epet.com/article.html?do=userAgreement&fw=0" class="edogtips">《E宠商城用户协议》</a></p>
        </div>
    </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
    data(){
        return {
            username:"",
            userupwd:""
        }
    },
    methods:{
        login:function(){
            this.$indicator.open({
                        text: '加载中...',
                        spinnerType: 'fading-circle'
                    })
            this.axios.get("login",
            {params:{
                uname:this.username,
                upwd:this.userupwd
            }}).then(result=>{
                setTimeout(()=>{
                this.$indicator.close()
                console.log(result.data)
                var res=result.data
                if(res.code==1){
                    this.$toast({
                    message: '登陆成功,即将返回',
                    position: 'center',
                    duration: 2000
                    });
                    sessionStorage.setItem("uid",res.uid)
                    setTimeout(()=>{
                        history.go(-1)
                    },2500)
                }else{
                    this.$toast({
                        message: '用户名或者密码错误,请重试',
                        position: 'center',
                        duration: 2000
                    })
                }
                },2000)
            })
        },
        nameTest:function(){
            var reg = /^[a-z0-9_]{6,16}$/i;
            if(!reg.test(this.username)){
                this.$toast({
                    message: '用户名格式错误',
                    position: 'center',
                    duration: 2000
                    })
            }
        },
        upwdTest:function(){
            var reg = /^[a-z0-9_]{6,12}$/i; 
            if(!reg.test(this.userupwd)){
                this.$toast({
                    message: '密码格式错误',
                    position: 'center',
                    duration: 2000
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
.nav{
    width:100%;
    padding:10px 40px;
    box-sizing: border-box;
}
.nav .welcome{
    width:100%;height:32px;
    margin:10px 0;
}
.nav .welcome p{
    font-size: 20px;
    color: #333;
    font-weight: 700;
    text-align: left;
}
.nav input{
    width:100%;
    height:55px;
    box-sizing: border-box;
    border:0;
    outline: none;
    border-bottom:1px solid #d0d0d0;
}
.nav .user-login{
    width:100%;height:50px;
    margin-top: 37px
}
.nav .user-login button{
    width: 295px;height:50px;
    border:0;
    outline: none;
    background: #f0f0f0;
    color: #bfbfbf;
    border-radius: 30px;    
}
.nav .user-tips{
    width:100%;height:19px;
    margin-top:15px;
}
.nav .user-tips p{
    color: #333;
    font-size: 12px;
    display:flex;
    justify-content: space-between
}
.other-login{
    width:100%;
    padding:10px 40px;
    margin-top:100px;
    box-sizing: border-box;
}
.other-login .other-img{
    width:100%;
    height:15px;
    background: url("../assets/newother.png") center center no-repeat;
    background-size: 100%;
}
.other-login .qq_zhifubao{
    width: 100%;height:30px;
    margin: 20px auto;
}
.other-login .qq_zhifubao a{
    display: inline-block;
    width:50%;height:30px;
}
.other-login .qq_zhifubao img{width:30px;}
.other-login .login-tips{
    font-size:12px;
    color:#333;
}
.other-login .edogtips{
    color: #FF5757
}
</style>
