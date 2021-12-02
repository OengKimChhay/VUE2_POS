import router from '../src/route/index.js';
const mixin =  {
    data () {
        return {
            // for spinner
            spinnerActive: false,
            // for user
            username: localStorage.getItem('username'),
            usertype: localStorage.getItem('usertype'),
            userid: localStorage.getItem('userid'),
            userimage: localStorage.getItem('userimage'),
            ImageURL: "http://178.128.119.167:1027/images"
        }
    },
    methods: {
        // for show and hide spinner loading 
        showSpinner(){
            this.spinnerActive = true;
            setTimeout(() => { this.spinnerActive = false; }, 1000);
        },
        // for pages reload next previous
        pageReload(){
            return window.location.reload();
        }, 
        previousPage(){
            return router.go(-1);
        },
        nextPage(){
            return router.go(1);
        }

    },
};
export default mixin;
//  vue mixin is an gloubal file helper to provide deverlper easy to use just import it to main.js root file
//  then you can use function from this mixin file wherever you want ;)