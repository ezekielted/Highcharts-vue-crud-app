<template>
  <p v-for="patient in Patients" :key="patient.name"> 
  Patients Name: {{ patient.name }}<br>
  Patients Age: {{ patient.age }}<br>
  Patients Blood Group: {{ patient.bloodgroup }}
  </p>
</template>

<script>
import db from './firebase/init.js'
import { query, collection,getDocs } from 'firebase/firestore'

export default ({
  created() {
    this.getPatient()
    
  },
  data(){
    return { Patients:[] }
  },
  methods: {
    async getPatient() {
      const querySnap = await getDocs(query(collection(db, 'Patients')))

      // add each doc to 'Patients' array
      querySnap.forEach((doc) => {
        this.Patients.push(doc.data())
      })
    }
  }
})
</script>

