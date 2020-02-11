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
                <Button text="Login" @tap="onHandleSubmit($event)" />
            </StackLayout>
        </RadSideDrawer>
    </Page>
</template>

<script>
import App from './App.vue'
import { mapActions } from 'vuex'
  export default {
    data() {
      return {
        msg: 'Connexion',
        user: {
          username: null,
          password: null
        },
        home: App
      }
    },
    methods: {
      ...mapActions('account', {
        login: 'login'
      }),
      onHandleSubmit(event){
        this.login(this.user)
        .then(response => {
          alert("Test")
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