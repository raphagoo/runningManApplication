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
                <Label class="drawer-item" @tap="toRaces()" text="Races"/>
                <Label class="drawer-item" text="Item 2"/>
                <Label class="drawer-item" text="Logout"/>
            </StackLayout>

            <StackLayout v-if="race.active === null" ~mainContent>
                <Label class="message" text="New race" />
                <TextField v-model="futureRace.name" hint="Race name" />
                <Button text="Start" @tap="onHandleSubmit($event)" />
            </StackLayout>
            <StackLayout v-else ~mainContent>
                <Label class="message" :text="race.active.name" />
                <Label :text="'Latitude : ' + race.active.longitude" />
                <Label :text="'Longitude : ' + race.active.latitude" />
                <Label :text="'Distance : ' + race.active.distance" />
                <Button text="Stop" @tap="stopRace($event)"/>
            </StackLayout>
        </RadSideDrawer>
    </Page>
</template>


<script lang="ts">
import App from './App.vue'
import Races from './Races.vue'
import { mapState, mapActions } from 'vuex'
import * as SocketIO from "nativescript-socket.io"

SocketIO.enableDebug(); // optionnal

// or use your own debug function
// SocketIO.enableDebug(myCustomDebugFunction);

const options = {
    android: {
        // http://socketio.github.io/socket.io-client-java/apidocs/io/socket/client/IO.Options.html
    },
    ios: {
        // https://nuclearace.github.io/Socket.IO-Client-Swift/Enums/SocketIOClientOption.html
    }
};

const socketio = SocketIO.connect('https://projet-api-uf.herokuapp.com', options);


  export default {
    data() {
      return {
        home: App,
        races: Races,
        msg: 'Accueil',
        futureRace: {
            name: null,
            date: null
        },
      }
    },
    created(){

    },
    computed: {
       account(){
           return this.$store.state.account
       },
       race(){
           return this.$store.state.race
       }
    },
    methods: {
        ...mapActions('race', {
            newRace: 'newRace',
            getPosition: 'getPosition',
            endRace: 'endRace'
        }),
        onHandleSubmit(event){
            socketio.emit('hello', {
                username: 'someone',
            });
            this.futureRace.date = Date.now()
            this.newRace(this.futureRace).then(() => {
                this.race.active.longitude = this.race.active.startPosLong
                this.race.active.latitude = this.race.active.startPosLat
                this.interval = setInterval(() => {
                    this.getPosition()
                        .then(() => {
                            socketio.emit('updateRace', {
                                params: this.race.active
                            })
                        })
                }, 5000);
            })
        },
        stopRace(event){
            this.endRace(this.race.active)
            .then(response => {
                this.$navigateTo(this.home)
            })
        },
        toRaces(){
            this.$navigateTo(this.Races)
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
