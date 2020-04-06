const vm = new Vue({
  el: '#app',
  data: {
    results: [],
    selectedCity: "",
    selectedTown: null,
  },
  computed:{
    cities(){
      return this.results.reduce((prev, curr) => {
        if(!prev.includes(curr.City)) prev.push(curr.City);
        return prev;
      }, []);
    },
    towns(){
      return (this.results.filter(item => item.City === this.selectedCity)).reduce((prev, curr) => {
        if(!prev.includes(curr.Town)) prev.push(curr.Town);
        return prev;
      },[]);
    },
    raw_data(){
      let filterCity = this.selectedCity;
      let filterTown = this.selectedTown;

      return this.results.filter(item => {
        let filtered = true;
        if(filterCity && filterCity.length > 0){
          filtered = item.City == filterCity
        }
        if(filtered){
          if(filterTown && filterTown.length > 0){
            filtered = item.Town == filterTown
          }
        }
        return filtered
      })
    }
  },
  mounted () {
    this.getPosts();
  },
  methods: {
    getPosts() {
      fetch('https://script.google.com/macros/s/AKfycbzAqIOckiouSUPb3nVY8XRY2Ffel7BME81e88ZpGz7uwzAaEjA/exec?url=https://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvTravelFood.aspx', {})
      .then(response => {
          return response.json();
          console.log(response);
      }).then(result => {
          this.results = result;
          console.log(result); 
      }).catch(err => {
          console.log('錯誤:', err);
      });
    },
    handleSelectCity(e){
      this.selectedCity = e.target.value;
      this.selectedTown = null;
      console.log(this.selectedCity);
    },
    handleSelectTown(e){
      this.selectedTown = e.target.value;
      console.log(this.selectedTown);
    }
  }
});