var app = new Vue({
  el: '.content',

  data: {
    movies: {}
  },

  created: function() {
    this.fetchData();
  },

  methods: {
    fetchData: function() {
      var self = this;
      var list = '/api/';
      var votes = '/api/votes';

      fetch(list).then(function(response) {
        return response.json();
      }).then(function(json) {
          var movies = {}

          json.movies.forEach(function(movie){
            movie.votes = 0;
            movies[movie.id] = movie
          })

        self.movies = movies;

          fetch(votes).then(function(voteResponse){
            return voteResponse.json();
          }).then(function(voteJson){
            console.log(voteJson);
            voteJson.votes.forEach(function(vote){
              var id = vote.movie.id;
              var movie = self.movies[id];

              Vue.set(movie, 'votes', movie.votes + 1);
            })
          })
      })
      },
    sendVote: function(id) {
      var self = this;
      var voteEndpoint = '/api/vote/';

      fetch(
        voteEndpoint + '4/' + id,
        { method: 'POST'}
      ).then(function(response){
          if (response.ok) {
            Vue.set(self.movies[id], 'votes', self.movies[id].votes +1);
          } else {
            alert('You\'ve already voted for this.');
          }
      })
    }
  }
})
