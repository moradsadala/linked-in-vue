//Notes 

//AJAX

//var fReq = new XMLHttpRequest();         // create XML request 
//console.log(fReq.readyState);            //show the state of this request

// fReq.onreadystatechange = function(){
//     if (this.readyState == this.DONE && this.status == 200){
//         console.log(fReq.responseText);
//     }
// };
// fReq.open('GET','https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader');
// fReq.send();


// var btn = document.querySelector('button#user');
// btn . addEventListener('click',getUsers,false);
// function getUsers (){
//     var req = new XMLHttpRequest();
//     req.onreadystatechange = function(){
//         if(req.readyState===req.DONE){
//             var results = JSON.parse(req.response);
//             console.log(results);
//         }
//     }
//     req.open('GET','https://randomusers.me/api/?results=3');
//     req.send();
// }



// Vue.js
// v-model as v-bind but v-model is 2 way binding caching&rendering
// v-show as v-if but v-if remove object from the dom v-show hide it only
//We will use axios library to ajax tech

var vm = new Vue({
    el:'#app',
    data:{
        email:'morad@example.com',
        submitted: false,
        // imgSrc:'',
        // imgTitle:''
        asteroids:[]
    },
    created:function(){
        this.fetchApod();
    },
    computed:{
        numAsteroids: function(){
            return this.asteroids.length;
        },
        closestObject: function(){
            var neosHavingData = this.asteroids.filter(function(neo){
                return neo.close_approach_data.length > 0;
            });
            var simpleNeos = neosHavingData.map(function(neo){
                return {
                    name:neo.name,
                    miles:neo.close_approach_data[0].miss_distance.miles
                };
            });
            var sortedNeos = simpleNeos.sort(function(a,b){
                return a.miles - b.miles;
            });
            return sortedNeos[0].name + ' with ' + sortedNeos[0].miles + ' miles ';

            // var min = this.asteroids[0].close_approach_data[0].miss_distance.kilometers;
            // this.asteroids.forEach(function(asteroid) {
            //     if(asteroid.close_approach_data.length == 0){
            //         continue;
            //     }

            //     if(min > asteroid.close_approach_data[0].miss_distance.kilometers){
            //         min = asteroid.close_approach_data[0].miss_distance.kilometers;
            //     }

            // });
            
            // for(let i=1; i= i+ ; i < this.asteroids.length){
            //     if(this.asteroids[i].close_approach_data.length == 0){
            //         continue;
            //     }
            //     if (min > this.asteroids[i].close_approach_data[0].miss_distance.kilometers){
            //         min = this.asteroids[i].close_approach_data[0].miss_distance.kilometers;
            //     }
                
            // }
            
        }
    },
    methods:{
        process(){
            this.submitted = true;
        },
        fetchApod:function(){
            var apiKey = 'ZQMwGMstbBPZgiElPOtUOlbgl9gNz8LEUPvnD8f9';
            var url = 'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=' + apiKey;
            axios.get(url)
                .then(function(results){
                // vm.imgSrc = results.data.url;
                // vm.imgTitle = results.data.title;
                vm.asteroids = results.data.near_earth_objects;
            });
        },
        getCloseApproachDate:function(ob){
            if(ob.close_approach_data.length > 0){
                return ob.close_approach_data[0].close_approach_date;
            }else{
                return 'N/A'
            }
        },
        remove:function(item){
            this.asteroids.splice(item,1);
        },
        getRowStyle:function(ob){
            if(ob.close_approach_data.length == 0){
                return {
                    border:'solid 2px red',
                    color:'red'
                };
            }
        }
    }
    

});

