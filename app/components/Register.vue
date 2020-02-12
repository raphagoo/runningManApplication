<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
                <Label class="title" text="RunningMan"  col="1"/>
            </GridLayout>
        </ActionBar>

        <RadSideDrawer ref="drawer">
            <StackLayout ~drawerContent backgroundColor="#ffffff">
                <Label class="drawer-item" text="Item 1"/>
                <Label class="drawer-item" text="Item 2"/>
                <Label class="drawer-item" text="Item 3"/>
            </StackLayout>

            <StackLayout ~mainContent>
                <Label class="message" :text="msg"/>
                <Button text="Home" @tap="$navigateTo(home)"/>
                <TextField v-model="user.username" hint="Username" />
                <TextField v-model="user.password" secured="true" hint="Password" />
                <Button text="Register" @tap="onHandleSubmit($event)" />
                <Button text="Login" @tap="$navigateTo(loginPage)"/>
            </StackLayout>
        </RadSideDrawer>
    </Page>
</template>

<script>
import App from './App.vue'
import { mapActions } from 'vuex'
import Login from './Login.vue'
  export default {
    data() {
      return {
        msg: 'Inscription',
        user: {
          username: null,
          password: null
        },
        home: App,
        loginPage: Login
      }
    },
    methods: {
      ...mapActions('account', {
        regiser: 'register'
      }),
      onHandleSubmit(event){
        this.register(this.user)
        .then(response => {
          this.$navigateTo(loginPage)
          }, error => {
          alert("Error")
        })
      }
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>