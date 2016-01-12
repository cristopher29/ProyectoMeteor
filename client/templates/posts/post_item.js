Template.postItem.helpers({
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    if(this.url.match(/^http([s]?):\/\/.*/)){
      return a.hostname;
    }
    return this.url;
  }
});