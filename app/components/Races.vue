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
                <Label class="drawer-item" text="Races" @tap="toRaces()"/>
                <Label class="drawer-item" text="Logout" @tap="logout()"/>
            </StackLayout>

            <StackLayout ~mainContent>
                <ActivityIndicator :busy="loading" />
                <ListView for="race in race.list" @itemTap="raceDetails(race)">
                    <v-template>
                        <!-- Shows the list item label in the default color and style. -->
                        <Label textWrap="true">
                            <FormattedString>
                                <Span :text="race.name +' : '" fontWeight="bold" />
                                <Span :text="race.date + ' - '"/>
                                <Span :text="race.distance + ' km'"/>
                            </FormattedString>
                        </Label>
                    </v-template>
                </ListView>
                <Button text="Home" @tap="$navigateTo(app)"/>
            </StackLayout>
        </RadSideDrawer>
    </Page>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import App from './App.vue'
    import Login from './Login.vue'
    export default {
        name: "Races",
        data() {
            return {
                loading: false,
                msg: 'test',
                app: App,
                login: Login
            }
        },
        created() {
            this.loading = true
            this.listRaces(this.account.user._id)
            .then(response => {
                this.loading = false
            }, error => {
                this.loading = false
            })
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
            ...mapActions('race',{
                listRaces: 'listRaces'
            }),
            toRaces(){
                this.$navigateTo(this)
            },
            logout(){
                this.$store.state.acccunt = null
                this.$store.state.race = null
                this.$navigateTo(this.login)
            },
            raceDetails(race){
                alert({
                    title: race.name,
                    message: "Info race (Map)",
                    okButtonText: "Super"
                })
            }
        }
    }
</script>

<style scoped>

</style>
