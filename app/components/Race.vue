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
                <Label class="drawer-item" @tap="$navigateTo(home)" text="Races"/>
                <Label class="drawer-item" text="Item 2"/>
                <Label class="drawer-item" text="Logout"/>
            </StackLayout>

            <StackLayout ~mainContent>
                <Label class="message" text="New race" />
                <TextField v-model="race.name" hint="Race name" />
                <Button text="Start" @tap="onHandleSubmit($event)" />
            </StackLayout>
        </RadSideDrawer>
    </Page>
</template>

<script lang="ts">
import App from './App.vue'
import { mapState, mapActions } from 'vuex'
  export default {
    data() {
      return {
        home: App,
        msg: 'Accueil',
        race: {
            name: null,
            date: null
        }
      }
    },
    created(){
    },
    computed: {
       account(){
           return this.$store.state.account
       }
    },
    methods: {
        ...mapActions('race', {
            newRace: 'newRace'
        }),
        onHandleSubmit(event){
            this.race.date = Date.now()
            this.newRace(this.race)
        }
    }
  }
</script>

<style lang="scss" scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
        Label{
            color: white;
        }
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
