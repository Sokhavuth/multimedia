// javascripts/index.js
class Index{
  constructor(){
    this.pageTokens = [];
    this.apiKey = 'AIzaSyCDMr6toQGyDRFPChRsbQ2sheSQfTQLVqg';

    this.kplaylistId = 'UUQfwfsi5VrQ8yKZ-UWmAEFg';
    this.yt_nextPageToken = false;
    this.yt_prevPageToken = false;
    this.kclicked = false;
    this.kPlaylistt = [];
    this.kPlaylist = [];
    this.created = false;
    this.videoIds = [];

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  getVidContent(pageToken) {
    $('#navigation img').eq(1).attr('src', '/images/loading.gif')
    index.option = {
      "part": ["snippet,contentDetails"],
      "playlistId": index.kplaylistId,
      "maxResults": 5
    }

    if(pageToken)
      index.option.pageToken = pageToken;

    gapi.client.init({
      'apiKey': index.apiKey,
      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
    }).then(function() {
      return gapi.client.youtube.playlistItems.list(index.option);
    }).then(function(response) {
      index.yt_nextPageToken = response.result.nextPageToken;  
      index.yt_prevPageToken = response.result.prevPageToken;
      index.getVidData(response.result.items);
    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
    });
  }

  getVidData(items){
    this.videoIds = [];
    for(var v in items){
      this.videoIds.push(items[v].snippet.resourceId.videoId);
    }
    this.createPlayer();
  }

  createPlayer(){
    var html = ``;
    
    for(var v in this.videoIds){
      html += `<div>`;
      html += `<iframe allowfullscreen src="https://www.youtube.com/embed/${this.videoIds[v]}"></iframe>`;
      html += `</div>`;
    }
    $('.panel #video-screen').html(html);
    $('#navigation img').eq(1).attr('src', '/images/home.png')
  }

}//end class

const index = new Index();

function initAPI() {
  index.getVidContent();
}

gapi.load('client', initAPI);