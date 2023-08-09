<template>
      <v-container>
        <template v-if="data?.weather">
            <div class="header">
                <h1>{{data.name}}</h1>
                <h3>{{ new Date().toLocaleString() }}</h3>
            </div>
            <div>
                <h2>{{Math.round(data.weather.temp)}}&deg;</h2>
            </div>
        </template>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-text-field
                v-model="data.city"
                label="Search"
                placeholder="Enter your search term"
                outlined
                dense
                solo
                readonly
                ></v-text-field>
            </v-col>
            <v-btn @click="getWeatherApi()" class="mb-5 ">Search</v-btn>
        </v-row>
    </v-container>
</template>

<script setup>

    import { reactive, onMounted } from 'vue';
    import axios from 'axios';

    //Data:
    let data = reactive({
        city: '',
        weather: null,
        current_day:'',
        state_weather:false,
        name: ''
    });

    const weatherApiKey = import.meta.env.VITE_APP_WEATHER_API;

    //Methods:

    const getWeatherApi = async () => {
        //The city is static only ( testing );
        let url = `https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${weatherApiKey}`;

        try {
            const response = await axios.post(url);

            console.log(response.data, 'data')

            if(response.status == 200) {
                const responseData = response.data;

                data.city = 'London'
                data.weather = responseData.main;
                data.current_day = responseData.current_day;
                data.state_weather = responseData.state_weather;
                data.name = responseData.name;
               
            }

        } catch (err) {
            console.log('Err: ', err)
        }
    }

    //Mounted:
    onMounted(() => {
        data.city = "London"
    })

</script>


<style scoped>
.fill-height {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>