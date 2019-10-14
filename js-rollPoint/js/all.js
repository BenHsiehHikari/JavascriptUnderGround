(function(){
    let app = new Vue({
        el: '#app',
        data: {
          prizes: [],
          prizes_2017: [],
          prizes_2018: [],
          prize_name: '',
          prize_icon: '',
          prize_rotate: [],
          prize_transition: '',
          each_deg: 0,
          rotate_deg: 0,
          start_deg: 0,
          current_deg: 0,
          index: 0,
          current_year: 2017,
          duration: 3000,
          time_remaining: 20,
          num: 0,
          numbers: [],
          isToggle: false,
          isClicked: false,
          isShow: true,
        },
        watch:{
            current_year: {
                handler: 'restart',
            }
        },
        computed: {
          containerClass() {
            let vm = this
            return vm.current_year === 2017 ? 'container' : 'container container-large'
          },
          itemClass() {
            let vm = this
            return vm.current_year === 2017 ? 'item item-skew' : 'item item-skew-large'
          },
          contentClass() {
            let vm = this
            return vm.current_year === 2017 ? 'item-content' : 'item-content item-content-large'
          },
          countClass() {
            let vm = this
            return vm.current_year === 2017 ? 'count' : 'count count-large'
          }
        },
        mounted(){
            let vm = this
            vm.initPrize()
        },
        methods: {
            prizeActive(){
                let vm = this
                setTimeout(() => {
                vm.$refs.item[vm.index].classList.value = `${vm.itemClass} active`
                }, vm.duration);
            },
            setCurrentYear(year){
                let vm = this
                if (vm.isClicked) return
                vm.current_year = year
            },
            restart(){
                let vm = this
                vm.$refs.item[vm.index].classList.value = vm.itemClass
                if (vm.current_year === 2017) {
                    vm.time_remaining = 20
                    vm.reset()
                    vm.initPrize()
                } else if (vm.current_year === 2018) {
                    vm.time_remaining = 120
                    vm.reset()
                    vm.initPrize_2018()
                }
            },
            reset() {
                let vm = this
                vm.isShow = true
                vm.index = 0
                vm.prize_name = ''
                vm.prize_icon = ''
                vm.prize_rotate = []
                vm.numbers = []
                vm.start_deg = 0
                vm.rotate_deg = `rotate(0deg)`
                vm.current_deg = 0
                vm.isClicked = false
                vm.prize_transition = `none`;
            },
            initPrize(){
                let vm = this
                axios.get('./data.json')
                .then(function (response) {
                    vm.prizes_2017 = JSON.parse(response.request.responseText)
                    vm.num = vm.prizes_2017.length
                    vm.degree(vm.num)
                    vm.prizes = vm.prizes_2017
                    vm.numberArray()
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            initPrize_2018() {
                let vm = this
                vm.prizes_2018 = []
                for (let i = 1; i <= 120; i++) {
                let item = {}
                if (i === 1) {
                    item.name = 1
                    item.count = 1
                    vm.prizes_2018.push(item)
                } else if (i > 1 && i <= 16) {
                    item.name = i
                    item.count = 1
                    vm.prizes_2018.push(item)
                } else if (i === 17) {
                    item.name = i
                    item.count = 5
                    vm.prizes_2018.push(item)
                } else if (i === 18) {
                    item.name = i
                    item.count = 10
                    vm.prizes_2018.push(item)
                } else if (i === 19) {
                    item.name = i
                    item.count = 20
                    vm.prizes_2018.push(item)
                } else if (i === 20) {
                    item.name = i
                    item.count = 69
                    vm.prizes_2018.push(item)
                }
                }
                vm.num = vm.prizes_2018.length
                vm.prizes = vm.prizes_2018
                vm.degree(vm.num)
                vm.numberArray()
            },
            degree(num){
                let vm = this
                for (let i = 1; i <= num; i++) {
                  let deg = 360 / num
                  vm.each_deg = deg
                  let eachDeg
                  eachDeg = i * deg
                  vm.prize_rotate.push(eachDeg)
                } 
            },
            numberArray(){
                let vm = this
                vm.numbers = vm.prizes.map((prize, index) => {
                return index
                })
            },
            rotateHandler(num){
                let vm = this
                vm.prizes.filter((prize, index) => {
                let filterArray
                if (prize.count <= 0) {
                    let filterArray = vm.numbers.filter((num) => {
                    return num !== index
                    })
                    vm.numbers = filterArray
                }
                })
    
                if (vm.time_remaining > 0) {
                vm.$refs.item[vm.index].classList.value = vm.itemClass
                vm.prize_draw(num)
                } else if (vm.time_remaining <= 0) {
                vm.$refs.item[vm.index].classList.value = vm.itemClass
                vm.restart()
                }
            },
            prize_draw(num){
                let vm = this
                if (vm.isClicked) return
                vm.isShow = vm.isClicked
    
                
                vm.$refs.item[vm.index].classList.value = vm.itemClass
    
                
                vm.index = vm.numbers[Math.floor(Math.random() * vm.numbers.length)]
                console.log('1.剩餘牌號', vm.numbers)
    
                
                let circle = 4
                let degree
                
                degree = vm.start_deg + circle * 360 + vm.prize_rotate[vm.index] - vm.start_deg % 360
    
                vm.start_deg = degree
                
                vm.current_year === 2017 ? vm.rotate_deg = `rotate(${degree}deg)` : vm.rotate_deg = `rotate(${degree - vm.each_deg / 2}deg)`
    
                vm.prize_transition = `all ${vm.duration / 1000}s cubic-bezier(0.42, 0, 0.2, 0.91)`
                vm.time_remaining--
                vm.isClicked = true
                let remainder = vm.start_deg % 360
                if (remainder <= 0) {
                vm.current_year === 2017 ? vm.current_deg = remainder + 360 : vm.current_deg = remainder + 360 - vm.each_deg / 2
    
                } else if (remainder > 0) {
                vm.current_year === 2017 ? vm.current_deg = remainder : vm.current_deg = remainder - vm.each_deg / 2
                }
                
    
                
                let prize = vm.prizes[vm.index]
                vm.prize_name = prize.name
                vm.prize_icon = prize.icon
                if (vm.current_year === 2018) {
                vm.prize_icon = "card_giftcard"
                }
                vm.prizeActive()
                setTimeout(() => {
                prize.count--
                }, vm.duration);
    
                setTimeout(() => {
                    if (vm.isClicked === true) {
                        vm.isClicked = false
                    }
                }, vm.duration);  
            },
        }
    })
})()