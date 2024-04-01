<template>
  <div ref="chart"></div>
  <div id = "desc"><b>Description: </b>The application fetches the number of people under each blood group from a firebase database and represents it in a Bar chart. This app also works offline</div>
</template>

<script>
import Highcharts from 'highcharts';
import db from './firebase/init.js';
import { where, collection, getDocs, query } from 'firebase/firestore';

export default {
  created() {
    if (navigator.onLine) {
      // Fetch data from Firestore if online
      this.getUsers();
    } else {
      // Retrieve data from localStorage if offline
      this.retrieveChartDataFromLocalStorage();
    }
  },
    
  data() {
    return {
      patientCounts : [],
      chartData: [
        { name: 'A+', y: 0 },
        { name: 'A-', y: 0 }, 
        { name: 'B+', y: 0 },
        { name: 'B-', y: 0 },
        { name: 'AB+', y: 0 },
        { name: 'AB-', y: 0 },
        { name: 'O+', y: 0 },
        { name: 'O-', y: 0 },
      ],
    };
  },

  mounted() {
    // Render chart after component is mounted
    this.renderChart();
  },

  methods: {
    async getUsers() {
      try {
        const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
        for (let i = 0; i < bloodGroups.length; i++) {
          const bloodGroup = bloodGroups[i];
          const q = query(collection(db, 'Patients'), where('bloodgroup', '==', bloodGroup));
          const querySnap = await getDocs(q);
          this.patientCounts.push(querySnap.size);
          // Update chartData y values
          this.chartData[i].y = querySnap.size;
          this.renderChart();
        }
        // Save data to localStorage
        localStorage.setItem('chartData', JSON.stringify(this.chartData));
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    },

    retrieveChartDataFromLocalStorage() {
      // Retrieve chart data from localStorage if available
      const storedChartData = localStorage.getItem('chartData');
      if (storedChartData) {
        this.chartData = JSON.parse(storedChartData);
      }
    },
  
    renderChart() {
      Highcharts.chart(this.$refs.chart, {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'Number of Persons per Blood Group '
        },
        xAxis: {
          title: {
            text: 'Blood Groups'
          },
          categories: this.chartData.map(data => data.name)
        },
        yAxis: {   
          title: {
            text: 'Amount'
          },
          allowDecimals: false,
        },

        series: [{
          name: 'Quantity',
          data: this.chartData.map(data => data.y)
        }]
      });
    }
  }
};
</script>

<style>
#desc{
  background-color: rgb(105, 127, 167);
  color: white;
  font-size: 15px;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
