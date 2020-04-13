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
                <Label class="drawer-item" @tap="$navigateTo(races)" text="Races"/>
                <Label class="drawer-item" text="Item 2"/>
                <Label class="drawer-item" text="Logout"/>
            </StackLayout>

            <StackLayout v-if="!account.user" ~mainContent>
                <Button text="Login" @tap="$navigateTo(login)"/>
            </StackLayout>

            <StackLayout v-else class="homeContainer" ~mainContent>
                <Label class="message" textWrap="true">
                  <FormattedString>
                    <Span :text="account.user.username" fontWeight="bold" />
                  </FormattedString>
                </Label>
                <Button text="Start a race" @tap="$navigateTo(race)"/>
            </StackLayout>
        </RadSideDrawer>
    </Page>
</template>

<script lang="ts">
import Login from './Login.vue'
import Race from './Race.vue'
import Races from './Races.vue'
import { mapState } from 'vuex'
  export default {
    data() {
      return {
        login: Login,
        race: Race,
        races: Races,
        msg: 'Accueil'
      }
    },
    created(){
    },
    computed: {
       account(){
           return this.$store.state.account
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
    .homeContainer{
        background-image: url("~/assets/images/unnamed.jpg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
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
