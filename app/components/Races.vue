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
                <Label class="drawer-item" text="Item 2"/>
                <Label class="drawer-item" text="Logout"/>
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
            </StackLayout>
        </RadSideDrawer>
    </Page>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import App from "@/components/App";
    export default {
        name: "Races",
        data() {
            return {
                loading: false,
                msg: 'test'
            }
        },
        created() {
            this.loading = true
            this.listRaces(this.account.user._id)
            .then(response => {
                console.log(response)
                this.loading = false
            }, error => {
                console.log(error)
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
