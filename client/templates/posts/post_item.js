Template.postItem.helpers({
  ownPost: function() {
    return this.userId === Meteor.userId();
  },
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }

});
Template.postContent.helpers({
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  date: function(){

    var monthNames = [
      "Enero", "Febrero", "Marzo",
      "Abril", "Mayo", "Junio", "Julio",
      "Agosto", "Septiembre", "Octubre",
      "Noviembre", "Diciembre"
    ];

    var date = this.submitted;
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var str = day +" de "+ monthNames[monthIndex] +" del "+ year;

    return str;
  }

});