<template>
    <v-container>
        <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
            <v-card class="login-card">
                <v-card-title class="headline">Login</v-card-title>
                <v-card-text>
                    <v-form >
                        <v-text-field 
                            v-model="user.username"
                            label="Username"
                        >
                        </v-text-field>
                        <v-text-field 
                            v-model="user.password"
                            label="Password" 
                            type="password"
                        >
                        </v-text-field>
                        <v-btn color="primary" @click="loginUser()">Login</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
        </v-row>
    </v-container>
</template>
  
<script setup>
    
    import router from '@/router/router';
    import axios from 'axios';
    import { reactive } from 'vue';
    import { useStore } from 'vuex';

    //Data:
    const store = useStore();
    const user = reactive({});

    //Methods:
    const loginUser = async () => {
        let url = `${window.api}/api/user/login`;

        try {
            const response = await axios.post(url, user)

            if(response.status == 200) {
                store.dispatch('storeUserData', response.data);

                router.push('/');
            }

        } catch (err) {
            console.log('Err', err);
        }
    }

 
</script>

<style scoped>
.login-card {
  top: 50% !important;
  padding: 20px;
}
</style>