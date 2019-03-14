let vm = new Vue({
    el: "#app",
    data: {
        mouse: {
            current: {
                x: 0,
                y: 0
            },
            previous: {
                x: 0,
                y: 0
            },
            down: false
        },
        initIcon: 'fas',
        isDraw: true,
        isEraser: false
    },
    computed: {
        classList: function() {

            return {
                fas: this.initIcon,
                'fa-paint-brush': this.isDraw,
                'fa-eraser': this.isEraser
            }
        },

    },
    methods: {
        toggleIcon: function() {
            if (this.isDraw) {
                this.isDraw = false;
                this.isEraser = true;
            } else {
                this.isDraw = true;
                this.isEraser = false;
            }
        }
    }
})