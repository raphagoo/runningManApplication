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
                <Label class="drawer-item" text="Vous n'êtes pas connecté !"/>
            </StackLayout>

            <StackLayout ~mainContent>
                <ActivityIndicator :busy="loading" />
                <Label class="message" :text="msg"/>
                <Button text="Home" @tap="$navigateTo(home)"/>
                <TextField v-model="user.username" hint="Username" />
                <TextField v-model="user.password" secure="true" hint="Password" />
                <Button text="Login" @tap="onHandleSubmit($event)" />
                <Button text="Register" @tap="$navigateTo(register)"/>
            </StackLayout>
        </RadSideDrawer>
    </Page>
</template>

<script>
import App from './App.vue'
import { mapActions } from 'vuex'
import Register from './Register.vue'
  export default {
    data() {
      return {
        msg: 'Connexion',
        user: {
          username: null,
          password: null
        },
        home: App,
        loading: false,
        register: Register
      }
    },
    methods: {
      ...mapActions('account', {
        login: 'login'
      }),
      onHandleSubmit(event){
        this.loading = true
        this.login(this.user)
        .then(response => {
            this.loading = false
            alert({
              title: 'Succès',
              message: "Vous êtes connecté !",
              okButtonText: "Super"
            }).then(() => {
              this.$navigateTo(App)
            });
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

    .title {
        text-align: left;
        padding-left: 16;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
    .drawer-header {
        padding: 50 16 16 16;
        margin-bottom: 16;
        background-color: #53ba82;
        color: #ffffff;
        font-size: 24;
    }

    .drawer-item {
        padding: 8 16;
        color: #333333;
        font-size: 16;
    }
</style>
