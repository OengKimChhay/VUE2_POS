<template>
    <div>
        <p>Time: {{time}}</p>
        <p>Date: {{date}}</p>
    </div>
</template>

<script>
export default {
    data(){
        return{
            time:"",
            date:""
        }
    },
    methods:{
        showTime(){
            var date = new Date();
            var h = date.getHours(); // 0 - 23
            var m = date.getMinutes(); // 0 - 59
            var s = date.getSeconds(); // 0 - 59
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            // ------------time--------------
            var session = "AM";
            if(h == 0){
                h = 12;
            }
            if(h > 12){
                h = h - 12;
                session = "PM";
            }
            h = (h < 10) ? "0" + h : h;
            m = (m < 10) ? "0" + m : m;
            s = (s < 10) ? "0" + s : s;
            
            this.time = h + ":" + m + ":" + s + " " + session;
            // -----------date--------------
            var curWeekDay = days[date.getDay()];
            var curDay = date.getDate();
            var curMonth = months[date.getMonth()];
            var curYear = date.getFullYear();
            this.date = curWeekDay+"/"+curDay+"/"+curMonth+"/"+curYear
            setTimeout(this.showTime,1000);
        },
    },
    mounted(){
        this.showTime();
    }
}
</script>

<style>

</style>